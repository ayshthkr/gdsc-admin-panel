"use client";
import React, { useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

const RichEditor = ({ richHtml, setRichHtml }) => {
    return <ReactQuill theme="snow" value={richHtml} onChange={setRichHtml} />;
};

export default RichEditor;
