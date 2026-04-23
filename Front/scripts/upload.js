const form_name = document.getElementById("file-upload-name");
const preview_name = document.getElementById("preview-name");
const form_price = document.getElementById("file-upload-price");
const preview_price = document.getElementById("preview-price");
const form_image = document.getElementById("file-upload-image");
const preview_image = document.getElementById("preview-image");
const form_description = document.getElementById("page-constructor-text");
const preview_page_image = document.querySelector(".main-image")
const preview_description = document.querySelector(".item-description");
const preview_page_price = document.querySelector(".item-price");
const preview_page_name = document.querySelector(".item-name");

form_image.addEventListener("change", () => {
    let new_image = form_image.files[0];
    preview_image.src = URL.createObjectURL(new_image);
    preview_page_image.src = URL.createObjectURL(new_image);
});
form_name.addEventListener("change", () => {
    preview_name.textContent = form_name.value;
    preview_page_name.textContent = form_name.value;
});
form_price.addEventListener("change", () => {
    preview_price.textContent = form_price.value + "₽";
    preview_page_price.textContent = form_price.value + "₽";
});
form_description.addEventListener("change", () => {
    preview_description.textContent = form_description.value;
})
async function upload_item() {
    wrapper = document.querySelector(".catalogue");
    const form_date = document.getElementById("file-upload-date")
    const form_type = document.getElementById("file-upload-type");
    const button = document.getElementById("add-item-button");
    if (!form_date.value || !form_price.value || !form_name.value || !form_image.value || !form_type.value) {
        button.textContent = "Не удалось загрузить товар, отсутствуют обязательные атрибуты.";
        button.style.color = "red";
        setTimeout(() => {
            button.textContent = "Загрузить";
            button.style.color = "black";
        }, 1000)
    } else {
        const formdata = new FormData();
        const new_file = new File([form_image.files[0]], form_name.value, {type: form_image.files[0].type});
        formdata.append('file', new_file);
        formdata.append('name', form_name.value);
        await fetch("/upload_item_image", {
            method: "POST",
            body: formdata
        })
        await fetch("/upload_item", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: form_name.value,
                price: form_price.value,
                date: form_date.value,
                description: form_description.value,
                type: form_type.value,
                image_path: "../contents/" + form_name.value + ".png",
            })
        })
    }
}