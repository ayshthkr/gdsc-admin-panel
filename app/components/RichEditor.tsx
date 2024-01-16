// "use client" is not necessary in React, so I removed it.
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichEditorProps {
    richHtml: string;
    setRichHtml: (value: string) => void;
    blogData?: any;
    setBlogData?: any;
}

const RichEditor = ({
    richHtml,
    setRichHtml,
    blogData,
    setBlogData,
}: RichEditorProps) => {
    useEffect(() => {
        setBlogData({ ...blogData, content: richHtml });
    }, [richHtml]);

    return (
        <div className="w-w-full p-2">
            <div>
                <label htmlFor="title">Blog Title</label>
                <input
                    type="text"
                    value={blogData?.title}
                    onChange={(e) => {
                        setBlogData({ ...blogData, title: e.target.value });
                    }}
                    className="border-[1px] border-gray-500 w-full p-2 mb-4 font-bold text-xl"
                />
            </div>
            <div>
                <label htmlFor="title">Excerpt/ description</label>
                <input
                    type="text"
                    value={blogData?.description}
                    onChange={(e) => {
                        setBlogData({
                            ...blogData,
                            description: e.target.value,
                        });
                    }}
                    className="border-[1px] border-gray-500 w-full p-2 mb-5  font-semibold"
                />
            </div>
            <ReactQuill
                theme="snow"
                value={richHtml}
                onChange={setRichHtml}
                className="border border-red-500 w-full h-[500px]"
            />
        </div>
    );
};

export default RichEditor;
