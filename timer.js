const url = new URL(document.URL);

let startTime = url.searchParams.get("start-time");
let endTime = url.searchParams.get("end-time");
let description = url.searchParams.get("description");

document.addEventListener("DOMContentLoaded", () => {
  const timeInsert = document.querySelector("#time-insert");
  const loadingTimer = document.querySelector("#loading-timer");

  if (!startTime) {
    startTime = new Date().toString();
  }

  if (endTime === null) {
    timeInsert.style.display = "";
  } else {
    loadingTimer.style.display = "";
  }

  const untilLabel = document.querySelector("#until-label");
  const descriptionSpan = document.querySelector("#description-span");
  if (!description) {
    untilLabel.style.display = "none";
  } else {
    descriptionSpan.innerText = description;
  }

  startTime = new Date(startTime).getTime();
  endTime = new Date(endTime).getTime();

  const loadingBar = document.querySelector("#loading-bar");
  const loadingRatio = document.querySelector("#loading-ratio");
  const timeLeft = document.querySelector("#time-left");
  const duration = endTime - startTime;
  const trailing = Math.max(1, Math.floor(Math.log10(duration)) - 3);
  setInterval(() => {
    const now = new Date().getTime();
    const time = now - startTime;
    const percentage = Math.max(
      0,
      Math.min(
        100,
        Math.round((time / duration) * Math.pow(10, trailing) * 100) /
          Math.pow(10, trailing),
      ),
    ).toFixed(trailing);

    loadingBar.style.width = `${percentage}%`;
    loadingRatio.innerText = `${percentage}%`;

    let left = duration - time;
    const seconds = (Math.floor(left % (60 * 1000)) / 1000).toFixed(3);
    const minutes = Math.floor(left / (60 * 1000)) % 60;
    const hours = Math.floor(left / (60 * 60 * 1000)) % 24;
    const days = Math.floor(left / (24 * 60 * 60 * 1000));

    timeLeft.innerText = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  });
});
