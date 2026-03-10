const form_name = document.getElementById("file-upload-name");
const preview_name = document.getElementById("preview-name");
const form_price = document.getElementById("file-upload-price");
const preview_price = document.getElementById("preview-price");
const form_image = document.getElementById("file-upload-image");
const preview_image = document.getElementById("preview-image");

form_image.addEventListener("change", () => {
    let new_image = form_image.files[0];
    preview_image.src = URL.createObjectURL(new_image);
})
form_name.addEventListener("change", () => {
    preview_name.textContent = form_name.value;
})
form_price.addEventListener("change", () => {
    preview_price.textContent = form_price.value + "₽";
})
function upload_item(){
    wrapper = document.querySelector(".catalogue");
    const form_date = document.getElementById("file-upload-date")
    const form_price = document.getElementById("file-upload-price");
    const form_name = document.getElementById("file-upload-name");
    const form_image = document.getElementById("file-upload-image");
    const form_type = document.getElementById("file-upload-type");
    const preview_item = document.getElementById("preview");
    const button = document.getElementById("add-item-button");
    if (!form_date.value || !form_price.value || !form_name.value || !form_image.value || !form_type.value) {
        button.textContent = "Не удалось загрузить товар, отсутствуют обязательные атрибуты.";
        button.style.color = "red";
        setTimeout(() => {
            button.textContent = "Загрузить";
            button.style.color = "black";
        }, 1000)
    } else {
        const new_item = preview_item.cloneNode(true);
        new_item.removeAttribute("id");
        new_item.className = "catalogue-item";
        new_item.dataset.price = form_price.value;
        new_item.dataset.name = form_name.value;
        new_item.dataset.date = form_date.value;
        new_item.dataset.type = form_type.value;
        wrapper.append(new_item);
    }
}
