import { type INodeType, type INodeTypeDescription, type ILoadOptionsFunctions } from 'n8n-workflow';
export declare class Groupme implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getBots(this: ILoadOptionsFunctions): Promise<{
                name: string;
                value: string;
            }[]>;
        };
    };
}
