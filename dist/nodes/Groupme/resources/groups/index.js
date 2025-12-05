"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsDescription = void 0;
const showOnlyForGroups = {
    resource: ['groups'],
};
exports.groupsDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForGroups,
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many groups',
                description: 'List many active groups',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/groups',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a group',
                description: 'Get details of a specific group',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/groups/{{$parameter.groupId}}',
                    },
                },
            },
            {
                name: 'Former',
                value: 'former',
                action: 'Get former groups',
                description: 'List groups you have left but can rejoin',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/groups/former',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Group ID',
        name: 'groupId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the group',
        displayOptions: {
            show: {
                ...showOnlyForGroups,
                operation: ['get'],
            },
        },
    },
];
//# sourceMappingURL=index.js.map