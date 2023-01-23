import { z } from 'zod';

export const transactionTypeSchema = z.union([
	z.literal('IN'),
	z.literal('OUT'),
]);

export type TransactionType = z.infer<typeof transactionTypeSchema>;

const tagSchema = z.object({
	id: z.string(),
	label: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;

export const transactionSchema = z.object({
	id: z.string(),
	type: transactionTypeSchema,
	typeId: z.string(),
	comment: z.string(),
	amount: z.number(),
	tags: z.array(tagSchema),
	date: z.coerce.date(),
});

export const newTransactionSchema = transactionSchema
	.omit({
		id: true,
		typeId: true,
		tags: true,
	})
	.merge(
		z.object({
			tags: z.array(z.string()),
		}),
	);

export type Transaction = z.infer<typeof transactionSchema>;
