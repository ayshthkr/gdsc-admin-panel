import React from "react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <section className="w-full m-2 px-0-2 text-gray-500  font-bold h-screen">
            <Link href="/">Logo</Link>

            <div>
                <Link
                    href="/create-blog"
                    className="cursor:pointer hover:underline hover:text-blue-500"
                >
                    Create Blog
                </Link>
                <p>All Blogs</p>
                <p>More functionality</p>
            </div>
        </section>
    );
};

export default Sidebar;
