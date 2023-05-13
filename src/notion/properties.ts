import { z } from 'zod';
import type { Property } from './types';

export const optionArgsSchema = z.union([
	z.object({
		id: z.string().nullish().optional(),
		name: z.string(),
	}),
	z.object({
		id: z.string(),
		name: z.string().nullish().optional(),
	}),
]);

export type OptionArgs = z.infer<typeof optionArgsSchema>;

export type SelectArgs = OptionArgs;

type Select = Property &
	({ id: string; name?: string } | { id?: string; name: string });

export function select(args: SelectArgs) {
	const { id, name } = args;
	return {
		type: 'select',
		id,
		select: {
			name,
		},
	} as unknown as Select;
}

interface MultiSelectArgs {
	options: OptionArgs[];
}

export function multiSelect(args: MultiSelectArgs) {
	const { options } = args;

	return {
		type: 'multi_select',
		multi_select: options,
	} as unknown as Property;
}

interface NumberArgs {
	number: number;
}

export function number(args: NumberArgs) {
	const { number } = args;
	return {
		number,
		type: 'number',
	} as unknown as Property;
}

interface DateArgs {
	start: string;
	end?: string;
}

export function date(args: DateArgs) {
	const { start, end } = args;

	return {
		type: 'date',
		date: {
			start,
			end,
		},
	} as unknown as Property;
}

interface TitleArgs {
	text: string;
}

export function title(args: TitleArgs) {
	const { text } = args;

	if (text.trim() === '') {
		return {
			type: 'title',
			title: [],
		} as unknown as Property;
	}

	return {
		type: 'title',
		title: [
			{
				text: {
					content: text,
				},
			},
		],
	} as unknown as Property;
}
