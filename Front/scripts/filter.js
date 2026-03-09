const filter_menu_not_price = document.querySelectorAll(".not-price");
const filter_menu_price = document.querySelectorAll(".price");
wrapper = document.querySelector(".catalogue");
const raw_items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
let max_size = raw_items.length;
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

function uniteFilters(filters, items, wrapper, raw_items, max_size) {
    let all_items = new Set(items);
    let unions = Array();
    let intersections = Array();
    filters.forEach(filter => {
        let fitting = filter.applyFilter(items, wrapper);
        console.log(fitting);
        if (filter.type === "intersect") {
            intersections.push(fitting);
        } else if (filter.type === "union") {
            unions.push(fitting);
        }
    })
    unions.forEach(fitting => {
        if (all_items.size === max_size) {
            all_items = new Set([...items].filter(x => fitting.has(x)));
        } else {
            all_items = new Set([...all_items, ...fitting]);
        }
    })
    intersections.forEach(fitting => {
        all_items = new Set([...all_items].filter(x => fitting.has(x)));
    })
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
let all_filters = new Set();
window.addEventListener("change", () =>
    raw_filters.forEach(current_filter => {
        let current_filter_document = filters[i];
        console.log(current_filter_document);
        current_filter.addEventListener("change", () => {
            if (current_filter.checked) {
                all_filters.add(current_filter_document);
                console.log(current_filter_document, "added");
                uniteFilters(all_filters, items, wrapper, raw_items, max_size);
            } else  if (!current_filter.checked) {
                all_filters.delete(current_filter_document);
                console.log(current_filter_document, "deleted");
                uniteFilters(all_filters, items, wrapper, raw_items, max_size);
            }
            console.log(all_filters);
        });
        i++;
        i %= filters.length;
    })
)
