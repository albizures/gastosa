import { z } from 'zod';
import { propertySchemas } from '../../notion/schemas/database';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc';

const database_id = '8db1508bef6a494697c8dfe8f84b93f9';

const databaseSchema = z.object({
	properties: z.object({
		Tags: propertySchemas.multiSelect,
	}),
});

export const tagsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const table = await ctx.notion.databases.retrieve({
			database_id,
		});

		const { properties } = databaseSchema.parse(table);

		return properties.Tags.multi_select.options.map((tag) => {
			const { id, name } = tag;
			return {
				id,
				name,
			};
		});
	}),
});
