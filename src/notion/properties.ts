import type { Property } from './types';
import formatISO from 'date-fns/formatISO';

type OptionArgs =
	| { id: string; name?: string }
	| { id?: string; name: string };

type SelectArgs = OptionArgs;

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
	start: Date;
	end?: Date;
}

export function date(args: DateArgs) {
	const { start, end } = args;

	return {
		type: 'date',
		date: {
			start: formatISO(start),
			end: end && formatISO(end),
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
