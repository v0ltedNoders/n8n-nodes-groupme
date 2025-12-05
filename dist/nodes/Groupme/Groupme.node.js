"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groupme = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const groups_1 = require("./resources/groups");
const Descriptions_1 = require("./resources/bots/Descriptions");
const Descriptions_2 = require("./resources/members/Descriptions");
class Groupme {
    constructor() {
        this.description = {
            displayName: 'GroupMe',
            name: 'groupme',
            icon: { light: 'file:logo-light.svg', dark: 'file:logo-dark.svg' },
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with the Groupme API',
            defaults: {
                name: 'Group Me',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [{ name: 'groupmeApi', required: true }],
            requestDefaults: {
                baseURL: 'https://api.groupme.com/v3',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Group',
                            value: 'groups',
                        },
                        {
                            name: 'Member',
                            value: 'members',
                        },
                        {
                            name: 'Bot',
                            value: 'bots',
                        },
                    ],
                    default: 'groups',
                },
                ...groups_1.groupsDescription,
                ...Descriptions_1.botsDescription,
                ...Descriptions_2.membersDescription,
            ],
        };
        this.methods = {
            loadOptions: {
                async getBots() {
                    const credentials = await this.getCredentials('groupmeApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.token;
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
                },
            },
        };
    }
}
exports.Groupme = Groupme;
//# sourceMappingURL=Groupme.node.js.map