"use client";

import React from "react";
import './pagination.css'

const Pagination = ({ pagination, handleClick }) => {
    const pageNumbers = [];
    const { pages, current_page, per_page } = pagination
    // Determine the range of page numbers to show
    let startPage, endPage;
    if (pages <= 5) {
        startPage = 1;
        endPage = pages;
    } else {
        if (current_page <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (current_page + 2 >= pages) {
            startPage = pages - 4;
            endPage = pages;
        } else {
            startPage = current_page - 2;
            endPage = current_page + 2;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <span>{current_page}- {(current_page * per_page < pagination?.total ? current_page * per_page : pagination?.total)} of {pagination?.total}</span>
            </div>
            <div>
                <button
                    onClick={() => handleClick(current_page - 1)}
                    disabled={current_page === 1}
                >
                    &lsaquo;
                </button>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleClick(page)}
                        disabled={page === current_page}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handleClick(current_page + 1)}
                    disabled={current_page === pages}
                >
                    &rsaquo;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
