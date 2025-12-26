window.addEventListener('load', () => {
    const track = document.querySelector('.scroll-list-item');
    if (!track) return;

    let pos = 0;
    let speed = 2;
    let target = 2;

    track.addEventListener('mouseenter', () => {
        target = 1;
    });

    track.addEventListener('mouseleave', () => {
        target = 2;
    });

    function animate() {
        speed += (target - speed) * 0.05;
        pos -= speed;

        track.style.transform = `translateX(${pos}px)`;

        if (Math.abs(pos) >= track.scrollWidth / 2) {
            pos = 0;
        }

        requestAnimationFrame(animate);
    }

    animate();
});