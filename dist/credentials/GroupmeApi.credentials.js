"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupmeApi = void 0;
class GroupmeApi {
    constructor() {
        this.name = 'groupmeApi';
        this.displayName = 'Groupme API';
        this.documentationUrl = 'https://github.com/org/-groupme?tab=readme-ov-file#credentials';
        this.properties = [
            {
                displayName: 'Access Token',
                name: 'token',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                default: '',
                description: 'GroupMe API access token',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                qs: {
                    token: '={{$credentials.token}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.groupme.com/v3',
                url: '/groups',
            },
        };
    }
}
exports.GroupmeApi = GroupmeApi;
//# sourceMappingURL=GroupmeApi.credentials.js.map