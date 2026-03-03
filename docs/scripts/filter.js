const filter_menu_not_price = document.querySelector(".not-price");
const filter_menu_price = document.querySelector(".price");
const wrapper = document.querySelector(".catalogue");
// const raw_items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
const items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
// class CatalogueItem {
//     constructor(name, price, type, date) {
//         this.name = name;
//         this.price = price;
//         this.type = type;
//         this.date = date;
//     }
// }
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
            if (this.compareby === "equal" && item.dataset[prop] === this.content) {
                fitting.add(item);
            } else if (this.compareby === "greater" && Number(item.dataset[prop]) > Number(this.content)){
                fitting.add(item);
            } else if (this.compareby === "lesser" && Number(item.dataset[prop]) < Number(this.content)){
                fitting.add(item);
            }
        });
        return fitting;
    };
}

function uniteFilters(filters, items, wrapper) {
    let all_items = new Set(items);
    filters.forEach(filter => {
        let fitting = filter.applyFilter(all_items, wrapper);
        if (filter.type === "intersect") {
            all_items = new Set([...all_items].filter(x => fitting.has(x)));
        } else {
            all_items = new Set([...all_items, ...fitting]);
        }
    })
    all_items.forEach(item => {
        wrapper.appendChild(item);
    })
}
let raw_filters = [];
filter_menu_not_price.forEach(item => {
    if (item.className === "form") {
        console.log(52)
        raw_filters.push(item);
    }
})
filter_menu_price.forEach(item => {
    if (item.className === "form") {
        raw_filters.push(item);
    }
})
// let items = []
// raw_items.forEach(item => {
//     let new_item = new CatalogueItem(item.dataset.name, item.dataset.price, item.dataset.type, item.dataset.date);
//     items.push(new_item);
// })
let filters = []
raw_filters.forEach(item => {
    if (item.dataset.type === "price") {
        item.dataset.content = item.value;
    }
    let current_filter = new Filter(item.dataset.type, item.dataset.content, item.dataset.property, item.dataset.compareby);
    filters.push(current_filter);
})
let i = 0;
let all_filters = new Set();
filters.forEach(current_filter => {
    current_filter.addEventListener("change", () => {
        if (raw_filters[i].checked) {
            all_filters.add(current_filter);
            uniteFilters(all_filters, items, wrapper);
        } else  {
            all_filters.delete(current_filter);
        }
    });
})