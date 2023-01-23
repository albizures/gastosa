import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';
import type { Property } from './types';

interface Args {
	parent: string;
	properties: Record<string, Property>;
}

export function createPageParams(args: Args) {
	const { parent: database_id, properties } = args;

	return {
		parent: {
			database_id,
		},
		properties,
	} as unknown as CreatePageParameters;
}
