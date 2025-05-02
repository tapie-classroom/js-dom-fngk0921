let currentCps = 0;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.onload = () => {
    
    const clickArea = document.getElementById("app");
    const catImg = document.getElementById("cat-img");
    const cpsText = document.getElementById("cps");

    let cpsList = []; // 클릭 시간 리스트

    const popAudio = new Audio("https://popcat.click/pops/pop4.mp3"); // 클릭 소리
    popAudio.load();

    clickArea.addEventListener("mousedown", async function() { // 마우스 클릭했을때
        const popCount = document.getElementById("popcount"); // 클릭 수 카운트 텍스트

        const count = Number(popCount.innerText); // 현재 클릭 수 가져오기
        popCount.innerText = count + 1; // 클릭 수 증가

        catImg.style.transform = 'scale(1.1)'; // 고양이 이미지 확대
        catImg.src = "./static/img/catop.png"; // 입 벌린 고양이 이미지로 변경

        popAudio.play(); // 클릭 소리 재생

        cpsList.push(new Date().getTime()); // 클릭 시간 추가
    });


    cpsUpdateInterval = setInterval(() => {
        now = new Date().getTime();
        cpsList.push(now); // 계산용 현재 시간 추가

        cpsList = cpsList.filter((time) => { // 최근 2초간의 클릭만 남기기
            return time > now - 2000 && time != undefined;
        });

        cpsListTemp = cpsList // 최근 2초간의 클릭만 임시 저장

        cpsList = cpsList.filter((time) => { // 최근 1초간의 클릭만 저장
            return time > cpsList.at(-1) - 1000;
        });

        cpsList.unshift(cpsListTemp.at(-cpsList.length -1)); // 1초를 넘는 클릭중 가장 최근 클릭 다시추가

        const cpsDifference = (cpsList.at(-1) - cpsList.at(0)) / 1000; // 최근과 가장 오래된 클릭의 차이를 초로 계산

        cpsList = cpsList.filter((time) => { // 계산용 현재 시간 삭제
            return time != now;
        });

        const calculatedCps = cpsList.length / Math.max(cpsDifference, 1); // 1~2초동안 클릭 수를 나누기
        currentCps = Number(calculatedCps.toFixed(2)) ? parseFloat(calculatedCps.toFixed(2)) : 0; // NaN 방지
        if (currentCps < 1) { // 1보다 작으면 0으로
            currentCps = 0;
        }

        cpsText.innerText = currentCps + " cps"; // cps 텍스트 업데이트
    }
    , 100);



    clickArea.addEventListener("mouseup", function() { // 마우스 클릭으르 뗐을때
        catImg.style.transform = 'scale(1.0)';
        catImg.src = './static/img/cat.png'; // 입 닫은 고양이 이미지로 변경
    });

}