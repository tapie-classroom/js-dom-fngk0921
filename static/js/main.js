let currentCps = 0;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.onload = () => {
    let cpsList = [];
    const clickArea = document.getElementById("app");
    const catImg = document.getElementById("cat-img");
    let cps = 0;
    const popAudio = new Audio("https://popcat.click/pops/pop4.mp3");
    popAudio.load();

    let startTime = new Date().getTime();

    clickArea.addEventListener("mousedown", async function() {
        const popCount = document.getElementById("popcount");

        const count = Number(popCount.innerText);

        popCount.innerText = count + 1;

    
        

        catImg.style.transform = 'scale(1.3)';
        catImg.src = "./static/img/catop.png";

        popAudio.play();

        await updateCps()
    });

    clickArea.addEventListener("mouseup", function() {
        catImg.style.transform = 'scale(1.0)';
        catImg.src = './static/img/cat.png';
    });

    async function updateCps() {
        cpsList.push(new Date().getTime());
        cps += 1;

        await wait(1000)
        cps -= 1;

        cpsListTemp = cpsList
        cpsList = cpsList.filter((time) => {
            return time > cpsList.at(-1) - 1000;
        });

        cpsList.unshift(cpsListTemp.at(-cpsList.length -1));

        const cpsDifference = (cpsList.at(-1) - cpsList.at(0)) / 1000;

        // console.log(cpsList, cpsListTemp);
        // console.log(cpsDifference);
        const calculatedCps = cpsList.length / Math.max(cpsDifference, 1);
        currentCps = parseInt(calculatedCps * 100) / 100;

        console.log(currentCps);
    }

}