'use client';

import { ChangeEvent, useRef, useState } from 'react';
import RichEditor from '@/components/RichEditor';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, XCircle } from 'lucide-react';
import handleBlogCreation from '@/app/_actions/handleBlogCreation';
import { useFormStatus } from 'react-dom';

export type BlogData = {
	title: string;
	content: string;
	tagsArr: string[];
	coverImage: string;
	author: string;
};

const Page = () => {
	const tagInput = useRef<HTMLInputElement>(null);
	const [richHtml, setRichHtml] = useState('');
	const [tag, setTag] = useState('');
	const [blogData, setBlogData] = useState<BlogData>({
		title: '',
		content: '',
		tagsArr: [] as string[], // Initialize with an empty array
		coverImage: '',
		author: '',
	});

	const handleAddTag = (tag: string) => {
		setBlogData({ ...blogData, tagsArr: [...blogData.tagsArr, tag] });
		setTag('');
		tagInput.current?.focus();
	};

	const handleRemoveTag = (tag: string) => {
		setBlogData({
			...blogData,
			tagsArr: blogData.tagsArr.filter(t => t !== tag),
		});
		tagInput.current?.focus();
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file == null) return;
		const filePath = await toBase64(file[0]);
		setBlogData(old => ({
			...old,
			coverImage: filePath,
		}));
	};

	const formAction = handleBlogCreation.bind(null, blogData);

	return (
		<form
			action={formAction}
			className='w-full mx-auto xl:grid xl:grid-cols-4'>
			<div className='col-span-3'>
				<h1 className='font-extrabold pl-2 py-2 text-2xl underline decoration-4 underline-offset-4'>
					Create A Blog
				</h1>
				<div>
					<div className='w-full p-2 flex flex-col space-y-3'>
						<div className='flex flex-col space-y-3'>
							<Label
								htmlFor='title'
								className='text-xl font-semibold'>
								Blog Title:
							</Label>
							<Input
								type='text'
								name='title'
								value={blogData?.title}
								placeholder='Enter title here...'
								className='font-bold'
								onChange={e => {
									setBlogData({
										...blogData,
										title: e.target.value,
									});
								}}
							/>
						</div>
						<RichEditor
							richHtml={richHtml}
							setRichHtml={setRichHtml}
							blogData={blogData}
							setBlogData={setBlogData}
						/>
					</div>
				</div>

				<div className='p-2'>
					<center className='text-2xl font-bold'>Preview</center>
					<div
						dangerouslySetInnerHTML={{
							// __html: DOMPurify.sanitize(richHtml),
							__html: richHtml,
						}}></div>
				</div>
			</div>
			<div className='dark col-span-1 sticky top-0 right-0 self-start border-[1px] border-gray-400 p-2 bg-card text-card-foreground flex flex-col space-y-3 justify-start items-center w-full xl:min-h-screen'>
				<div className='w-full font-bold text-center underline decoration-2 underline-offset-4 py-2 text-xl'>
					Blog Information
				</div>
				<div className='flex flex-col p-2 space-y-5 w-full'>
					<div className='flex flex-col space-y-3'>
						<Label htmlFor='file_input'>Cover Image:</Label>
						{blogData?.coverImage ? (
							<div className='relative'>
								<Image
									src={blogData?.coverImage}
									// src={"/img.png"}
									width={640}
									height={360}
									alt='cover image'
									className='bg-cover border-2 border-slate-200'
								/>
								<XCircle
									width={30}
									height={30}
									className='absolute top-2 right-2 rounded-full hover:bg-slate-400 text-slate-900 transition duration-200 hover:cursor-pointer'
									onClick={() =>
										setBlogData(old => ({
											...old,
											coverImage: '',
										}))
									}
								/>
							</div>
						) : (
							<div className='relative'>
								<input
									className='opacity-0 w-full absolute top-0 right-0 z-10 peer'
									id='file_input'
									name='file_input'
									type='file'
									accept='image/*'
									onChange={handleFileChange}
								/>
								<Button
									className='w-full peer-hover:bg-secondary-foreground/10 has-[:hover]:bg-secondary-foreground/10 transition duration-150 peer-hover:cursor-pointer'
									variant='outline'>
									<UploadCloud
										className=' bg-transparent p-0 h-9 w-9'
										// height={50}
										// width={50}
									/>
								</Button>
							</div>
						)}
					</div>
					<div className='flex flex-col space-y-3'>
						<Label
							// className='block mt-5 mb-1  font-medium text-gray-300  '
							htmlFor='author'>
							Author:
						</Label>

						<Input
							type='text'
							value={blogData?.author}
							name='author'
							// className='w-full rounded-sm border-gray-300 shadow-md   p-1 font-semibold'
							className='bg-inherit'
							onChange={e => {
								setBlogData({
									...blogData,
									author: e.target.value,
								});
							}}
						/>
					</div>
					<div className='flex flex-col space-y-3'>
						<Label htmlFor='tags'>Tags:</Label>

						<div className='flex space-x-3'>
							<Input
								type='text'
								name='tags'
								value={tag}
								ref={tagInput}
								onChange={e => {
									setTag(e.target.value);
								}}
								placeholder='Add tag...'
								className='w-full'
							/>
							<Button
								onClick={() => {
									handleAddTag(tag);
								}}
								variant='outline'>
								Add
							</Button>
						</div>
						<div className='p-1 flex flex-wrap'>
							{blogData?.tagsArr.map((tag, index) => (
								<Button
									key={index}
									// className='border-[1px] px-2 mx-1 p-[2px] rounded-md border-indigo-400 text-blue-500'
									variant='secondary'
									onClick={() => {
										handleRemoveTag(tag);
									}}
									className='m-1'>
									{tag}
								</Button>
							))}
						</div>
					</div>
				</div>
				<SubmitButton />
			</div>
		</form>
	);
};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type='submit'
			variant='outline'
			className='p-7 py-5 w-full font-extrabold text-xl '
			disabled={pending}>
			Submit
		</Button>
	);
}

const toBase64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = error => reject(error);
	});
};

export default Page;
