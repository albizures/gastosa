import { z } from 'zod';

export const propertySchemas = {
	multiSelect: z.object({
		id: z.string(),
		name: z.string(),
		type: z.literal('multi_select'),
		multi_select: z.object({
			options: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					color: z.string(),
				}),
			),
		}),
	}),

	selectSchema: z.object({
		id: z.string(),
		name: z.string(),
		type: z.literal('select'),

		select: z.object({
			options: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					color: z.string(),
				}),
			),
		}),
	}),

	numberSchema: z.object({
		id: z.string(),
		name: z.string(),
		type: z.literal('number'),
		number: z.object({ format: z.enum(['number']) }),
	}),

	dateSchema: z.object({
		id: z.string(),
		name: z.string(),
		type: z.literal('date'),
		date: z.object({}),
	}),

	titleSchema: z.object({
		id: z.string(),
		name: z.string(),
		type: z.literal('title'),
		title: z.object({}),
	}),
};

export const parentSchema = z.object({
	type: z.enum(['page_id']),
	page_id: z.string(),
});

export const titleSchema = z.array(
	z.object({
		type: z.string(),
		text: z.object({ content: z.string(), link: z.null() }),
		annotations: z.object({
			bold: z.boolean(),
			italic: z.boolean(),
			strikethrough: z.boolean(),
			underline: z.boolean(),
			code: z.boolean(),
			color: z.string(),
		}),
		plain_text: z.string(),
		href: z.null(),
	}),
);

export const iconSchema = z.object({
	type: z.string(),
	emoji: z.string(),
});
