const open_button = document.querySelector(".open-button");
const close_button = document.querySelector(".close-button");
const upload_menu = document.querySelector(".filter-constructor-wrapper");
open_button.onclick = () => {
    upload_menu.style.display = "flex";
}
close_button.onclick = () => {
    upload_menu.style.display = "none";
}
window.onclick = (event) => {
    if (event.target === upload_menu) {
        upload_menu.style.display = "none";
    }
}
const form_filter_name = document.getElementById("select-name");
form_filter_name.addEventListener("change", () => {
    const preview_filter_name = document.getElementById("preview-filter-item-label")
    preview_filter_name.textContent = form_filter_name.value;
});
async function upload_filter() {
    const form_attribute_filter = document.getElementById("select-attribute");
    const form_name_filter = document.getElementById("select-name");
    const form_content_filter = document.getElementById("select-content");
    if (!form_attribute_filter.value || !form_name_filter.value || !form_content_filter.value) {
        const upload_button = document.querySelector(".upload-button");
        upload_button.style.color = "red";
        upload_button.textContent = "Не удалось загрузить фильтр, отсутствуют обязательные атрибуты."
        setTimeout(() => {
            upload_button.style.color = "black";
            upload_button.textContent = "Загрузить"
        }, 1000)
    } else {
        const ans = await fetch("/add_filter", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({
                attribute: form_attribute_filter.value,
                name: form_name_filter.value,
                content: form_content_filter.value,
            })
        });
        const res = await ans.json();
        console.log(res);
    }
}