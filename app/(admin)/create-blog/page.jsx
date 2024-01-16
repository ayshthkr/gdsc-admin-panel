"use client";
import { useState } from "react";
// import DOMPurify from "dompurify";
import RichEditor from "@/app/components/RichEditor";

const Page = () => {
    const [richHtml, setRichHtml] = useState("");

    if (typeof window === "undefined") return null;

    return (
        <section>
            {" "}
            <div className="w-[90vw] bg-red-500">
                <RichEditor richHtml={richHtml} setRichHtml={setRichHtml} />
            </div>
            <button
                className="bg-blue-500 px-3 py-1 rounded-sm"
                onClick={() => {
                    console.log("html is: ", richHtml);
                }}
            >
                Submit
            </button>
            <div>
                <div
                    dangerouslySetInnerHTML={{
                        // __html: DOMPurify.sanitize(richHtml),
                        __html: richHtml,
                    }}
                ></div>
            </div>
        </section>
    );
};

export default Page;
