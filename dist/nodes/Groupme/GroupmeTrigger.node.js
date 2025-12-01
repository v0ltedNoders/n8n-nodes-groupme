"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupmeTrigger = void 0;
class GroupmeTrigger {
    constructor() {
        this.description = {
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
        this.methods = {
            credentialTest: {
                async testGroupmeCred(credential) {
                    const credentials = credential.data;
                    const reqData = {
                        uri: 'https://api.groupme.com/v3/groups?token=' + credentials.token,
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
                    }
                    catch (err) {
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
                async getBots() {
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials.token;
                    const response = await this.helpers.request({
                        method: 'GET',
                        uri: `https://api.groupme.com/v3/bots?token=${token}`,
                        json: true,
                    });
                    const bots = response.response || [];
                    return bots.map((bot) => ({
                        name: bot.name,
                        value: bot.bot_id,
                    }));
                }
            }
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const selectedBotId = this.getNodeParameter('botId');
                    if (!selectedBotId) {
                        throw new Error('Bot ID is required');
                    }
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials.token;
                    try {
                        const response = await this.helpers.request({
                            method: 'GET',
                            uri: `https://api.groupme.com/v3/bots?token=${token}`,
                            json: true,
                        });
                        const bots = response.response || [];
                        const bot = bots.find((b) => b.bot_id === selectedBotId);
                        return !!bot && bot.callback_url === webhookUrl;
                    }
                    catch (error) {
                        return false;
                    }
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const selectedBotId = this.getNodeParameter('botId');
                    if (!selectedBotId) {
                        throw new Error('Bot ID is required');
                    }
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials.token;
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
                    }
                    catch (error) {
                        throw new Error(`Error updating GroupMe bot webhook: ${error}`);
                    }
                },
                async delete() {
                    return true;
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        return {
            workflowData: [this.helpers.returnJsonArray(bodyData)],
        };
    }
}
exports.GroupmeTrigger = GroupmeTrigger;
//# sourceMappingURL=GroupmeTrigger.node.js.map