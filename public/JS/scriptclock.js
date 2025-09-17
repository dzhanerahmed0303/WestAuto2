"use sctrict";

async function clockCount() {
  let clockLi = document.querySelector(".clock");
  clockLi.style.color = "white";

  let clockData = await fetch(
    "https://www.timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam"
  );
  let clock = await clockData.json();

  let hour = String(clock.hour).padStart(2, "0");
  let minute = String(clock.minute).padStart(2, "0");

  clockLi.textContent = `${hour}:${minute}`;
}
clockCount();
setInterval(clockCount, 1000);
