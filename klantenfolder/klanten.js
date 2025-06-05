import personInfo from "../assets/klanteninfo.json" with {type: "json"};

(() => {
  const elkepersoon = document.querySelectorAll("div");

  elkepersoon.forEach((persoon, index) => {
    let usericon = persoon.querySelector(".username");
    let taarticon = persoon.querySelector(".geboortedatum");
    let gsmicon = persoon.querySelector(".gsmnummer");
    let mailicon = persoon.querySelector(".email");
    let wachtwoordicon = persoon.querySelector(".wachtwoord");
    let adresicon = persoon.querySelector(".adres");

    let pel = persoon.querySelector("p");
    let h1el = persoon.querySelector(".h1el");
    h1el.textContent = "";

    
    const personData = personInfo.data[index];

    usericon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn naam is:";
      h1el.textContent = personData.name; 
    });

    taarticon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn geboortedatum is:";
      h1el.textContent = personData.geboortedatum; 
    });

    gsmicon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn telefoonnummer is:";
      h1el.textContent = personData.gsmnummer; 
    });

    mailicon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn e-mail adres is:";
      h1el.textContent = personData.email;
    });

    wachtwoordicon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn wachtwoord is:";
      h1el.textContent = personData.wachtwoord;
    });

    adresicon.addEventListener("mouseover", (event) => {
      pel.textContent = "Mijn adres is:";
      h1el.textContent = personData.adres;
    });
  });
})();