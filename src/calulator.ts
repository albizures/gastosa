export interface CalculatorState {
	label: string;
	value: number;
}

export type Operations = '+' | '-' | '/' | '*';

const operations = `+-/*`;

export type Action = (state: CalculatorState) => CalculatorState;

export function isOperation(char?: string): char is Operations {
	return Boolean(char && operations.includes(char));
}

export function pop(state: CalculatorState) {
	const label = propStr(state.label);

	return {
		label,
		value: safeEval(label, state.value),
	};
}

export function propStr(value: string) {
	return value.slice(0, value.length - 1);
}

export function safeEval(label: string, current: number) {
	if (label.trim() === '') {
		return 0;
	}

	try {
		const value = Number(eval(label));
		if (Number.isNaN(value)) {
			return current;
		}
		return value;
	} catch (error) {
		return current;
	}
}

export function append(value: number) {
	return (state: CalculatorState) => {
		const label = `${state.label}${value}`;

		return {
			label,
			value: safeEval(label, state.value),
		};
	};
}

export function decimal(state: CalculatorState) {
	if (state.label.at(-1) === '.') {
		return state;
	}

	const label = `${state.label}.`;

	return {
		label,
		value: state.value,
	};
}

export function operation(operation: Operations) {
	return (state: CalculatorState) => {
		const lastChar = state.label.at(-1);
		if (state.label.trim() === '' && operation !== '-') {
			return state;
		}

		if (state.label.length === 1 && state.label === '-') {
			return state;
		}

		let label = state.label;
		if (isOperation(lastChar)) {
			if (lastChar !== operation) {
				label = `${propStr(state.label)}${operation}`;
			}
		} else {
			label = `${state.label}${operation}`;
		}

		return {
			label,
			value: state.value,
		};
	};
}
