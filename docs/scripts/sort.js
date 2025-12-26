const select = document.querySelector(".sort-form");
const wrapper = document.querySelector(".catalogue");
select.addEventListener("change", () => {
    const items = Array.from(wrapper.querySelectorAll(".catalogue-item"));
    const option = select.value;
    items.sort((a, b) => {
        switch (option) {
            case "price-asc":
                return Number(a.dataset.price) - Number(b.dataset.price);
            case "price-desc":
                return Number(b.dataset.price) - Number(a.dataset.price);
            case "date-asc":
                return Number(a.dataset.date) - Number(b.dataset.date);
            case "date-desc":
                return Number(b.dataset.date) - Number(a.dataset.date);
            case "type":
                return a.dataset.type.localeCompare(b.dataset.type);
        }
    })
    items.forEach(item => {
        wrapper.appendChild(item);
    })
});