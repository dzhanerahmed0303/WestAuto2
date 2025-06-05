"use sctrict";

async function clockCount() {
  let clockLi = document.querySelector(".clock");
  clockLi.style.color = "white";

  let clockData = await fetch(
    "https://www.timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam"
  );
  let clock = await clockData.json();

  console.log(`${clock.hour}:${clock.minute}`);
  clockLi.textContent = `${clock.hour}:${clock.minute}`;
}
clockCount();
setInterval(clockCount, 1000);
