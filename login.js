const loginButton = document.getElementById('login-button');
const clientId = '1104362178968047639';
const redirectUri = 'https://czechblueline.xyz/auth_callback.php';

loginButton.addEventListener('click', () => {
  const scope = 'identify guilds.members.read';
  window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
});

// Kontrola, zda jsme se právě vrátili z autentizace
const urlParams = new URLSearchParams(window.location.search);
const isInServer = urlParams.get('isInServer') === '1';
const hasPohovorRole = urlParams.get('hasPohovorRole') === '1';
const hasVyjimkaRole = urlParams.get('hasVyjimkaRole') === '1';
const loginSuccess = urlParams.get('loginSuccess') === 'true';

if (loginSuccess) {
  if (loginButton) {
    loginButton.classList.remove('logout', 'uspech');
    if (isInServer) {
        if (isInServer && hasPohovorRole && hasVyjimkaRole) {
          loginButton.classList.add('uspech');
        loginButton.textContent = 'ŽÁDOST O VÝJIMKU & POHOVOR';
      } else if (hasVyjimkaRole) {
        loginButton.classList.add('uspech');
        loginButton.textContent = 'ŽÁDOST O VÝJIMKU';
      } else if (hasPohovorRole) {
        loginButton.classList.add('uspech');
        loginButton.textContent = 'ŽÁDOST O POHOVOR';
      } else {
        loginButton.classList.add('uspech');;
        loginButton.textContent = 'ÚSPĚŠNĚ PŘIHLÁŠEN';
      }
    } else if (!isInServer) {
      loginButton.classList.add('uspech');
      loginButton.textContent = 'ŽÁDOST O UNBAN';
    }
  }
  
  // Zobrazení příslušných sekcí podle rolí
  if (hasPohovorRole) {
    const pohovorSection = document.getElementById('section-form-pohovor');
    if (pohovorSection) pohovorSection.style.display = 'flex';

    // Informační panel
    const sectionInfo = document.getElementById('section-show-info');
    if (sectionInfo) sectionInfo.style.display = 'none';
  }
  
  if (hasVyjimkaRole) {
    const vyjimkaSection = document.getElementById('section-form-vyjimka');
    if (vyjimkaSection) vyjimkaSection.style.display = 'flex';
    
    // Informační panel
    const sectionInfo = document.getElementById('section-show-info');
    if (sectionInfo) sectionInfo.style.display = 'none';
  }

  if (!isInServer) {
    const unbanSection = document.getElementById('section-form');
    if (unbanSection) unbanSection.style.display = 'flex';

    // Informační panel
    const sectionInfo = document.getElementById('section-show-info');
    if (sectionInfo) sectionInfo.style.display = 'none';
  }
  
  // if (isInServer && !hasPohovorRole && !hasVyjimkaRole) {
  //   alert('Nemáte požadovanou roli pro přístup k žádnému z formulářů.');
  // } else if (!isInServer) {
  //   alert('Nejste členem našeho Discord serveru.');
  // }

  const notify = document.getElementById("notification");

  if (isInServer && !hasPohovorRole && !hasVyjimkaRole) {
    notify.classList.add("show-notify");
    notify.innerHTML = `<strong>ZOBRAZENO:</strong> ŽÁDNÝ FORMULÁŘ <br><br><strong>DŮVOD:</strong> Jsi členem Discord serveru, ale nemáš požadované role.`;
    } else if (isInServer && hasPohovorRole && hasVyjimkaRole) {
      notify.classList.add("show-notify");
      notify.innerHTML = `<strong>ZOBRAZENO:</strong> ŽÁDOST O VÝJIMKU & POHOVOR <br><br><strong>DŮVOD:</strong> Na Discord serveru máš roli @čeká na pohovor & @čeká na schválení.`;
    }else if (!isInServer) {
      notify.classList.add("show-notify");
      notify.innerHTML = `<strong>ZOBRAZENO:</strong> UNBAN FORMULÁŘ <br><br><strong>DŮVOD:</strong> Nejsi členem Discord serveru, protože máš ban, nebo nejsi připojen`;
    } else if (hasPohovorRole) {
      notify.classList.add("show-notify");
      notify.innerHTML = `<strong>ZOBRAZENO:</strong> ŽÁDOST O POHOVOR <br><br><strong>DŮVOD:</strong> Na Discord serveru máš roli @čeká na schválení.`;
    } else if (hasVyjimkaRole) {
      notify.classList.add("show-notify");
      notify.innerHTML = `<strong>ZOBRAZENO:</strong> ŽÁDOST O VÝJIMKU <br><br><strong>DŮVOD:</strong> Na Discord serveru máš roli @čeká na pohovor.`;
    }


    setTimeout(() => {
      notify.classList.remove("show-notify");
    }, 10000);
  
  // Odstranění parametrů z URL
  window.history.replaceState({}, document.title, "/zadosti.html");
}
