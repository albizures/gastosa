import { api } from '../utils/api';
import React from 'react';
import clsx from 'clsx';
import { Tag } from '../components/Tag';
import { TransactionTypeRadio } from '../components/TransactionTypeToggle';
import type { TransactionType } from '../types';
import {
	type Action,
	append,
	decimal,
	operation,
	pop,
	type CalculatorState,
} from '../calulator';
import formatISO from 'date-fns/formatISO';

function toggleTag(tag: string) {
	return (current: string[]) => {
		if (current.includes(tag)) {
			return current.filter((t) => t !== tag);
		} else {
			return current.concat(tag);
		}
	};
}

export default function Index() {
	const [state, setState] = React.useState<CalculatorState>({
		label: '',
		value: 0,
	});
	const mutation = api.transactions.create.useMutation({
		onMutate() {
			reset();
		},
	});
	const allTags = api.tags.getAll.useQuery();
	const [tags, setTags] = React.useState<string[]>([]);
	const [type, setType] = React.useState<TransactionType>('OUT');
	const commentRef = React.useRef<HTMLTextAreaElement>(null);

	function onChangeType(type: TransactionType) {
		setType(type);
	}

	function onAction(action: Action) {
		setState(action);
	}

	function reset() {
		setState({ label: '', value: 0 });
		setTags([]);
		commentRef.current!.value = '';
	}

	function onDone() {
		if (state.value === 0) {
			return;
		}

		mutation.mutate({
			amount: state.value,
			type,
			date: formatISO(new Date()),
			comment: commentRef.current?.value ?? '',
			tags,
		});
	}

	return (
		<div className="flex flex-1">
			<div className="flex flex-1 flex-col">
				<div className="flex flex-1 flex-col justify-around">
					<div className="flex flex-1 items-center justify-center">
						<div>
							<TransactionTypeRadio
								type={type}
								onChange={onChangeType}
							/>
						</div>
					</div>
					<div className="flex flex-1 items-center justify-center">
						<Amount amount={state} />
					</div>
					<div className="flex flex-1 items-start justify-center">
						<textarea
							ref={commentRef}
							name="text"
							className="mt-3 resize-none border-0 text-center text-xl font-light text-gray-400 
						focus:bg-gray-100 focus:text-black focus:outline-none"
							wrap="soft"
							placeholder="Your comment ..."
						></textarea>
					</div>
				</div>
				<div className="flex-1">
					<div className="flex w-full flex-wrap justify-center gap-2">
						{allTags.data?.map((tag) => {
							const { name, id } = tag;
							return (
								<Tag
									active={tags.includes(name)}
									onClick={() => setTags(toggleTag(name))}
									key={id}
								>
									{name}
								</Tag>
							);
						})}
					</div>
					<div className="grid grid-cols-4 gap-2">
						<ActionButton
							onAction={onAction}
							action={operation('+')}
							size="small"
							label="+"
						/>
						<ActionButton
							onAction={onAction}
							action={operation('-')}
							size="small"
							label="-"
						/>
						<ActionButton
							onAction={onAction}
							action={operation('*')}
							size="small"
							label="*"
						/>
						<ActionButton
							onAction={onAction}
							action={operation('/')}
							size="small"
							label="/"
						/>
					</div>
					<div className="mx-auto mt-2 grid max-w-md grid-cols-3 grid-rows-4 gap-2 ">
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
							action={decimal}
							label="."
						/>
						<ActionButton
							onAction={onAction}
							action={append(0)}
							label="0"
						/>
						<div className="text-center">
							<ActionButton
								className="text-accent-focus"
								onAction={onAction}
								action={pop}
								label="⌫"
							/>
						</div>
					</div>
					<div className="mx-auto max-w-md px-8 pt-4 text-center">
						<button
							onClick={onDone}
							disabled={state.value === 0}
							className={clsx(
								'btn-primary btn-md btn w-full max-w-xs rounded-full text-xl ',
							)}
						>
							Add
						</button>
					</div>
				</div>
			</div>
			<div className="hidden flex-1 shadow-inner md:block"></div>
		</div>
	);
}

interface AmountProps {
	amount: CalculatorState;
}

function Amount(props: AmountProps) {
	const { amount } = props;
	return (
		<div className="text-center">
			<div className="flex flex-col">
				<span className="text-6xl font-extralight">
					{amount.label === '' ? '0.0' : amount.label}
				</span>
				<span
					className={clsx('-mt-2 text-2xl', {
						'text-transparent': amount.value === 0,
						'text-gray-400': amount.value !== 0,
					})}
				>
					{amount.value === 0 ? 'x' : amount.value}
				</span>
			</div>
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
		<div className="text-center">
			<button
				onClick={onClick}
				className={clsx(
					'rounded-full font-light active:bg-gray-100',
					{
						'px-4 py-1 text-3xl': size === 'default',
						'px-5 py-3 text-2xl': size === 'small',
					},
					className,
				)}
			>
				{label}
			</button>
		</div>
	);
}
