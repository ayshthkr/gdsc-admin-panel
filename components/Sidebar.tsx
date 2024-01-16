import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Sidebar = () => {
	return (
		<section className='w-full p-5  font-bold h-screen  border'>
			<Link
				href='/'
				className='border bg-gray-700 hover:bg-gray-800 transition rounded-full w-full flex justify-between gap-5 items-center p-5 my-4 '>
				<Image
					src='/logo.png'
					width={40}
					height={40}
					alt='logo'></Image>
				<p className='font-semibold text-2xl'>GDSC NSUT</p>
			</Link>

			<div className='text-gray-300 ml-5 my-[75px] flex-col'>
				<Link
					href='/create-blog'
					className='hover:text-gray-400 block'>
					Create Blog
				</Link>

				<Link
					href='/blogs'
					className=' hover:text-gray-400 block'>
					All Blogs
				</Link>

				<Link
					href='/logs'
					className='hover:text-gray-400 block'>
					Logs					
				</Link>

				<Link
					href='/create-blog'
					className=' hover:text-gray-400 block'>
					More ...
				</Link>
			</div>
		</section>
	);
};

export default Sidebar;
