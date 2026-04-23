const constructor_open_button = document.querySelector(".open-attribute-constructor");
const constructor_close_button = document.querySelector(".close-attribute-constructor");
const constructor_menu = document.querySelector(".attribute-constructor-wrapper");
constructor_close_button.onclick = () => {
    constructor_menu.style.display = "none";
};
constructor_open_button.onclick = () => {
    constructor_menu.style.display = "flex";
};
window.onclick = () => {
    if (event.target === constructor_menu) {
        constructor_menu.style.display = "none";
    }
};
async function upload_attribute() {
    const attribute_form = document.getElementById("attribute-property");
    const content_from = document.getElementById("attribute-content");
    const button = document.getElementById("upload-button");
    let id = document.querySelector(".body").id;
    const res = await fetch("/add_attribute", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: id,
            attribute: attribute_form.value,
            content: content_from.value,
        })
    })
    const st = await res.json();
    if (st.length > 0) {
        button.textContent = st;
        button.style.color = "red";
        setTimeout(() => {
            button.textContent = "Загрузить";
            button.style.color = "black";
        }, 3000)
    }
}
async function delete_attribute() {
    const attribute_form = document.getElementById("delete-attribute");
    let id = document.querySelector(".body").id;
    const button = document.getElementById("delete-button");
    const required_attributes = ["id", "name", "price", "type", "image_path", "page_link"];
    if (attribute_form.value in required_attributes) {
        button.textContent = "Нельзя удалить обязательные аттрибуты.";
        button.style.color = "red";
        setTimeout(() => {
            button.textContent = "Загрузить";
            button.style.color = "black";
        }, 1000)
    }
    else {
        await fetch("/delete_attribute", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                attribute: attribute_form.value,
            })
        });
    }
}
async function update_attribute() {
    const attribute_form = document.getElementById("update-attribute");
    const content_from = document.getElementById("new-content-form");
    let id = document.querySelector(".body").id;
    const button = document.getElementById("update-button");
    const required_attributes = ["id", "name", "price", "type", "image_path", "page_link"];
    if (attribute_form.value in required_attributes && content_from.value === "") {
        button.textContent = "Обязательный аттрибут не может быть пустым.";
        button.style.color = "red";
        setTimeout(() => {
            button.textContent = "Загрузить";
            button.style.color = "black";
        }, 1000)
    }
    else {
        console.log(attribute_form.value);
        await fetch("/update_attribute", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                attribute: attribute_form.value,
                new_content: content_from.value,
            })
        });
    }
}