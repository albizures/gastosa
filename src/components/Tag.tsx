import clsx from 'clsx';

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
			className={clsx('badge-primary badge badge-lg text-lg', {
				'badge-outline': !active,
			})}
		>
			{children}
		</button>
	);
}
