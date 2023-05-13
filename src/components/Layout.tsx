interface LayoutProps {
	children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
	const { children } = props;
	return (
		<div className="bg-gradient-to-b from-green-100 to-orange-200 px-2">
			<div className="mx-auto flex min-h-screen max-w-4xl flex-col bg-base-100 p-4 shadow">
				{children}
			</div>
		</div>
	);
}
