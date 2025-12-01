import {
  ICredentialTestFunctions,
  ICredentialsDecrypted,
  IDataObject,
  IHookFunctions,
  INodeCredentialTestResult,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
  INodePropertyOptions,
  ILoadOptionsFunctions,
} from 'n8n-workflow';

export class GroupmeTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'GroupMe Trigger',
    name: 'groupmeTrigger',
    icon: 'file:logo.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["event"]}}',
    description: 'Handle Groupme events via webhooks',
    defaults: {
      name: 'Groupme Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'groupmeApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Bot',
        name: 'botId',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getBots',
        },
        default: '',
        description: 'Select an existing GroupMe bot to listen to',
      },
    ],
  };
  methods = {
    credentialTest: {
      async testGroupmeCred(
        this: ICredentialTestFunctions,
        credential: ICredentialsDecrypted,
      ): Promise<INodeCredentialTestResult> {
        const credentials = credential.data;

        const reqData = {
          uri: 'https://api.groupme.com/v3/groups?token=' + credentials!.token,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          json: true,
        };

        try {
          const response = await this.helpers.request(reqData);
          if (response.status != 200) {
            return {
              status: 'Error',
              message: `There was an error authenticating.`,
            };
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            return {
              status: 'Error',
              message: `There was an error authenticating: ${err.message}`,
            };
          }
        }

        return {
          status: 'OK',
          message: 'Authentication successful',
        };
      },
    },
    loadOptions: {
      async getBots(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const credentials = await this.getCredentials('groupmeApi');
        const token = credentials.token as string;

        const response = await this.helpers.request({
          method: 'GET',
          uri: `https://api.groupme.com/v3/bots?token=${token}`,
          json: true,
        });

        const bots = response.response || [];

        return bots.map((bot: IDataObject) => ({
          name: bot.name as string,
          value: bot.bot_id as string,
        })) as INodePropertyOptions[];
      }
    }
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const selectedBotId = this.getNodeParameter('botId') as string;

        if (!selectedBotId) {
          throw new Error('Bot ID is required');
        }

        const credentials = await this.getCredentials('groupmeApi');
        const token = credentials.token as string;

        try {
          const response = await this.helpers.request({
            method: 'GET',
            uri: `https://api.groupme.com/v3/bots?token=${token}`,
            json: true,
          });

          const bots = response.response || [];
          const bot = (bots as IDataObject[]).find((b) => b.bot_id === selectedBotId);

          // consider webhook present only if the bot exists and its callback_url matches the webhook url
          return !!bot && (bot.callback_url as string) === webhookUrl;
        } catch (error) {
          return false;
        }
      },

      async create(this: IHookFunctions): Promise<boolean> {
        // Instead of creating a new bot, update the selected bot's callback_url to point to this webhook
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const selectedBotId = this.getNodeParameter('botId') as string;

        if (!selectedBotId) {
          throw new Error('Bot ID is required');
        }

        const credentials = await this.getCredentials('groupmeApi');
        const token = credentials.token as string;

        try {
          await this.helpers.request({
            method: 'POST',
            uri: `https://api.groupme.com/v3/bots/update?token=${token}`,
            body: {
              bot: {
                bot_id: selectedBotId,
                callback_url: webhookUrl,
              },
            },
            json: true,
          });

          return true;
        } catch (error) {
          throw new Error(`Error updating GroupMe bot webhook: ${error}`);
        }
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const bodyData = this.getBodyData();

    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)],
    };
  }
}
