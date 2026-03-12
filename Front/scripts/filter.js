wrapper = document.querySelector(".catalogue");
const raw_items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
class CatalogueItem {
    constructor(name, price, type, date) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.date = date;
    }
}
class Filter {
    constructor(type, content, property, compareby) {
        this.type = type;
        this.content = content;
        this.property = property;
        this.compareby = compareby;
    }
    applyFilter(items) {
        let fitting = new Set();
        items.forEach(item => {
            let prop = this.property;
            if (this.compareby === "equal" && item[prop] === this.content) {
                fitting.add(item);
            } else if (this.compareby === "greater" && Number(item[prop]) > Number(this.content)){
                fitting.add(item);
            } else if (this.compareby === "lesser" && Number(item[prop]) < Number(this.content)){
                fitting.add(item);
            }
        });
        return fitting;
    };
}

function uniteFilters(filters, items, wrapper, raw_items) {
    let all_items = new Set(items);
    filters.sort((a, b) => {
        return a.property.localeCompare(b.property);
    })
    console.log(filters);
    let j = 0;
    while (j < filters.length) {
        let fitting = filters[j].applyFilter(items);
        while (j < filters.length - 1 && filters[j].property === filters[j + 1].property) {
            j++;
            fitting = new Set([...filters[j].applyFilter(items), ...fitting]);
        }
        console.log(fitting);
        all_items = new Set([...all_items].filter(x => fitting.has(x)));
        j++;
    }
    let i = 0;
    wrapper.innerHTML = "";
    raw_items.forEach(item => {
        if (all_items.has(items[i])) {
            wrapper.appendChild(item);
        }
        i++;
    })
}
let raw_filters = Array.from(document.querySelectorAll(".filter-item"));
let items = []
raw_items.forEach(item => {
    let new_item = new CatalogueItem(item.dataset.name, item.dataset.price, item.dataset.type, item.dataset.date);
    items.push(new_item);
})
let filters = []
raw_filters.forEach(item => {
    if (item.dataset.type === "price") {
        item.dataset.content = item.value;
    }
    let current_filter = new Filter(item.dataset.type, item.dataset.content, item.dataset.property, item.dataset.compareby);
    filters.push(current_filter);
})
console.log(filters);
let i = 0;
let all_filters = new Array();
raw_filters.forEach(current_filter => {
    let current_filter_document = filters[i];
    console.log(current_filter_document);
    current_filter.addEventListener("change", () => {
        if (current_filter.checked && !all_filters.includes(current_filter_document)) {
            all_filters.push(current_filter_document);
            console.log(current_filter_document, "added");
        } else  if (!current_filter.checked) {
            all_filters = all_filters.filter(item => item !== current_filter_document);
            console.log(current_filter_document, "deleted");
        }
        uniteFilters(all_filters, items, wrapper, raw_items);
        console.log(all_filters);
    });
    i++;
    i %= filters.length;
})
