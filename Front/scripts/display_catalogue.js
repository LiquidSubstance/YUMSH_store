wrapper = document.querySelector(".catalogue");
async function load() {
    const items_res = await fetch("/get_items", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    console.log(items_res);
    let all_catalogue_items = Array.from(await items_res.json());
    all_catalogue_items.forEach((item) => {
        let catalogue_item = document.createElement("div");
        catalogue_item.className = "catalogue-item";
        catalogue_item.id = item.id;
        catalogue_item.innerHTML = `
            <a href = "` + item.page_link + `">
                <img src="` + item.image_path + `" width="192" height="225" alt = "` + item.name + `">
                <h2>`+ item.name +`</h2>
                <p> `+ item.price +`₽ </p>
            </a>
        `
        wrapper.appendChild(catalogue_item);
        console.log(catalogue_item);
    });
}
load();