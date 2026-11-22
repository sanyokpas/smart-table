import {sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            field = action.dataset.field;
            const currentValue = action.dataset.value;
            order = sortMap[currentValue] || 'none';
            action.dataset.value = order;

            columns.forEach(col => {
                if (col !== action) {
                    col.dataset.value = 'none';
                }
            });
        } else {
            const activeBtn = columns.find(col => col.dataset.value !== 'none');
            if (activeBtn) {
                field = activeBtn.dataset.field;
                order = activeBtn.dataset.value;
            }
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null;

        return sort
            ? Object.assign({}, query, {sort})
            : query;
    };
}