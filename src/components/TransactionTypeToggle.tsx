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
				'relative flex h-5 w-24 items-center justify-center rounded-full text-center',
				{
					'bg-base-100': type === value,
					'text-error-content': type === 'OUT' && type !== value,
					'text-success-content': type === 'IN' && type !== value,
				},
			)}
		>
			<span className="text-sm font-semibold uppercase">
				{children}
			</span>
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
				'rounded-full p-1 transition-all duration-200',
				{
					'bg-success': type === 'IN',
					'bg-error': type === 'OUT',
				},
			)}
		>
			<div className="relative flex">
				<div
					className={clsx(
						'absolute h-5 w-1/2 rounded-full bg-base-100 transition-all duration-200',
						{
							'right-1/2': type === 'OUT',
							'right-0': type === 'IN',
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
			</div>
		</div>
	);
}
