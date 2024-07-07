const audio = new Audio("./20240707001.wav");

const url = new URL(document.URL);

let working = url.searchParams.get("working");
let pause = url.searchParams.get("pause");

let workingInput, pauseInput;

function setPomodoro(working, pause) {
  workingInput.value = working;
  pauseInput.value = pause;
}

let nowWorking = false;

let targetTime;
document.addEventListener("DOMContentLoaded", () => {
  const timeInsert = document.querySelector("#time-insert");
  const loadingTimer = document.querySelector("#loading-timer");

  workingInput = document.querySelector("#working");
  pauseInput = document.querySelector("#pause");

  if (working && pause) {
    loadingTimer.style.display = "";
  } else {
    timeInsert.style.display = "";
  }

  nowSpan = document.querySelector("#now");
  const audioCheckbox = document.querySelector("#audio-checkbox");
  let startTime, duration;
  setInterval(() => {
    let now = new Date().getTime();

    if (targetTime === undefined || targetTime < now) {
      nowWorking = !nowWorking;
      startTime = new Date().getTime();

      if (nowWorking) {
        targetTime = now + working * 60 * 1000;
        duration = working * 60 * 1000;
        nowSpan.innerText = "작업 중";
      } else {
        targetTime = now + pause * 60 * 1000;
        duration = pause * 60 * 1000;
        nowSpan.innerText = "휴식 중";
      }

      if (audioCheckbox.checked) {
        audio.play();
      }
    }

    const loadingBar = document.querySelector("#loading-bar");
    const loadingRatio = document.querySelector("#loading-ratio");
    const timeLeft = document.querySelector("#time-left");
    const time = now - startTime;
    const percentage = ((time / duration) * 100).toFixed(1);

    loadingBar.style.width = `${percentage}%`;
    loadingRatio.innerText = `${percentage}%`;

    let left = duration - time;
    const seconds = Math.floor(left / 1000) % 60;
    const minutes = Math.floor(left / (60 * 1000));

    timeLeft.innerText = `${minutes}분 ${seconds}초`;
  });

  let audiosWeWantToUnlock = [audio];
  document.addEventListener(
    "touchstart",
    function () {
      if (audiosWeWantToUnlock) {
        for (let audio of audiosWeWantToUnlock) {
          audio.play();
          audio.pause();
          audio.currentTime = 0;
        }
        audiosWeWantToUnlock = null;
      }
    },
    false,
  );
});
