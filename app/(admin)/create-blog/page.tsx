'use client';

import { ChangeEvent, useRef, useState } from 'react';
import RichEditor from '@/components/RichEditor';
import Image from 'next/image';

type BlogData = {
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

	return (
		<section className='w-full mx-auto xl:grid xl:grid-cols-4'>
			<div className='col-span-3'>
				<h1 className='font-extrabold pl-2 py-2 text-2xl underline decoration-4 underline-offset-4'>
					Create A Blog
				</h1>
				<div>
					<RichEditor
						richHtml={richHtml}
						setRichHtml={setRichHtml}
						blogData={blogData}
						setBlogData={setBlogData}
					/>
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
			<div className='col-span-1 sticky top-0 right-0 self-start border-[1px] border-gray-400 p-2 bg-gray-900 flex flex-col justify-start items-center w-full xl:min-h-screen'>
				<h1 className='font-bold text-gray-300  py-2 text-xl'>
					Blog Information
				</h1>
				<hr />
				<div>
					<div>
						<label
							className='block mt-5 mb-1  font-medium text-gray-300  '
							htmlFor='file_input'>
							Cover Image
						</label>
						{blogData?.coverImage ? (
							<Image
								src={blogData?.coverImage}
								// src={"/img.png"}
								width={300}
								height={200}
								alt='cover image'></Image>
						) : null}

						<input
							className='block w-full text-xs text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 '
							id='file_input'
							type='file'
							accept='image/*'
							onChange={handleFileChange}
						/>
					</div>
					<div>
						<label
							className='block mt-5 mb-1  font-medium text-gray-300  '
							htmlFor='file_input'>
							Author
						</label>

						<input
							type='text'
							value={blogData?.author}
							className='w-full rounded-sm border-gray-300 shadow-md   p-1 font-semibold'
							onChange={e => {
								setBlogData({
									...blogData,
									author: e.target.value,
								});
							}}
						/>
					</div>
					<div>
						<label
							className='block mt-5 mb-1  font-medium text-gray-300  '
							htmlFor='file_input'>
							Tags
						</label>

						<div className='grid grid-cols-6 gap-1'>
							<input
								type='text'
								value={tag}
								ref={tagInput}
								className=' rounded-sm border-gray-300 shadow-md   p-1 font-semibold col-span-4'
								onChange={e => {
									setTag(e.target.value);
								}}
								placeholder='add tag...'
							/>
							<button
								className='col-span-2 rounded-md hover:bg-green-700 bg-green-500'
								onClick={() => {
									handleAddTag(tag);
								}}>
								Add
							</button>
						</div>
						<div className='p-1 text-gray-300 rounded-sm my-1'>
							{blogData?.tagsArr.map((tag, index) => (
								<span
									key={index}
									className='border-[1px] px-2 mx-1 p-[2px] rounded-md border-indigo-400 text-blue-500'
									onClick={() => {
										handleRemoveTag(tag);
									}}>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
				<button
					className='  ml-3 mt-10 hover:bg-green-700 bg-green-500 px-3 py-1 rounded-sm'
					onClick={() => {
						console.log('blogData is: ', blogData);
					}}>
					Submit
				</button>
			</div>
		</section>
	);
};

const toBase64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = error => reject(error);
	});
};

export default Page;
