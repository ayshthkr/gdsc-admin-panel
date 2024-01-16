// "use client" is not necessary in React, so I removed it.
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./EditorStyle.css";

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
        <div className="w-full p-2">
            <div>
                <label htmlFor="title" className="font-semibold">Blog Title:</label>
                <input
                    type="text"
                    value={blogData?.title}
                    onChange={(e) => {
                        setBlogData({ ...blogData, title: e.target.value });
                    }}
                    className="outline outline-2 outline-gray-500 focus:outline-gray-800 mt-2 w-full p-2 mb-4 font-bold text-xl"
                />
            </div>
            <ReactQuill
                theme="snow"
                value={richHtml}
                onChange={setRichHtml}
                className="border w-full "
            />
        </div>
    );
};

export default RichEditor;
