import { type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { XIcon, PlusIcon } from 'lucide-react';
import { api } from '../utils/api';
import clsx from 'clsx';
import { TagField } from './Tag';
import React from 'react';

interface TagListProps {
	input: UseFormRegisterReturn<'tags'>;
	newTagsinput: UseFormRegisterReturn<'newTags'>;
}

interface NewTag {
	name: string;
}
export function TagList(props: TagListProps) {
	const { input, newTagsinput } = props;
	const allTags = api.tags.getAll.useQuery();
	const { register, reset, watch } = useForm<NewTag>();
	const [newTags, setNewTags] = React.useState<string[]>([]);
	const [mode, setMode] = React.useState<'modal' | 'inline'>(
		'inline',
	);

	const isModal = mode === 'modal';

	function onSetModeModal() {
		setMode('modal');
	}

	function onSetModeInline() {
		setMode('inline');
	}

	function onAddTag() {
		const name = watch('name');
		setNewTags((current) => current.concat(name));
		reset();
	}

	const tags = allTags.data ?? [];

	return (
		<div
			className={clsx({
				'fixed inset-0 flex items-center bg-slate-200 bg-opacity-40 p-8 backdrop-blur-sm':
					mode === 'modal',
			})}
		>
			{mode === 'modal' && (
				<button
					onClick={onSetModeInline}
					className="absolute inset-0"
				/>
			)}
			<div
				className={clsx({
					'relative border bg-base-100 p-4 shadow': mode === 'modal',
				})}
			>
				{mode === 'modal' && (
					<>
						<button
							type="button"
							className="absolute right-4 top-4"
							onClick={onSetModeInline}
						>
							<XIcon />
						</button>

						<div className="mb-2">
							<h3 className="text-xl uppercase">add a new tag</h3>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Tag name</span>
								</label>
								<div className="input-group">
									<input
										type="text"
										placeholder="new tag..."
										{...register('name')}
										className="input-bordered input input-sm w-full max-w-xs"
									/>
									<button
										type="button"
										onClick={onAddTag}
										className="btn-primary btn-square btn-sm btn"
									>
										<PlusIcon />
									</button>
								</div>
							</div>
							<div className="divider">OR</div>
							<h3 className="text-xl uppercase">Choose a tag</h3>
						</div>
					</>
				)}
				<div
					className={clsx({
						'relative mt-4 flex w-full flex-nowrap gap-2 overflow-x-auto overflow-y-hidden pb-4':
							mode === 'inline',
						'flex flex-wrap gap-1': mode === 'modal',
					})}
				>
					{newTags.map((name, index) => {
						return (
							<TagField
								defaultChecked={true}
								input={newTagsinput}
								value={name}
								key={index}
							>
								{name}
							</TagField>
						);
					})}
					{tags.map((tag) => {
						const { name, id } = tag;
						return (
							<TagField input={input} value={id} key={id}>
								{name}
							</TagField>
						);
					})}

					{mode === 'inline' && (
						<div className="sticky right-0 rounded-l-full bg-base-100 pl-1">
							<button
								type="button"
								onClick={onSetModeModal}
								className="flex h-6 w-6 items-center justify-center rounded-full border border-primary text-lg"
							>
								+
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
