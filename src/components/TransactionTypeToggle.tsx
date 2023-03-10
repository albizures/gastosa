import clsx from 'clsx';
import type { TransactionType } from '../types';

interface TransactionTypeRadioItemProps {
	children: React.ReactNode;
	value: TransactionType;
	type: TransactionType;
	onChange: (value: TransactionType) => void;
}

export function TransactionTypeRadioItem(
	props: TransactionTypeRadioItemProps,
) {
	const { children, onChange, value, type } = props;
	return (
		<label
			className={clsx(
				'relative flex h-10 w-32 items-center justify-center rounded-full text-center',
				{
					'bg-base-100': type === value,
					'text-error-content': type === 'OUT' && type !== value,
					'text-success-content': type === 'IN' && type !== value,
				},
			)}
		>
			<span className="font-semibold uppercase">{children}</span>
			<input
				onClick={() => onChange(value)}
				className="sr-only"
				value={value}
				name="transaction-type"
				type="radio"
			/>
		</label>
	);
}

interface TransactionTypeRadioProps {
	onChange: (type: TransactionType) => void;
	type: TransactionType;
}

export function TransactionTypeRadio(
	props: TransactionTypeRadioProps,
) {
	const { onChange, type } = props;

	return (
		<div
			className={clsx(
				'relative flex rounded-full p-2 transition-all duration-200',
				{
					'bg-success': type === 'IN',
					'bg-error': type === 'OUT',
				},
			)}
		>
			<div
				className={clsx(
					'absolute top-2 bottom-2 h-10 w-32 rounded-full bg-base-100 transition-all duration-200',
					{
						'left-2': type === 'OUT',
						'left-full -ml-[8.5rem]': type === 'IN',
					},
				)}
			/>

			<TransactionTypeRadioItem
				onChange={onChange}
				type={type}
				value="OUT"
			>
				expenses
			</TransactionTypeRadioItem>
			<TransactionTypeRadioItem
				onChange={onChange}
				type={type}
				value="IN"
			>
				income
			</TransactionTypeRadioItem>
			{/* <label
				className={clsx(
					'relative flex h-10 w-32 items-center justify-center rounded-full text-center capitalize',
					{
						'bg-base-100 shadow': type === 'OUT',
					},
				)}
			>
				<span>expenses</span>
				<input
					onClick={() => onChange('OUT')}
					className="sr-only"
					value="OUT"
					name="transaction-type"
					type="radio"
				/>
			</label> */}
			{/* <label
				className={clsx('relative h-10 w-32 rounded-full', {
					'bg-base-100 shadow': type === 'IN',
				})}
			>
				<span>income</span>
				<input
					onClick={() => onChange('IN')}
					className="sr-only"
					value="IN"
					name="transaction-type"
					type="radio"
				/>
			</label> */}
		</div>
	);
}
