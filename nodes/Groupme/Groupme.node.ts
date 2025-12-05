import { NodeConnectionTypes, type INodeType, type INodeTypeDescription, type ILoadOptionsFunctions, type IDataObject } from 'n8n-workflow';

type IHttpRequestHelpers = {
	httpRequest(opts: { method: string; url: string; headers?: IDataObject; body?: unknown }): Promise<IDataObject>;
};
import { groupsDescription } from './resources/groups';
import { botsDescription } from './resources/bots/Descriptions';
import { membersDescription } from './resources/members/Descriptions';

export class Groupme implements INodeType {
	description: INodeTypeDescription = {
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
			...groupsDescription,
			...botsDescription,
			...membersDescription,
		],
	};


	methods = {
		loadOptions: {
			async getBots(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('groupmeApi');
				const token = credentials?.token as string;

				const response = await (this.helpers as unknown as IHttpRequestHelpers).httpRequest({
					method: 'GET',
					url: `https://api.groupme.com/v3/bots?token=${token}`,
					headers: { 'Content-Type': 'application/json' },
				});

				const bots = (response.response || []) as IDataObject[];

				return bots.map((bot) => ({
					name: bot.name as string,
					value: bot.bot_id as string,
				}));
			},
		},
	};
}
