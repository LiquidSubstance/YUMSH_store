const select = document.querySelector(".sort-form");
let wrapper = document.querySelector(".catalogue");
select.addEventListener("change", async () => {
    let current_items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
    let items = new Array();
    for (const item of current_items) {
        const item_res = await fetch("/get_item?id=" + item.id, {
            method: "GET",
            headers: {"content-type": "application/json"},
        })
        items.push(await item_res.json())
    }
    const option = select.value;
    items.sort((a, b) => {
        switch (option) {
            case "price-asc":
                return Number(a.price) - Number(b.price);
            case "price-desc":
                return Number(b.price) - Number(a.price);
            case "date-asc":
                return Number(a.date) - Number(b.date);
            case "date-desc":
                return Number(b.date) - Number(a.date);
            case "type":
                return a.type.localeCompare(b.type);
        }
    })
    wrapper.innerHTML = "";
    items.forEach(item => {
        wrapper.appendChild(create_element(item));
    })
});