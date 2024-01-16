// "use client" is not necessary in React, so I removed it.
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './EditorStyle.css';
import { BlogData } from '@/app/(admin)/create-blog/page';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichEditorProps {
	richHtml: string;
	setRichHtml: (value: string) => void;
	blogData?: BlogData;
	setBlogData: Dispatch<SetStateAction<BlogData>>;
}

const RichEditor = ({
	richHtml,
	setRichHtml,
	blogData,
	setBlogData,
}: RichEditorProps) => {
	useEffect(() => {
		setBlogData(old => ({ ...old, content: richHtml }));
	}, [richHtml]);

	return (
		<ReactQuill
			theme='snow'
			value={richHtml}
			onChange={setRichHtml}
			className='border w-full '
		/>
	);
};

export default RichEditor;
