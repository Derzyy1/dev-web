  // Funkce pro validaci checkboxů
function validateCheckboxes() {
  const checkboxGroups = document.querySelectorAll('.group_checkboxes');
  let isValid = true;
  
  checkboxGroups.forEach(group => {
    const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length === 0) {
      isValid = false;
      // Zvýrazněte chybějící odpověď (můžete přidat třídu pro vizuální zpětnou vazbu)
      group.classList.add('error');
    } else {
      group.classList.remove('error');
    }
  });

  return isValid;
}
  
async function sendPohovorContact(ev) {
  ev.preventDefault();

  // Nejprve proveďte validaci
  // if (!validateCheckboxes()) {
  //   // Pokud validace selže, zobrazte chybovou zprávu a ukončete funkci
  //   var element = document.getElementById("notification-warn");
  //   element.classList.add("show-notify-warn");
  //   element.textContent = "Prosím, odpovězte na všechny otázky.";
  //   setTimeout(() => {
  //     element.classList.remove("show-notify-warn");
  //   }, 5000);
  //   return;
  // }
  
  
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

  // Získání hodnot checkboxů
  const checkboxGroups = document.querySelectorAll('.group_checkboxes');
  const checkboxFields = Array.from(checkboxGroups).map(group => {
    const question = group.previousElementSibling.textContent.trim();
    const checkedBox = group.querySelector('.customCheckBoxInput:checked');
    const answer = checkedBox ? checkedBox.value : 'Nezodpovězeno';
    return { name: `**__${question}__**`, value: answer };
  });

     // Okamžitě nastavíme čas posledního odeslání
     localStorage.setItem('lastSubmitTime', currentTime);
  
     // Deaktivujeme tlačítko odeslání
     document.querySelector('button[type="submit"]').disabled = true;

      const pohovorDiscord = document
      .getElementById('pohovor-discord').value;
      const pohovorDiscordID = document
      .getElementById('pohovor-discord_id').value;
      const pohovorVek = document
      .getElementById('pohovor-vek').value;
    const pohovorPriklad1 = document
      .getElementById('pohovor-priklad1').value;
    const pohovorPriklad3 = document
      .getElementById('pohovor-priklad3').value;
    const pohovorPriklad4 = document
      .getElementById('pohovor-priklad4').value;
    const pohovorPriklad5 = document
      .getElementById('pohovor-priklad5').value;
    const pohovorPriklad6 = document
      .getElementById('pohovor-priklad6').value;
    const pohovorPriklad7 = document
      .getElementById('pohovor-priklad7').value;
    const pohovorPriklad8 = document
      .getElementById('pohovor-priklad8').value;
    const pohovorPriklad9 = document
      .getElementById('pohovor-priklad9').value;
  
    const webhookBody = {
        content: `<@&1294279920259825716>\nJMENO HRACE: ${pohovorDiscord}\nID HRACE: ${pohovorDiscordID}`,
        embeds: [{
            title: 'ŽÁDOST O POHOVOR - CZECHBLUELINE',
            description: `Hráč **${pohovorDiscord}**, kterému je **${pohovorVek}** si na webových stránkách CzechBlueLine zažádal o pohovor.`,
            color: 4762430, // Dynamická barva podle výběru
            fields: [
              { name: '\u200b', value: '\u200b' },
              { name: '**__Vaše Discord jméno__**', value: pohovorDiscord},
              { name: '**__Vaše Discord ID__**', value: pohovorDiscordID},
              { name: '**__Kolik Vám je let?__**', value: pohovorVek},
              { name: '\u200b', value: '\u200b' },
              ...checkboxFields,
              { name: '\u200b', value: '\u200b' },
              { name: '**__Jaká je vaše motivace pro připojení se k našemu DOJRP serveru?__**', value: pohovorPriklad1},
              { name: '**__Jaké máte zkušenosti s roleplayem? Pokud nějaké máte, v čem se lišily od našeho DOJRP konceptu?__**', value: pohovorPriklad3},
              { name: '**__Jak dobře znáte fungování Integrovaného záchranného systému (IZS)? Máte o něj aktivní zájem?__**', value: pohovorPriklad4},
              { name: '**__Popište situaci, kterou byste jako civilista vytvořili pro IZS složky.__**', value: pohovorPriklad5 },
              { name: '**__Jak byste řešili konflikt s jiným hráčem na serveru?__**', value: pohovorPriklad6 },
              { name: '**__Jaký je váš postoj k vulgarismům a nevhodnému chování v rámci hry?__**', value: pohovorPriklad7 },
              { name: '**__Proč si myslíte, že byste byli přínosem pro naši komunitu?__**', value: pohovorPriklad8 },
              { name: '**__Jak byste reagovali, kdyby vás administrátor požádal o změnu vašeho chování nebo přístupu?__**', value: pohovorPriklad9 },
            ],
            footer: {
                text: 'Formulář byl odeslán v'
            },
            timestamp: new Date() // Přidá časové razítko
        }],
    };
  
    const webhookUrl = 'https://discordapp.com/api/webhooks/1294264362055241829/9BJnzeqFYRK0HZYroM77uzrA63huw9RGV2tCCfK7WWbIka49y4TtXD-H3hzyoQuHWcja';
  
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

  // Přidejte event listener pro odeslání formuláře
document.querySelector('form').addEventListener('submit', sendPohovorContact);