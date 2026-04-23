async function load() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    const body = document.querySelector(".body");
    body.id = id;
    const item = await fetch("/get_item?id="+id, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    const data = await item.json();
    console.log(data);
    const main_image = document.querySelector(".main-image")
    main_image.src = data.image_path;
    const header = document.querySelector(".item-name")
    header.innerText = data.name;
    const price = document.querySelector(".item-price")
    price.textContent = data.price + "₽";
    const description = document.querySelector(".item-description")
    description.innerText = data.description;
    const title = document.getElementById("title");
    title.innerText = data.name;
}
load();