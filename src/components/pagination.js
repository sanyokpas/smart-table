import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}) => {
    pages.replaceChildren();
    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        if (action) {
            if (action.name === 'first') page = 1;
            if (action.name === 'prev') page = Math.max(1, page - 1);
            if (action.name === 'next') page = Math.min(pageCount, page + 1);
            if (action.name === 'last') page = pageCount;
        }

        page = Math.max(1, page || 1);

        return Object.assign({}, query, {
            limit,
            page
        });
    };

    const updatePagination = (total, {page, limit}) => {
        pageCount = Math.ceil(total / limit);
        const currentPage = Math.max(1, Math.min(pageCount || 1, page || 1));
        const visiblePages = getPages(currentPage, pageCount, 5);

        pages.replaceChildren(
            ...visiblePages.map(pageNum => {
                const label = document.createElement('label');
                label.className = 'pagination-button';
                label.setAttribute('aria-label', `Goto page ${pageNum}`);

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'page';
                input.value = pageNum;
                input.checked = pageNum === currentPage;

                const span = document.createElement('span');
                span.textContent = pageNum;

                label.append(input, span);
                return label;
            })
        );

        const from = total > 0 ? (currentPage - 1) * limit + 1 : 0;
        const to = Math.min(currentPage * limit, total);

        fromRow.textContent = from;
        toRow.textContent = to;
        totalRows.textContent = total;
    };

    return {
        updatePagination,
        applyPagination
    };
};