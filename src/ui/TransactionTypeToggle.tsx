import clsx from 'clsx';
import type { TransactionType } from '../types';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface TransactionTypeRadioItemProps {
	children: React.ReactNode;
	value: TransactionType;
	type: TransactionType;
	input: UseFormRegisterReturn<'type'>;
	isShown?: boolean;
}

export function TransactionTypeRadioItem(
	props: TransactionTypeRadioItemProps,
) {
	const { children, value, type, input, isShown } = props;
	return (
		<label
			className={clsx(
				'relative flex h-5 w-24 items-center justify-center rounded-full text-center',
				{
					'bg-base-100': type === value,
					hidden: !isShown,
				},
			)}
		>
			<span className="text-sm font-semibold uppercase">
				{children}
			</span>
			<input
				{...input}
				value={value}
				className="sr-only"
				type="radio"
			/>
		</label>
	);
}

interface TransactionTypeRadioProps {
	type: TransactionType;
	isLoan: boolean;
	input: UseFormRegisterReturn<'type'>;
}

export function TransactionTypeRadio(
	props: TransactionTypeRadioProps,
) {
	const { type, input, isLoan } = props;

	return (
		<div
			className={clsx(
				'rounded-full p-1 transition-all duration-200',
				{
					'bg-success': type === 'IN' || type === 'LENT',
					'bg-error': type === 'OUT' || type === 'BORROW',
				},
			)}
		>
			<div className="relative flex">
				<div
					className={clsx(
						'absolute h-5 w-1/2 rounded-full bg-base-100 transition-all duration-200',
						{
							'right-1/2': type === 'OUT' || type === 'BORROW',
							'right-0': type === 'IN' || type === 'LENT',
						},
					)}
				/>

				<TransactionTypeRadioItem
					input={input}
					type={type}
					value="BORROW"
					isShown={isLoan}
				>
					BORROW
				</TransactionTypeRadioItem>
				<TransactionTypeRadioItem
					input={input}
					type={type}
					value="LENT"
					isShown={isLoan}
				>
					LENT
				</TransactionTypeRadioItem>

				<TransactionTypeRadioItem
					input={input}
					type={type}
					value="OUT"
					isShown={!isLoan}
				>
					expenses
				</TransactionTypeRadioItem>
				<TransactionTypeRadioItem
					input={input}
					type={type}
					value="IN"
					isShown={!isLoan}
				>
					income
				</TransactionTypeRadioItem>
			</div>
		</div>
	);
}

interface TransactionTypeSectionProps {
	isLoan: boolean;
	type: TransactionType;
	isLoanInput: UseFormRegisterReturn<'isLoan'>;
	typeInput: UseFormRegisterReturn<'type'>;
}

export function TransactionTypeSection(
	props: TransactionTypeSectionProps,
) {
	const { isLoan, type, isLoanInput, typeInput } = props;
	return (
		<div
			className={clsx('flex items-center rounded-full', {
				'bg-base-300': !isLoan,
				'bg-accent': isLoan,
			})}
		>
			<TransactionTypeRadio
				isLoan={isLoan}
				input={typeInput}
				type={type}
			/>

			<label className="ml-2 mr-1 flex items-center text-sm font-semibold uppercase">
				loan
				<input
					{...isLoanInput}
					type="checkbox"
					className="checkbox checkbox-sm ml-1"
				/>
			</label>
		</div>
	);
}
