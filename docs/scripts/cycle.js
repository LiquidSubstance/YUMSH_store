window.addEventListener('load', () => {
    const header = document.querySelector('.header');
    let frame = 1;
    let i = 0;
    let image_list = [
        "../contents/background_images/background1.png",
        "../contents/background_images/background2.png",
        "../contents/background_images/background3.png",
        "../contents/background_images/background4.png",
    ];
    let n = image_list.length;
    image_list.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    console.log(image_list);
    setInterval(() => {
        header.style.backgroundImage = "linear-gradient(90deg, rgba(255,255,255, 0.2), rgba(255,255,255,0)), url(" + image_list[i] + ")";
        i = (i + 1) % n;
    }, 3000);
})