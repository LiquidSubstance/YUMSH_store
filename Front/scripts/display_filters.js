const filter_wrapper = document.querySelector(".not-price");
function create_filter(filter) {
    let element = document.createElement("div");
    element.className = "filter-item-wrapper";
    element.id = "filter-wrapper-" + filter.id
    element.innerHTML = `
            <input class = "filter-item" type = "checkbox" id = "filter-` + filter.id + `">
            <label for = "filter-` + filter.id + `"> `+ filter.name + ` </label>
            <button class = "delete-filter-button" id = "delete-filter-`+ filter.id +`">Удалить этот фильтр</button>
        `
    return element;
}
async function load_filters() {
    const filters_res = await fetch("/get_filters", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    console.log(filters_res);
    filter_wrapper.innerHTML = "";
    let all_filter_items = Array.from(await filters_res.json());
    all_filter_items.sort((a, b) => a.attribute.localeCompare(b.attribute));
    let i = 0;
    for (i = 0; i < all_filter_items.length; i++) {
        let category = document.createElement("div");
        let category_name = document.createElement("p");
        category_name.textContent = all_filter_items[i].attribute;
        category.appendChild(category_name);
        let current_attribute = all_filter_items[i].attribute;
        while (i < all_filter_items.length && all_filter_items[i].attribute === current_attribute) {
            category.appendChild(create_filter(all_filter_items[i]));
            i++;
        }
        i--;
        category.appendChild(document.createElement("hr"));
        filter_wrapper.appendChild(category);
    }
}