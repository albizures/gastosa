import clsx from 'clsx';
import { type CalculatorState } from '../calulator';

interface AmountProps {
	amount: CalculatorState;
}

export function Amount(props: AmountProps) {
	const { amount } = props;
	return (
		<div className="text-center">
			<div className="flex flex-col">
				<span className="text-6xl font-extralight">
					{amount.label === '' ? '0.0' : amount.label}
				</span>
				<span
					className={clsx('-mt-2 text-xl font-extralight', {
						'text-transparent': amount.value === 0,
						'text-gray-500': amount.value !== 0,
					})}
				>
					{amount.value === 0 ? 'x' : amount.value}
				</span>
			</div>
		</div>
	);
}
