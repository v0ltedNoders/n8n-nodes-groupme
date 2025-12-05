import type { INodeProperties } from 'n8n-workflow';
import { botsOperations, botsFields } from './index';

export const botsDescription: INodeProperties[] = [...botsOperations, ...botsFields];
