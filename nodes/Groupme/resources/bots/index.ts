import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBots = {
	resource: ['bots'],
};

export const botsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBots,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many bots',
				description: 'List many bots you have created',
				routing: {
					request: {
						method: 'GET',
						url: '/bots',
					},
				},
			},
			{
				name: 'Post Message',
				value: 'postMessage',
				action: 'Post a message',
				description: 'Post a message from a bot',
				routing: {
					request: {
						method: 'POST',
						url: '/bots/post',
						body: {
							bot_id: '={{$parameter.botId}}',
							text: '={{$parameter.messageText}}',
							picture_url: '={{$parameter.pictureUrl}}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a bot',
				description: 'Update bot settings',
				routing: {
					request: {
						method: 'POST',
						url: '=/bots/{{$parameter.botId}}/update',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ $responseBody }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Upload Image',
				value: 'uploadImage',
				action: 'Upload an image',
				description: 'Upload an image to the GroupMe image service and get a URL for use in messages',
				routing: {
					request: {
						method: 'POST',
						url: '=https://image.groupme.com/pictures',
						body: '={{$parameter.imageData}}',
						headers: {
							'X-Access-Token': '={{$credentials.token}}',
							'Content-Type': '={{$parameter.contentType}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ $responseBody.payload.url }}',
								},
							},
						],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const botsFields: INodeProperties[] = [
	// PostMessage operation fields
	{
		displayName: 'Bot Name or ID',
		name: 'botId',
		type: 'options',
		required: true,
		default: '',
		description: 'The bot to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['postMessage', 'update'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getBots',
		},
	},
	{
		displayName: 'Message Text',
		name: 'messageText',
		type: 'string',
		required: true,
		default: '',
		description: 'The text of the message to post',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['postMessage'],
			},
		},
	},
	{
		displayName: 'Picture URL',
		name: 'pictureUrl',
		type: 'string',
		default: '',
		description: 'URL of an image to include in the message',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['postMessage'],
			},
		},
	},
	// Update operation fields
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		description: 'The name of the bot',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Avatar URL',
		name: 'avatarUrl',
		type: 'string',
		default: '',
		description: 'URL for bot avatar image',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'DM Notification',
		name: 'dmNotification',
		type: 'boolean',
		default: false,
		description: 'Whether to enable DM notifications',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['update'],
			},
		},
	},
	// Upload Image operation fields
	{
		displayName: 'Image Data',
		name: 'imageData',
		type: 'string',
		required: true,
		default: '',
		description: 'Binary image data or a reference to binary data from a previous node',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['uploadImage'],
			},
		},
	},
	{
		displayName: 'Content Type',
		name: 'contentType',
		type: 'options',
		required: true,
		default: 'image/jpeg',
		description: 'The MIME type of the image',
		displayOptions: {
			show: {
				...showOnlyForBots,
				operation: ['uploadImage'],
			},
		},
		options: [
			{
				name: 'JPEG',
				value: 'image/jpeg',
			},
			{
				name: 'PNG',
				value: 'image/png',
			},
			{
				name: 'GIF',
				value: 'image/gif',
			},
		],
	},
];

