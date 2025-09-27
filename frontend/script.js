// Función principal para professional
const getProfessionalData = async () => {
  try {
    const data = await apiFetch('http://localhost:8080/professional');
    displayProfessionalData(data);
  } catch (error) {
    console.error('Error loading professional data:', error);
  }
};

// Función para contacts
const getContactsData = async () => {
  try {
    const contacts = await apiFetch('http://localhost:8080/contacts');
    displayContacts(contacts);
  } catch (error) {
    console.error('Error loading contacts:', error);
  }
};

// Función auxiliar para fetch
async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Display functions para professional (tus funciones originales)
function displayProfessionalData(data) {
  displayProfessionalName(data.professionalName);
  displayImage(data.base64Image);
  displayPrimaryDescription(data);
  displayWorkDescription(data);
  displayLinkTitleText(data);
  displayLinkedInLink(data);
  displayGitHubLink(data);
}

function displayProfessionalName(n) {
  let professionalName = document.getElementById('professionalName');
  if (professionalName) professionalName.innerHTML = n;
}

function displayImage(img) {
  let image = document.getElementById('professionalImage');
  if (image) image.src = `data:image/png;base64, ${img}`;
}

function displayPrimaryDescription(data) {
  let nameLink = document.getElementById('nameLink');
  if (nameLink) {
    nameLink.innerHTML = data.nameLink.firstName;
    nameLink.href = data.nameLink.url;
  }
  let primaryDescription = document.getElementById('primaryDescription');
  if (primaryDescription) primaryDescription.innerHTML = data.primaryDescription;
}

function displayWorkDescription(data) {
  let workDescription1 = document.getElementById('workDescription1');
  if (workDescription1) workDescription1.innerHTML = data.workDescription1;
  let workDescription2 = document.getElementById('workDescription2');
  if (workDescription2) workDescription2.innerHTML = data.workDescription2;
}

function displayLinkTitleText(data) {
  let linkTitle = document.getElementById('linkTitleText');
  if (linkTitle) linkTitle.innerHTML = data.linkTitleText;
}

function displayLinkedInLink(data) {
  let linkedInLink = document.getElementById('linkedInLink');
  if (linkedInLink) {
    linkedInLink.innerHTML = data.linkedInLink.text;
    linkedInLink.href = data.linkedInLink.link;
  }
}

function displayGitHubLink(data) {
  let githubLink = document.getElementById('githubLink');
  if (githubLink) {
    githubLink.innerHTML = data.githubLink.text;
    githubLink.href = data.githubLink.link;
  }
}

// Display functions para contacts
function displayContacts(contacts) {
  const container = document.getElementById('contactsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  contacts.forEach(contact => {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    contactDiv.innerHTML = `
      <h3>${contact.firstName} ${contact.lastName}</h3>
      <p>Email: ${contact.email}</p>
      <p>Favorite Color: ${contact.favoriteColor}</p>
      <p>Birthday: ${contact.birthday}</p>
      <hr>
    `;
    container.appendChild(contactDiv);
  });
}

function displaySingleContact(contact) {
  const container = document.getElementById('singleContact');
  if (!container) return;
  
  container.innerHTML = `
    <h2>Contacto Individual</h2>
    <p><strong>Nombre:</strong> ${contact.firstName} ${contact.lastName}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Color favorito:</strong> ${contact.favoriteColor}</p>
    <p><strong>Cumpleaños:</strong> ${contact.birthday}</p>
  `;
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
  // Siempre cargar professional data
  getProfessionalData();
  
  // Solo cargar contacts si existe el container
  const contactsContainer = document.getElementById('contactsContainer');
  if (contactsContainer) {
    getContactsData();
  }
});

// Función global para single contact (necesaria para los botones)
window.getSingleContact = async (id) => {
  try {
    const contact = await apiFetch(`http://localhost:8080/contacts/${id}`);
    displaySingleContact(contact);
  } catch (error) {
    console.error('Error loading single contact:', error);
  }
};