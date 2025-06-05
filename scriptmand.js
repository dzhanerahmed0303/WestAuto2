"use strict";
(() => {
  let geselecteerdeAutos = [];
  let hoeveelheden = {};
  let favbox = document.querySelector("#cart-items");
  let favobuttons = document.querySelectorAll(".buy");
  let extraKosten = 0;
  let cart = document.querySelector("#shoppingCart");
  cart.style.display = "none";

  favobuttons.forEach((button) => {
    button.addEventListener("click", () => {
      let autoElement = button.closest(".autos");
      let autoId = autoElement.dataset.id;

      if (geselecteerdeAutos.includes(autoId)) {
        geselecteerdeAutos = geselecteerdeAutos.filter((id) => id !== autoId);
        delete hoeveelheden[autoId];

        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
        button.style.color = "";
      } else {
        geselecteerdeAutos.push(autoId);
        hoeveelheden[autoId] = 1;

        button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
        button.style.color = "rgba(255, 191, 0, 0.993)";
      }

      updateCart();
    });
  });

  function updateCart() {
    favbox.innerHTML = "";

    let subtotal = 0;

    geselecteerdeAutos.forEach((autoId) => {
      let autoElement = document.querySelector(`[data-id='${autoId}']`);
      let imgSrc = autoElement.querySelector("img").src;
      let model = autoElement.querySelector(".model").textContent;
      let prijsText = autoElement.querySelector(".prijs").textContent;
      let prijs = parseFloat(prijsText.split("€")[1].trim());
      let aantal = hoeveelheden[autoId];

      subtotal += prijs * aantal;

      let rand = document.querySelector("#cart-items");
      rand.style.height = "auto";
      rand.style.width = "21rem";
      rand.style.padding = "2rem";
      rand.style.display = "block";

      let item = document.createElement("div");
      item.innerHTML = `
      <div  style="display: flex;flex-direction:column; align-items: center ; margin-bottom: 10px;width:17rem;">
        <img src="${imgSrc}" style="width: 100%; margin-right: 10px;margin-bottom:1rem;">
        <div style="border:1px solid white; border-radius: 8px;padding:5px;">
          <span>${model}</span><br>
          <span style="color:green;">${prijsText}</span><br>
          
          <span>Aantal: <span class="aantal">${aantal}</span></span>
          <br>
          <button class="plus" data-id="${autoId}" style=" width:90%;  
            border: 1px solid white;
            margin: 1rem 0 0.5rem 0.5rem;
            border-radius: 0.5rem;
            text-align: center; 
            
            font-size: 1.3rem;">+</button>
          <button class="min" data-id="${autoId}" style=" width:90%;
          
            border: 1px solid white;
            margin: 0 0 0.5rem 0.5rem;
            border-radius: 0.5rem;
            text-align: center;
            
  font-size: 1.3rem;">-</button>
        </div>
      </div>
    `;

      favbox.appendChild(item);
    });

    favbox.querySelectorAll(".plus").forEach((plusButton) => {
      plusButton.addEventListener("click", () => {
        let autoId = plusButton.dataset.id;
        hoeveelheden[autoId]++;
        updateCart();
      });
    });

    favbox.querySelectorAll(".min").forEach((minButton) => {
      minButton.addEventListener("click", () => {
        let autoId = minButton.dataset.id;
        if (hoeveelheden[autoId] > 1) {
          hoeveelheden[autoId]--;
        } else {
          geselecteerdeAutos = geselecteerdeAutos.filter((id) => id !== autoId);
          delete hoeveelheden[autoId];
        }
        updateCart();
      });
    });
    let subtotalElement = document.querySelector("#sub-total");
    subtotalElement.textContent = `€${subtotal.toFixed(2)}`;

    let totalAmount = subtotal;

    let totally = document.querySelector(".totaalgeld");
    totally.textContent = `${totalAmount.toFixed(2)}`;

    //Ik wil niet dat de winkelmand zichtbaar is als er geen autos zijn geselecteerd
    // dus om het winkelmand te zien moet er eerst een auto gekozen worden door op het ster te drukken.
    if (geselecteerdeAutos.length === 0) {
      cart.style.display = "none";
    } else {
      cart.style.display = "block";
    }
  }

  let zoekBalk = document.querySelector("#zoekbalk");

  zoekBalk.addEventListener("input", () => {
    if (zoekBalk.value === "") {
      zoekBalk.style.color = "#ffffff42";
      zoekBalk.style.textAlign = "center";
    } else {
      zoekBalk.style.color = "white";
      zoekBalk.style.textAlign = "left";
    }
  });

  zoekBalk.style.display = "none";

  let lupa = document.querySelector(".fa-solid.fa-magnifying-glass");
  let index = 0;
  lupa.addEventListener("click", (event) => {
    if (index === 0) {
      zoekBalk.style.display = "inline";
      index = 1;
    } else if (index === 1) {
      zoekBalk.style.display = "none";
      index = 0;
    }
  });
})();
