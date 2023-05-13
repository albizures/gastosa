import { z } from 'zod';
import { optionArgsSchema } from '../notion/properties';

export const transactionTypeSchema = z.union([
	z.literal('IN'),
	z.literal('OUT'),
	z.literal('LENT'),
	z.literal('BORROW'),
]);

export type TransactionType = z.infer<typeof transactionTypeSchema>;

const tagSchema = optionArgsSchema;

export type Tag = z.infer<typeof tagSchema>;

export const transactionSchema = z.object({
	id: z.string(),
	type: transactionTypeSchema,
	typeId: z.string(),
	comment: z.string(),
	amount: z.number(),
	tags: z.array(tagSchema),
	date: z.coerce.date(),
	currency: z.string(),
});

export const newTransactionSchema = transactionSchema
	.omit({
		id: true,
		typeId: true,
		date: true,
	})
	.merge(
		z.object({
			date: z.string(),
		}),
	);

export type Transaction = z.infer<typeof transactionSchema>;
