import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

export class Groupme implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GroupMe',
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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
						name: 'Groups',
						value: 'groups',
					},
					{
						name: 'Members',
						value: 'members',
					},
					{
						name: 'Bots',
						value: 'bots',
					},
				],
				default: 'groups',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
