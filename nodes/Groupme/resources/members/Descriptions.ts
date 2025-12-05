import type { INodeProperties } from 'n8n-workflow';
import { membersOperations, membersFields } from './index';

export const membersDescription: INodeProperties[] = [...membersOperations, ...membersFields];
