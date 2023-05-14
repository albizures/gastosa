import { LogInIcon, CheckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import React from 'react';
import formatISO from 'date-fns/formatISO';
import { TransactionTypeSection } from '../ui/TransactionTypeToggle';
import type { TransactionType } from '../types';
import { api } from '../utils/api';

import { TagList } from '../ui/TagList';
import { GridCalculator } from '../ui/GridCalculator';
import { type CalculatorState } from '../calulator';
import { Amount } from '../ui/Amount';
import { type OptionArgs } from '../notion/properties';
import { useRequireSession } from '../ui/useRequireSession';

interface NewTransaction {
	type: TransactionType;
	comment: string;
	isLoan: boolean;
	tags: string[];
	newTags: string[];
	currency: string;
}

export default function Index() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
		reset,
		formState: { isValid },
	} = useForm<NewTransaction>({
		defaultValues: {
			type: 'OUT',
			tags: [],
			newTags: [],
			isLoan: false,
			currency: 'GTQ',
		},
	});

	useRequireSession();

	const [state, setState] = React.useState<CalculatorState>({
		label: '',
		value: 0,
	});
	const mutation = api.transactions.create.useMutation({
		onMutate() {
			resetForm();
		},
	});

	function resetForm() {
		setState({ label: '', value: 0 });
		reset();
	}

	function onSubmit(data: NewTransaction) {
		console.log('data', data);
		const { tags, newTags, type, comment = '', currency } = data;

		mutation.mutate({
			amount: state.value,
			type,
			date: formatISO(new Date()),
			comment: comment ?? '',
			currency,
			tags: tags
				.map<OptionArgs>((id) => ({ id }))
				.concat(newTags.map((name) => ({ name }))),
		});
	}

	const isLoan = watch('isLoan');
	const type = watch('type');

	function onIsLoanChange(
		event: React.ChangeEvent<HTMLInputElement>,
	) {
		const { type } = getValues();
		if (event.target.checked) {
			if (type === 'IN') {
				setValue('type', 'LENT');
			} else if (type === 'OUT') {
				setValue('type', 'BORROW');
			}
		} else {
			if (type === 'BORROW') {
				setValue('type', 'OUT');
			} else if (type === 'LENT') {
				setValue('type', 'IN');
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-1 flex-col"
		>
			<div className="flex flex-1 flex-col items-center justify-center">
				<Amount amount={state} />
				<textarea
					{...register('comment')}
					name="comment"
					className="mt-2 resize-none border-0 text-center text-xl font-light text-gray-400
	 					focus:bg-gray-100 focus:text-black focus:outline-none"
					wrap="soft"
					placeholder="A comment"
				/>
			</div>

			<div className="flex justify-center">
				<TransactionTypeSection
					isLoan={isLoan}
					type={type}
					typeInput={register('type')}
					isLoanInput={register('isLoan', {
						onChange: onIsLoanChange,
					})}
				/>
			</div>
			<TagList
				newTagsinput={register('newTags')}
				input={register('tags')}
			/>
			<GridCalculator
				currencyInput={register('currency')}
				setState={setState}
				isValid={isValid && state.value !== 0}
			/>
		</form>
	);
}
