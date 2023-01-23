import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
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
	const mutation = api.transactions.create.useMutation();
	const [tags, setTags] = React.useState<string[]>([]);
	const [type, setType] = React.useState<TransactionType>('OUT');

	function onChangeType(type: TransactionType) {
		setType(type);
	}

	function onAction(action: Action) {
		setState(action);
	}

	function onDone() {
		if (state.value === 0) {
			return;
		}

		mutation.mutate({
			amount: state.value,
			type,
			date: new Date(),
			comment: '',
			tags,
		});
	}

	const defaultTags = [
		'Internet',
		'Uber',
		'Netflix',
		'Fast Food',
		'Gas',
	];

	return (
		<div className="flex h-full flex-col justify-between">
			<div className="flex justify-center">
				<TransactionTypeRadio type={type} onChange={onChangeType} />
			</div>
			<div className="flex flex-1 items-center">
				<div className="w-full text-center">
					<Amount amount={state} />
					<textarea
						name="text"
						className="mt-3 resize-none border-0 text-center text-xl font-light text-gray-400 
						focus:bg-gray-100 focus:text-black focus:outline-none"
						wrap="soft"
						placeholder="Your comment ..."
					></textarea>
				</div>
			</div>
			<div>
				<div className="flex flex-wrap gap-2">
					{defaultTags.map((tag, index) => {
						return (
							<Tag
								active={tags.includes(tag)}
								onClick={() => setTags(toggleTag(tag))}
								key={index}
							>
								{tag}
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
				<div className="mx-auto max-w-md pt-4 text-center">
					<button
						onClick={onDone}
						disabled={state.value === 0}
						className={clsx(
							'btn-primary btn-lg btn w-full max-w-xs rounded-full text-4xl ',
						)}
					>
						✓
					</button>
				</div>
			</div>
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
				<span className="text-8xl font-extralight">
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
						'py-4 px-6 text-4xl': size === 'default',
						'py-4 px-6 text-2xl': size === 'small',
					},
					className,
				)}
			>
				{label}
			</button>
		</div>
	);
}

// export default function Home() {
// 	return (
// 		<>
// 			<Head>
// 				<title>Gastosa</title>
// 				<meta
// 					name="description"
// 					content="Generated by create-t3-app"
// 				/>
// 				<link rel="icon" href="/favicon.ico" />
// 			</Head>
// 			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
// 				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
// 					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
// 						Create{' '}
// 						<span className="text-[hsl(280,100%,70%)]">T3</span> App
// 					</h1>
// 					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
// 						<Link
// 							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
// 							href="https://create.t3.gg/en/usage/first-steps"
// 							target="_blank"
// 						>
// 							<h3 className="text-2xl font-bold">First Steps →</h3>
// 							<div className="text-lg">
// 								Just the basics - Everything you need to know to set
// 								up your database and authentication.
// 							</div>
// 						</Link>
// 						<Link
// 							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
// 							href="https://create.t3.gg/en/introduction"
// 							target="_blank"
// 						>
// 							<h3 className="text-2xl font-bold">Documentation →</h3>
// 							<div className="text-lg">
// 								Learn more about Create T3 App, the libraries it uses,
// 								and how to deploy it.
// 							</div>
// 						</Link>
// 					</div>
// 					<div className="flex flex-col items-center gap-2">
// 						<AuthShowcase />
// 					</div>
// 				</div>
// 			</main>
// 		</>
// 	);
// }

// function AuthShowcase() {
// 	const { data: sessionData } = useSession();

// 	const { data: secretMessage } = api.transactions.getAll.useQuery(
// 		undefined,
// 		{
// 			enabled: sessionData?.user !== undefined,
// 		},
// 	);

// 	return (
// 		<div className="flex flex-col items-center justify-center gap-4">
// 			<p className="text-center text-2xl text-white">
// 				{sessionData && (
// 					<span>Logged in as {sessionData.user?.name}</span>
// 				)}
// 				{secretMessage && (
// 					<span> - {JSON.stringify(secretMessage)}</span>
// 				)}
// 			</p>
// 			<button
// 				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
// 				onClick={
// 					sessionData ? () => void signOut() : () => void signIn()
// 				}
// 			>
// 				{sessionData ? 'Sign out' : 'Sign in'}
// 			</button>
// 		</div>
// 	);
// }
