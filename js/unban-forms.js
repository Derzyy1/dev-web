  async function sendContact(ev) {
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

      const unbanDiscord = document
      .getElementById('unban-discord').value;
    const unbanEmail = document
      .getElementById('unban-email').value;
    const unbanDuvod = document
      .getElementById('unban-duvod').value;
  
    const webhookBody = {
        content: "<@&1288797053727543389>",
        embeds: [{
            title: 'ŽÁDOST O UNBAN - CZECHBLUELINE',
            description: `Hráč **${unbanDiscord}** si na webových stránkách CzechBlueLine zažádal o unban.`,
            color: 16711680, // Dynamická barva podle výběru
            fields: [
              { name: '\u200b', value: '\u200b' },
              { name: '**__E-MAIL__**', value: unbanEmail, inline: true},
              { name: '**__DISCORD__**', value: unbanDiscord, inline: true},
              { name: '\u200b', value: '\u200b' },
              { name: '**__ZA CO JSI DOSTAL BAN A PROČ BY TI MĚL BÝT UDĚLEN UNBAN?__**', value: unbanDuvod },
            ],
            footer: {
                text: 'Formulář byl odeslán v'
            },
            timestamp: new Date() // Přidá časové razítko
        }],
    };
  
    const webhookUrl = 'https://discordapp.com/api/webhooks/1058052794319380562/OiMxugrnsVhhEWfJ59vnVNp90q97tVh01-tHx1jOoR8sSDfoqZGgOkfaSv52GfGnzX2l';
  
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