import type {
        IAuthenticateGeneric,
        ICredentialTestRequest,
        ICredentialType,
        INodeProperties,
} from 'n8n-workflow';

export class GroupmeApi implements ICredentialType {
        name = 'groupmeApi';

        displayName = 'Groupme API';

        // Link to your community node's README
        documentationUrl = 'https://github.com/org/-groupme?tab=readme-ov-file#credentials';

        properties: INodeProperties[] = [
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

        authenticate: IAuthenticateGeneric = {
                type: 'generic',
                properties: {
                        qs: {
                                token: '={{$credentials.token}}',
                        },
                },
        };

        test: ICredentialTestRequest = {
                request: {
                        baseURL: 'https://api.groupme.com/v3',
                        url: '/groups',
                },
        };
}
