wrapper = document.querySelector(".catalogue");
function create_element(item) {
    let element = document.createElement("div");
    element.className = "catalogue-item";
    element.id = item.id;
    element.innerHTML = `
            <a href = "template.html?id=` + item.id + `">
                <img src="` + item.image_path + `" width="192" height="225" alt = "` + item.name + `">
                <h2>`+ item.name +`</h2>
                <p> `+ item.price +`₽ </p>
            </a>
        `
    return element;
}
async function load() {
    const items_res = await fetch("/get_items", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    console.log(items_res);
    let all_catalogue_items = Array.from(await items_res.json());
    all_catalogue_items.forEach((item) => {
        wrapper.appendChild(create_element(item));
    });
}
load();