import * as p from '../../notion/properties';
import { databaseSchema } from '../../notion/schemas';
import { createPageParams } from '../../notion/utilts';
import { newTransactionSchema } from '../../types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

const database_id = '8db1508bef6a494697c8dfe8f84b93f9';

export const transactionsRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const table = await ctx.notion.databases.query({
			database_id,
		});

		const { results: transactions } = databaseSchema.parse(table);

		return transactions;
	}),

	create: protectedProcedure
		.input(newTransactionSchema)
		.mutation(async ({ input, ctx }) => {
			const { notion } = ctx;

			const { tags, type, amount, date, comment, currency } = input;

			await notion.pages.create(
				createPageParams({
					parent: database_id,
					properties: {
						Type: p.select({ name: type }),
						Tags: p.multiSelect({
							options: tags.map((tag) => {
								return tag;
							}),
						}),
						Amount: p.number({ number: amount }),
						Date: p.date({ start: date }),
						Comment: p.title({ text: comment }),
						Currency: p.select({ name: currency }),
					},
				}),
			);
		}),
});
