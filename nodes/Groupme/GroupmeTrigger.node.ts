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
} from 'n8n-workflow';

export class GroupmeTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Groupme Trigger',
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
        displayName: 'Group ID',
        name: 'groupId',
        type: 'string',
        default: '',
        description: 'The ID of the Groupme group to listen to',
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
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const groupId = this.getNodeParameter('groupId') as string;

        if (!groupId) {
          throw new Error('Group ID is required');
        }

        if (webhookData.botId === undefined) {
          return false;
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
          const bot = bots.find((b: IDataObject) => b.bot_id === webhookData.botId);

          return bot !== undefined;
        } catch (error) {
          return false;
        }
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const webhookData = this.getWorkflowStaticData('node');
        const groupId = this.getNodeParameter('groupId') as string;

        if (!groupId) {
          throw new Error('Group ID is required');
        }

        const credentials = await this.getCredentials('groupmeApi');
        const token = credentials.token as string;

        const body = {
          bot: {
            name: 'n8n Webhook Bot',
            group_id: groupId,
            callback_url: webhookUrl,
          },
        };

        try {
          const response = await this.helpers.request({
            method: 'POST',
            uri: `https://api.groupme.com/v3/bots?token=${token}`,
            body,
            json: true,
          });

          if (response.response && response.response.bot && response.response.bot.bot_id) {
            webhookData.botId = response.response.bot.bot_id;
            return true;
          }

          throw new Error('Failed to create bot');
        } catch (error) {
          throw new Error(`Error creating GroupMe bot: ${error}`);
        }
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const credentials = await this.getCredentials('groupmeApi');
        const token = credentials.token as string;

        if (webhookData.botId === undefined) {
          return true;
        }

        try {
          await this.helpers.request({
            method: 'POST',
            uri: `https://api.groupme.com/v3/bots/destroy?token=${token}`,
            body: {
              bot_id: webhookData.botId,
            },
            json: true,
          });

          delete webhookData.botId;
          return true;
        } catch (error) {
          return false;
        }
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
