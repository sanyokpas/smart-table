export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const el = document.createElement('option');
                    el.textContent = name;
                    el.value = name;
                    return el;
                })
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const input = elements[`searchBy${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`];
            if (input) {
                input.value = '';
                delete state[fieldName];
            }
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (element) {
                if (['INPUT', 'SELECT'].includes(element.tagName) && element.value) {
                    filter[`filter[${element.name}]`] = element.value;
                }
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}