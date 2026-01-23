window.addEventListener('load', () => {
    const header = document.querySelector('.header');
    let frame = 1;
    let i = 0;
    const image_list = ["/contents/renderallv3.png", "/contents/renderallv2.png"];
    function change_background() {
        frame++;
        if (frame == 300) {
            frame = 0;
            header.style.background = "linear-gradient(90deg, rgba(255,255,255, 0.2), rgba(255,255,255,0)), url(" + image_list[i] + ")"
            i++;
            i %= 2;
        }
        requestAnimationFrame(change_background);
    }
    change_background();
})