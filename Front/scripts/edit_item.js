async function delete_item() {
    let id = document.querySelector(".body").id;
    await fetch("/delete_item", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: Number(id),
        })
    })
}