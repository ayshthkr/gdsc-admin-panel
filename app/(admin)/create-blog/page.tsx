"use client";
import { useState } from "react";
// import DOMPurify from "dompurify";
import RichEditor from "@/app/components/RichEditor";
import Image from "next/image";
import { set } from "sanity";
const Page = () => {
    const [richHtml, setRichHtml] = useState("");
    const [tag, setTag] = useState("");
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        content: "",
        tagsArr: [] as string[], // Initialize with an empty array
        coverImage: "",
        author: "",
    });

    if (typeof window === "undefined") return null;

    const handleAddTag = (tag: string) => {
        setBlogData({ ...blogData, tagsArr: [...blogData.tagsArr, tag] });
        setTag("");
    };

    const handleRemoveTag = (tag: string) => {
        setBlogData({
            ...blogData,
            tagsArr: blogData.tagsArr.filter((t) => t !== tag),
        });
    };

    return (
        <section className="w-[80vw] mx-auto  grid grid-cols-4 ">
            <div className="col-span-3">
                <h1 className="font-bold pl-2 py-2 text-xl">Create Blog</h1>
                <div className="   ">
                    <RichEditor
                        richHtml={richHtml}
                        setRichHtml={setRichHtml}
                        blogData={blogData}
                        setBlogData={setBlogData}
                    />
                </div>

                <div>
                    <div
                        dangerouslySetInnerHTML={{
                            // __html: DOMPurify.sanitize(richHtml),
                            __html: richHtml,
                        }}
                    ></div>
                </div>
            </div>
            <div className="col-span-1  border-[1px] border-gray-400 p-2 bg-gray-900 flex-col justify-start items-center w-full">
                <h1 className="font-bold text-gray-300  py-2 text-xl">
                    Blog Information
                </h1>
                <hr />
                <div>
                    <div>
                        <label
                            className="block mt-5 mb-1  font-medium text-gray-300  "
                            htmlFor="file_input"
                        >
                            Cover Image
                        </label>
                        {blogData?.coverImage && (
                            <Image
                                src={blogData?.coverImage}
                                // src={"/img.png"}
                                width={300}
                                height={200}
                                alt="cover image"
                            ></Image>
                        )}

                        <input
                            className="block w-full text-xs text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 "
                            id="file_input"
                            type="file"
                            accept="image/*"
                            value={blogData?.coverImage}
                            onChange={(e) => {
                                setBlogData({
                                    ...blogData,
                                    coverImage: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label
                            className="block mt-5 mb-1  font-medium text-gray-300  "
                            htmlFor="file_input"
                        >
                            Author
                        </label>

                        <input
                            type="text"
                            value={blogData?.author}
                            className="w-full rounded-sm border-gray-300 shadow-md   p-1 font-semibold"
                            onChange={(e) => {
                                setBlogData({
                                    ...blogData,
                                    author: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label
                            className="block mt-5 mb-1  font-medium text-gray-300  "
                            htmlFor="file_input"
                        >
                            Tags
                        </label>

                        <div className="grid grid-cols-6 gap-1">
                            <input
                                type="text"
                                value={tag}
                                className=" rounded-sm border-gray-300 shadow-md   p-1 font-semibold col-span-4"
                                onChange={(e) => {
                                    setTag(e.target.value);
                                }}
                                placeholder="add tag..."
                            />
                            <button
                                className="col-span-2 rounded-md hover:bg-green-700 bg-green-500"
                                onClick={() => {
                                    handleAddTag(tag);
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div className="p-1 text-gray-300 rounded-sm my-1">
                            {blogData?.tagsArr.map((tag, index) => (
                                <span
                                    key={index}
                                    className="border-[1px] px-2 mx-1 p-[2px] rounded-md border-indigo-400 text-blue-500"
                                    onClick={() => {
                                        handleRemoveTag(tag);
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    className="  ml-3 mt-10 hover:bg-green-700 bg-green-500 px-3 py-1 rounded-sm"
                    onClick={() => {
                        console.log("blogData is: ", blogData);
                    }}
                >
                    Submit
                </button>
            </div>
        </section>
    );
};

export default Page;
