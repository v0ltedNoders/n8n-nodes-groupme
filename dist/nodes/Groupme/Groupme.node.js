"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groupme = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const user_1 = require("./resources/user");
const company_1 = require("./resources/company");
class Groupme {
    constructor() {
        this.description = {
            displayName: 'Groupme',
            name: 'groupme',
            icon: { light: 'file:logo.svg', dark: 'file:logo.svg' },
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with the Groupme API',
            defaults: {
                name: 'Groupme',
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
                            name: 'User',
                            value: 'user',
                        },
                        {
                            name: 'Company',
                            value: 'company',
                        },
                    ],
                    default: 'user',
                },
                ...user_1.userDescription,
                ...company_1.companyDescription,
            ],
        };
    }
}
exports.Groupme = Groupme;
//# sourceMappingURL=Groupme.node.js.map