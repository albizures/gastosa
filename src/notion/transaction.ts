import { z } from 'zod';

export const TransactionTypeSchema = z.union([
	z.literal('IN'),
	z.literal('OUT'),
]);

export type TransactionType = z.infer<typeof TransactionTypeSchema>;

const TagSchema = z.object({
	id: z.string(),
	label: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;

export const TransactionSchema = z.object({
	id: z.string(),
	type: TransactionTypeSchema,
	typeId: z.string(),
	comment: z.string(),
	amount: z.number(),
	tags: z.array(TagSchema),
});

export type Transaction = z.infer<typeof TransactionSchema>;

z.object({
	Comment: z.object({
		id: z.string(),
		title: z.array(
			z.object({
				type: z.string(),
				plain_text: z.string(),
			}),
		),
	}),
});
