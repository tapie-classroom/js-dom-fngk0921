window.onload = () => {
    const clickArea = document.getElementById("app");
    const catImg = document.getElementById("cat-img");
    let cps = 0;
    const popAudio = new Audio("https://popcat.click/pops/pop4.mp3");
    popAudio.load();

    const startTime = new Date().getTime();

    clickArea.addEventListener("mousedown", function() {
        const popCount = document.getElementById("popcount");

        const count = Number(popCount.innerText);

        popCount.innerText = count + 1;

        // const cps = count / ((new Date().getTime() - startTime) / 1000);
        updateCps()
        console.log(cps);
        

        catImg.src = "./static/img/catop.png";

        popAudio.play();
    });

    clickArea.addEventListener("mouseup", function() {
        catImg.src = './static/img/cat.png';
    });

    function updateCps() {
        cps += 1;
        setTimeout(() => {
            cps -= 1;
        }, 1000);
    }

}