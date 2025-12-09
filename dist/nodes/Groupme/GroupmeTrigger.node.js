"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupmeTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class GroupmeTrigger {
    constructor() {
        this.description = {
            displayName: 'GroupMe Trigger',
            name: 'groupmeTrigger',
            icon: 'file:logo-light.svg',
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
                    displayName: 'Bot Name or ID',
                    name: 'botId',
                    type: 'options',
                    typeOptions: {
                        loadOptionsMethod: 'getBots',
                    },
                    default: '',
                    description: 'Select an existing GroupMe bot to listen to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
            ],
            usableAsTool: true,
        };
        this.methods = {
            credentialTest: {
                async testGroupmeCred(credential) {
                    const credentials = credential.data;
                    try {
                        const response = await this.helpers.httpRequest({
                            method: 'GET',
                            url: `https://api.groupme.com/v3/groups?token=${credentials.token}`,
                            headers: { 'Content-Type': 'application/json' },
                        });
                        if (response.status !== 200) {
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
                    const response = await this.helpers.httpRequest({
                        method: 'GET',
                        url: `https://api.groupme.com/v3/bots?token=${token}`,
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const bots = (response.response || []);
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
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Bot ID is required');
                    }
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials.token;
                    try {
                        const response = await this.helpers.httpRequest({
                            method: 'GET',
                            url: `https://api.groupme.com/v3/bots?token=${token}`,
                            headers: { 'Content-Type': 'application/json' },
                        });
                        const bots = (response.response || []);
                        const bot = bots.find((b) => b.bot_id === selectedBotId);
                        return !!bot && bot.callback_url === webhookUrl;
                    }
                    catch {
                        return false;
                    }
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const selectedBotId = this.getNodeParameter('botId');
                    if (!selectedBotId) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Bot ID is required');
                    }
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials.token;
                    try {
                        await this.helpers.httpRequest({
                            method: 'POST',
                            url: `https://api.groupme.com/v3/bots/update?token=${token}`,
                            body: {
                                bot: {
                                    bot_id: selectedBotId,
                                    callback_url: webhookUrl,
                                },
                            },
                        });
                        return true;
                    }
                    catch (err) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Error updating GroupMe bot webhook: ${String(err)}`);
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