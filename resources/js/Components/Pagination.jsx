import { Link } from "@inertiajs/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({ pagination }) {
    const links = pagination.links.slice(1, -1);
    return pagination.links.length > 3 ? (
        <div className="my-4 flex items-center justify-between">
            <div>Showing 1 to 10 of {pagination.total} results</div>
            <div className="flex items-center gap-2 bg-white rounded-md border">
                <PreviousButton prev_page_url={pagination.prev_page_url} />
                {links.map((link) => (
                    <Link
                        className={`${
                            link.active ? "text-gray-950" : "text-gray-400"
                        } p-2 px-3`}
                        href={link.url}
                        key={link.url}
                    >
                        {link.label}
                    </Link>
                ))}
                <NextButton next_page_url={pagination.next_page_url} />
            </div>
        </div>
    ) : (
        <></>
    );
}

function PreviousButton({ prev_page_url }) {
    return (
        <span className="p-2 px-3">
            {prev_page_url ? (
                <Link href={prev_page_url}>
                    <IoIosArrowBack />
                </Link>
            ) : (
                <IoIosArrowBack />
            )}
        </span>
    );
}

function NextButton({ next_page_url }) {
    return (
        <span className="p-2 px-3">
            {next_page_url ? (
                <Link href={next_page_url}>
                    <IoIosArrowForward />
                </Link>
            ) : (
                <IoIosArrowForward />
            )}
        </span>
    );
}
