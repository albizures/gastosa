import { z } from 'zod';
import { Transaction, transactionTypeSchema } from '../types';

export const transactionSchema = z
	.object({
		id: z.string(),
		properties: z.object({
			Amount: z.object({ id: z.string(), number: z.number() }),
			Type: z.object({
				select: z.object({
					id: z.string(),
					name: transactionTypeSchema,
				}),
			}),
			Tags: z.object({
				multi_select: z.array(
					z.object({
						id: z.string(),
						name: z.string(),
					}),
				),
			}),
			Date: z.object({
				id: z.string(),
				date: z.object({
					start: z.coerce.date(),
				}),
			}),
			Comment: z.object({
				id: z.string(),
				title: z.array(
					z.object({
						type: z.string(),
						plain_text: z.string(),
					}),
				),
			}),
		}),
	})
	.transform((current): Transaction => {
		const {
			id,
			properties: {
				Type: {
					select: { name: type, id: typeId },
				},
				Comment: { title },
				Tags: { multi_select: tags },
				Amount: { number: amount },
				Date: {
					date: { start: date },
				},
			},
		} = current;

		return {
			id,
			amount,
			type,
			typeId,
			comment: title.reduce((acc, item) => {
				if (item.type === 'text') {
					return `${acc}${item.plain_text}`;
				}

				return acc;
			}, ''),
			tags: tags.map((tag) => {
				return {
					id: tag.id,
					label: tag.name,
				};
			}),
			date,
		};
	});

export const databaseSchema = z.object({
	results: z.array(transactionSchema),
});
