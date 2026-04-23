async function delete_filters() {
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-filter-button')) {
            let filter_id = "";
            let i = 0;
            let it = Array.from(event.target.id);
            it.forEach(c => {
                if (c === "-") {
                    i++;
                }
                if (i === 2 && c !== "-") {
                    filter_id += c;
                }
            });
            console.log(filter_id);
            await fetch("/delete_filter", {
                method: "DELETE",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({id: filter_id})
            })
        }
    });
}
delete_filters();