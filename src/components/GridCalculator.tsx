import { CheckIcon } from 'lucide-react';
import {
	type Action,
	type CalculatorState,
	append,
	decimal,
	operation,
	pop,
} from '../calulator';

interface GridCalculatorProps {
	setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
	isValid: boolean;
}

export function GridCalculator(props: GridCalculatorProps) {
	const { setState, isValid } = props;

	function onAction(action: Action) {
		setState(action);
	}

	return (
		<div className="grid grid-cols-4 gap-2">
			<ActionButton
				onAction={onAction}
				action={append(7)}
				label="7"
			/>
			<ActionButton
				onAction={onAction}
				action={append(8)}
				label="8"
			/>
			<ActionButton
				onAction={onAction}
				action={append(9)}
				label="9"
			/>
			<ActionButton
				className="text-accent-focus"
				onAction={onAction}
				action={pop}
				label="⌫"
			/>
			<ActionButton
				onAction={onAction}
				action={append(4)}
				label="4"
			/>
			<ActionButton
				onAction={onAction}
				action={append(5)}
				label="5"
			/>
			<ActionButton
				onAction={onAction}
				action={append(6)}
				label="6"
			/>
			<ActionButton
				onAction={onAction}
				action={operation('+/−')}
				size="small"
				label="+/−"
			/>
			<ActionButton
				onAction={onAction}
				action={append(1)}
				label="1"
			/>
			<ActionButton
				onAction={onAction}
				action={append(2)}
				label="2"
			/>
			<ActionButton
				onAction={onAction}
				action={append(3)}
				label="3"
			/>
			<ActionButton
				onAction={onAction}
				action={operation('×/÷')}
				size="small"
				label="×/÷"
			/>

			<ActionButton onAction={onAction} action={decimal} label="." />

			<ActionButton
				onAction={onAction}
				action={append(0)}
				label="0"
			/>
			<ActionButton onAction={onAction} action={decimal} label="." />

			<button
				className="flex items-center justify-center bg-success text-neutral disabled:bg-gray-200"
				type="submit"
				disabled={!isValid}
			>
				<CheckIcon size={30} />
			</button>
		</div>
	);
}

interface ActionButtonProps {
	label: string;
	size?: 'default' | 'small';
	className?: string;
	action: Action;
	onAction: (action: Action) => void;
}

function ActionButton(props: ActionButtonProps) {
	const {
		size = 'default',
		label,
		action,
		onAction,
		className,
	} = props;

	function onClick() {
		onAction(action);
	}

	return (
		<button
			onClick={onClick}
			type="button"
			className="bg-secondary-50 flex items-center justify-center bg-accent bg-opacity-10 py-1 text-3xl font-light"
		>
			{label}
		</button>
	);
}
