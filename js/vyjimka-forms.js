  async function sendVyjimkaContact(ev) {
    ev.preventDefault();
  
  
  // Nastavení jednotlivých jednotek času
  const cooldownHours = 24; // Počet hodin
  const cooldownMinutes = 0; // Počet minut
  const cooldownSeconds = 0; // Počet sekund
  
  // Přepočet všech jednotek na milisekundy
  const totalCooldownMilliseconds = 
      ((cooldownHours * 60 * 60) + // Hodiny na sekundy
      (cooldownMinutes * 60) + // Minuty na sekundy
      cooldownSeconds) * 1000; // Sekundy na milisekundy
  
  const lastSubmitTime = localStorage.getItem('lastSubmitTime');
  const currentTime = new Date().getTime();
  
  if (lastSubmitTime && (currentTime - lastSubmitTime) < totalCooldownMilliseconds) {
    const remainingTimeMilliseconds = totalCooldownMilliseconds - (currentTime - lastSubmitTime);
  
      const remainingTimeHours = Math.floor((remainingTimeMilliseconds / (1000 * 60 * 60)) % 24); // Hodiny
      const remainingTimeMinutes = Math.floor((remainingTimeMilliseconds / (1000 * 60)) % 60); // Minuty
      const remainingTimeSeconds = Math.floor((remainingTimeMilliseconds / 1000) % 60); // Sekundy
  
      var element = document.getElementById("notification-warn");
      element.classList.add("show-notify-warn");
  
      const cooldownMessageElement = document.getElementById('notification-warn');
      cooldownMessageElement.innerHTML = `FORMULÁŘ BYL JIŽ ODESLÁN! <br> PRO DALŠÍ ODESLÁNÍ POČKEJTE JEŠTĚ <br> ${remainingTimeHours} hodin, ${remainingTimeMinutes} minut a ${remainingTimeSeconds} sekund.`;

      setTimeout(() => {
        element.classList.remove("show-notify-warn");
      }, 10000);
  
      return;
    }

     // Okamžitě nastavíme čas posledního odeslání
     localStorage.setItem('lastSubmitTime', currentTime);
  
     // Deaktivujeme tlačítko odeslání
     document.querySelector('button[type="submit"]').disabled = true;

      const vyjimkaDiscord = document
      .getElementById('vyjimka-discord').value;
    const vyjimkaSelect = document
      .getElementById('vyjimka-select').value;
    const vyjimkaVek = document
      .getElementById('vyjimka-vek').value;
    const vyjimkaPriklad1 = document
      .getElementById('vyjimka-priklad1').value;
    const vyjimkaPriklad2 = document
      .getElementById('vyjimka-priklad2').value;
    const vyjimkaPriklad3 = document
      .getElementById('vyjimka-priklad3').value;
    const vyjimkaPriklad4 = document
      .getElementById('vyjimka-priklad4').value;
  
    const webhookBody = {
        content: `<@&12913909855693046671> \n ID HRÁČE: ${vyjimkaDiscord}`,
        embeds: [{
            title: 'ŽÁDOST O VÝJIMKU - CZECHBLUELINE',
            description: `Hráč **${vyjimkaDiscord}**, kterému je **${vyjimkaVek}** si na webových stránkách CzechBlueLine zažádal o výjimku.`,
            color: 255, // Dynamická barva podle výběru
            fields: [
              { name: '\u200b', value: '\u200b' },
              { name: '**__Váš Discord__**', value: vyjimkaDiscord},
              { name: '**__Vaše role na Discordu__**', value: vyjimkaSelect},
              { name: '**__Kolik ti je let?__**', value: vyjimkaVek},
              { name: '\u200b', value: '\u200b' },
              { name: '**__Jaký je rozdíl mezi USA a ČR po RP stránce?__**', value: vyjimkaPriklad1},
              { name: '**__Co by jsi chtěl na serveru RPit?__**', value: vyjimkaPriklad2},
              { name: '**__Jak si představuješ kvalitní RP akci? (konkrétní situaci)__**', value: vyjimkaPriklad3},
              { name: '**__Odkud ses o nás dozvěděl?__**', value: vyjimkaPriklad4 },
            ],
            footer: {
                text: 'Formulář byl odeslán v'
            },
            timestamp: new Date() // Přidá časové razítko
        }],
    };
  
    const webhookUrl = 'https://discordapp.com/api/webhooks/1291390827477860372/VZJBrRW67xhrsXxcBr656XItlP-xBcYIQ0VGnAfx04bXABj_SvTUwZQtKwCaikPNgrhq';
  
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });
  
    var element = document.getElementById("notification");
    if (response.ok) {
      element.classList.add("show-notify");
    } else {
      element.classList.remove("show-notify");
      // V případě chyby resetujeme čas posledního odeslání
      localStorage.removeItem('lastSubmitTime');
    }
  
    // Znovu aktivujeme tlačítko odeslání
    document.querySelector('button[type="submit"]').disabled = false;
  
    setTimeout(() => {
      element.classList.remove("show-notify");
    }, 10000);
  }