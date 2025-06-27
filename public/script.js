const SERVER_URL = 'http://localhost:3000';

// Fonction de redirection si donnée disponible
function redirectIfNeeded(data) {
  if (data.redirectUrl) {
    window.location.href = `${SERVER_URL}${data.redirectUrl}`;
  }
}

// Gestion de la soumission du formulaire de connexion
document.querySelector('#login-form form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('user_id', data.user_id);
      alert(data.message || 'Connexion réussie.');
      redirectIfNeeded(data);
    } else {
      alert(data.message || 'Échec de la connexion.');
    }

  } catch (error) {
    console.error('Erreur réseau :', error);
    alert("Erreur de connexion au serveur.");
  }
});

// Gestion de la soumission du formulaire d'inscription
document.querySelector('#register-form form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.querySelector('#register-form input[name=email]').value;
  const N_Tel = document.getElementById('N_Tel').value;
  const societe = document.getElementById('societe').value;
  const wilaya = document.getElementById('wilaya').value;
  const password = document.getElementById('register-password').value;
  const confirmer = document.getElementById('confirmer_mot_de_passe').value;

  if (password !== confirmer) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const response = await fetch(`${SERVER_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, email, N_Tel, societe, wilaya, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('user_id', data.user_id);
      redirectIfNeeded(data);
    } else {
      alert(data.message || 'Échec de l’inscription.');
    }

  } catch (error) {
    console.error('Erreur réseau :', error);
    alert("Erreur de connexion au serveur.");
  }
});

// Fonction de basculement entre les formulaires (connexion/inscription)
function switchForm(formType) {
  if (formType === 'login') {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
  } else {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  }
}
