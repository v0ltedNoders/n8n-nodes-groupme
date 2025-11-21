import { ICredentialTestFunctions, ICredentialsDecrypted, IHookFunctions, INodeCredentialTestResult, INodeType, INodeTypeDescription, IWebhookFunctions, IWebhookResponseData } from 'n8n-workflow';
export declare class GroupmeTrigger implements INodeType {
    description: INodeTypeDescription;
    methods: {
        credentialTest: {
            testGroupmeCred(this: ICredentialTestFunctions, credential: ICredentialsDecrypted): Promise<INodeCredentialTestResult>;
        };
    };
    webhookMethods: {
        default: {
            checkExists(this: IHookFunctions): Promise<boolean>;
            create(this: IHookFunctions): Promise<boolean>;
            delete(this: IHookFunctions): Promise<boolean>;
        };
    };
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
