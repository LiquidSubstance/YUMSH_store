async function delete_item() {
    let id = document.querySelector(".body").id;
    await fetch(`/delete_item`, {
        method: "POST",
        body: id
    })
    window.close();
}