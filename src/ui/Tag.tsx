import clsx from 'clsx';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface TagProps {
	children: React.ReactNode;
	active?: boolean;
	onClick: () => void;
}

export function Tag(props: TagProps) {
	const { children, active = false, onClick } = props;
	return (
		<button
			onClick={onClick}
			className={clsx(
				'badge-primary badge whitespace-nowrap badge-lg text-lg',
				{
					'bg-opacity-5': !active,
				},
			)}
		>
			{children}
		</button>
	);
}

interface TagFieldProps {
	children: React.ReactNode;
	input: UseFormRegisterReturn<'tags' | 'newTags'>;
	value: string;
	defaultChecked?: boolean;
}

export function TagField(props: TagFieldProps) {
	const { children, input, value, defaultChecked } = props;
	return (
		<label>
			<input
				{...input}
				defaultChecked={defaultChecked}
				value={value}
				type="checkbox"
				className="peer sr-only"
			/>
			<span className="badge-primary whitespace-nowrap badge badge-lg bg-opacity-5 text-lg peer-checked:bg-opacity-100">
				{children}
			</span>
		</label>
	);
}
