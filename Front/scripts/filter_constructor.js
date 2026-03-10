const open_button = document.querySelector(".open-button");
const close_button = document.querySelector(".close-button");
const upload_menu = document.querySelector(".filter-constructor-wrapper");
open_button.onclick = () => {
    upload_menu.style.display = "flex";
}
close_button.onclick = () => {
    upload_menu.style.display = "none";
}
window.onclick = () => {
    if (event.target === upload_menu) {
        upload_menu.style.display = "none";
    }
}
const form_type_filter = document.getElementById("type-select");
const form_comparison_filter = document.getElementById("comparison");
const form_name_filter = document.getElementById("select-name");
const preview_filter = document.getElementById("preview-filter-item");
const label_filter = document.getElementById("preview-filter-item-label");
form_type_filter.addEventListener("change", () => {
    preview_filter.dataset.type = form_type_filter.value;
})
form_comparison_filter.addEventListener("change", () => {
    preview_filter.dataset.property = form_comparison_filter.value;
})
form_name_filter.addEventListener("change", () => {
    preview_filter.dataset.content = form_name_filter.value;
    label_filter.textContent = form_name_filter.value;
})
function upload_filter() {
    const filter_wrapper = document.querySelector(".not-price");
    const form_type_filter = document.getElementById("type-select");
    const form_comparison_filter = document.getElementById("comparison");
    const form_name_filter = document.getElementById("select-name");
    if (!form_comparison_filter.value || !form_type_filter.value || !form_name_filter.value) {
        const upload_button = document.querySelector(".upload-button");
        upload_button.style.color = "red";
        upload_button.textContent = "Не удалось загрузить фильтр, отсутствуют обязательные атрибуты."
        setTimeout(() => {
            upload_button.style.color = "black";
            upload_button.textContent = "Загрузить"
        }, 1000)
    } else {
        const preview_filter = document.getElementById("preview-filter-item");
        const label_filter = document.getElementById("preview-filter-item-label");
        let new_filter = preview_filter.cloneNode(true);
        let new_label = label_filter.cloneNode(true);
        new_label.removeAttribute("id");
        const new_id = "by-" + form_comparison_filter.value + "-" + form_name_filter.value;
        new_filter.id = new_id;
        new_label.setAttribute("for", new_id)
        new_filter.className = "filter-item";
        new_filter.dataset.type = form_type_filter.value;
        new_filter.dataset.content = form_name_filter.value;
        new_filter.dataset.property = form_comparison_filter.value;
        new_filter.dataset.compareby = "equal";
        filter_wrapper.append(new_filter);
        filter_wrapper.append(new_label);
        filters.push(new Filter(new_filter.dataset.type, new_filter.dataset.content, new_filter.dataset.property, new_filter.dataset.compareby));
        raw_filters.push(new_filter);
    }
}
