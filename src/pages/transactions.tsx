import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import type { Transaction } from '../types';
import { api } from '../utils/api';

export default function Transactions() {
	const { data: sessionData } = useSession();

	const query = api.transactions.getAll.useQuery(undefined, {
		enabled: sessionData?.user !== undefined,
	});

	if (query.isLoading) {
		return 'Loading...';
	}

	if (query.isError) {
		return 'An error accorred';
	}

	return (
		<div>
			<TransactionList transactions={query.data} />
		</div>
	);
}

interface TransactionListProps {
	transactions: Transaction[];
}

export function TransactionList(props: TransactionListProps) {
	const { transactions } = props;
	return (
		<ul>
			{transactions.map((transaction) => {
				const { id, amount, tags, type, comment } = transaction;
				return (
					<li key={id} className="">
						<div
							className={clsx({
								'text-red-600': type === 'OUT',
								'text-green-800': type === 'IN',
							})}
						>
							{type === 'OUT' ? '-' : '-'}
							{amount}
						</div>
						<div>{comment}</div>
						<ul>
							{tags.map((tag) => {
								const { id, name } = tag;
								return (
									<li
										className="inline-block rounded-lg bg-gray-300 px-1 text-sm font-semibold"
										key={id}
									>
										{name}
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
}
