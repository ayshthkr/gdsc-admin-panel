import React from "react";
import Link from "next/link";
import Image from "next/image";
const Sidebar = () => {
    return (
        <section className="w-full  p-5  font-bold h-screen  border">
            <Link
                href="/"
                className="  w-full flex justify-start gap-5 items-center p-2 mb-5 mt-3"
            >
                <Image
                    src="/logo.png"
                    width={25}
                    height={25}
                    alt="logo"
                    className="w-[50px] h-[50px]"
                ></Image>
                <p className="font-semibold text-2xl">GDSC NSUT</p>
            </Link>

            <div className="text-gray-300 ml-5 my-[75px] flex-col">
                <Link
                    href="/create-blog"
                    className="cursor:pointer  hover:text-gray-400 block"
                >
                    Create Blog
                </Link>

                <Link
                    href="/create-blog"
                    className="cursor:pointer  hover:text-gray-400 block"
                >
                    All Blogs
                </Link>

                <Link
                    href="/create-blog"
                    className="cursor:pointer  hover:text-gray-400 block"
                >
                    More ...
                </Link>
            </div>
        </section>
    );
};

export default Sidebar;
