wrapper = document.querySelector(".catalogue");
const raw_items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
class CatalogueItem {
    constructor(name, price, type, date) {
        this.name = name;
        this.price = price;
        this.date = date;
        this.type = type;
    }
}
class Filter {
    constructor(content, property) {
        this.content = content;
        this.property = property;
    }
    applyFilter(items) {
        let fitting = new Set();
        items.forEach(item => {
            let prop = this.property;
            if (item[prop] === this.content) {
                fitting.add(item);
            }
        });
        return fitting;
    };
    applyPriceFilter(items) {
        let fitting = new Set();
        if (this.property === "price") {
            items.forEach(item => {
                let prop = this.property;
                if (Number(item[prop]) <= Number(this.content[0]) && Number(item[prop]) >= Number(this.content[1])) {
                    fitting.add(item);
                }
            });
            return fitting;
        }
    }
}

function uniteFilters(filters, items, wrapper, raw_items) {
    let all_items = new Set(items);
    filters.sort((a, b) => {
        return a.property.localeCompare(b.property);
    })
    console.log(filters);
    let j = 0;
    while (j < filters.length) {
        if (filters[j].property === "price") {
            let fitting = filters[j].applyPriceFilter(items);
            console.log(fitting);
            all_items = new Set([...all_items].filter(x => fitting.has(x)));
            j++;
            continue;
        }
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
    console.log(all_items);
    raw_items.forEach(item => {
        if (all_items.has(items[i])) {
            wrapper.appendChild(item);
        }
        i++;
    })
}
let raw_filters = Array.from(document.querySelectorAll(".filter-item"));
let items = []
async function get_items_list() {
    const items_res = await fetch("/get_items", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    console.log(items_res);
    let all_catalogue_items = Array.from(await items_res.json());
    all_catalogue_items.forEach(item => {
        let new_item = new CatalogueItem(item.name, item.price, item.type, item.date);
        items.push(new_item);
    })
}
get_items_list();
let filters = []
raw_filters.forEach(item => {
    let current_filter = new Filter(item.dataset.content, item.dataset.property);
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
});
let price_down = document.getElementById("by-price-up");
let price_up = document.getElementById("by-price-down");
let price_filter = new Filter([1e9, -1], "price");
let price_filter_wrapper = document.querySelector(".price");
price_filter_wrapper.addEventListener("change", () => {
    all_filters = all_filters.filter(item => item !== price_filter);
    price_filter.content[0] = price_down.value;
    price_filter.content[1] = price_up.value;
    if (!price_down.value) {
        price_filter.content[0] = 1e9
    }
    if (!price_up.value) {
        price_filter.content[1] = -1;
    }
    all_filters.push(price_filter);
    uniteFilters(all_filters, items, wrapper, raw_items);
})
