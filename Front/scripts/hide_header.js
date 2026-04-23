function hide_header() {
    const header = document.querySelector(".header-wrapper");
    const hide_button = document.querySelector(".hide-header-button");
    console.log(header.style.display);
    if (header.style.display !== "none") {
        hide_button.textContent = "∨";
        header.style.display = "none";
    } else {
        hide_button.textContent = "^";
        header.style.display = "block";
    }
}