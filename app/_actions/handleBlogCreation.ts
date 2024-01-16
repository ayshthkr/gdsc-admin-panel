'use server'

import { BlogData } from "../(admin)/create-blog/page";

export default async function handleBlogCreation(blogData: BlogData,formdata: FormData) {
    console.log(blogData.content);
    return {};
}