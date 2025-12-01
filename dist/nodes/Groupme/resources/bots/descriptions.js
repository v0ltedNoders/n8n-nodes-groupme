"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsOperations = void 0;
exports.groupsOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['groups'],
            },
        },
        options: [
            { name: 'List Groups', value: 'list' },
            { name: 'Get Group', value: 'get' },
            { name: 'Create Group', value: 'create' },
        ],
        default: 'list',
    },
];
//# sourceMappingURL=descriptions.js.map