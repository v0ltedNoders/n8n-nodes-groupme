import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMembers = {
	resource: ['members'],
};

export const membersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getResults',
		displayOptions: {
			show: showOnlyForMembers,
		},
		options: [
			{
				name: 'Get Results',
				value: 'getResults',
				action: 'Get membership results',
				description: 'Get the membership results from an add call',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter.groupId}}/members/results/{{$parameter.resultsId}}',
					},
				},
			},
			{
				name: 'Remove',
				value: 'remove',
				action: 'Remove a member',
				description: 'Remove a member from a group',
				routing: {
					request: {
						method: 'POST',
						url: '=/groups/{{$parameter.groupId}}/members/{{$parameter.membershipId}}/remove',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update member nickname',
				description: 'Update your nickname in a group',
				routing: {
					request: {
						method: 'POST',
						url: '=/groups/{{$parameter.groupId}}/memberships/update',
					},
				},
			},
		],
	},
];

export const membersFields: INodeProperties[] = [
	// Common fields
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the group',
		displayOptions: {
			show: {
				...showOnlyForMembers,
				operation: ['getResults', 'remove', 'update'],
			},
		},
	},
	// GetResults operation fields
	{
		displayName: 'Results ID',
		name: 'resultsId',
		type: 'string',
		required: true,
		default: '',
		description: 'The GUID returned from an add request',
		displayOptions: {
			show: {
				...showOnlyForMembers,
				operation: ['getResults'],
			},
		},
	},
	// Remove operation fields
	{
		displayName: 'Membership ID',
		name: 'membershipId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the member to remove (not the user ID)',
		displayOptions: {
			show: {
				...showOnlyForMembers,
				operation: ['remove'],
			},
		},
	},
	// Update operation fields
	{
		displayName: 'Nickname',
		name: 'nickname',
		type: 'string',
		required: true,
		default: '',
		description: 'New nickname (1-50 characters)',
		displayOptions: {
			show: {
				...showOnlyForMembers,
				operation: ['update'],
			},
		},
	},
];
