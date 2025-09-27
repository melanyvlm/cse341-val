// Función auxiliar para fetch
async function apiFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Función para professional - usa ruta relativa
const getProfessionalData = async () => {
    try {
        const data = await apiFetch('/professional');  // ← Cambiado
        displayProfessionalData(data);
    } catch (error) {
        console.error('Error loading professional data:', error);
    }
};

// Función para contacts - usa ruta relativa  
const getContactsData = async () => {
    try {
        const contacts = await apiFetch('/contacts');  // ← Cambiado
        displayContacts(contacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
};

// Función global para single contact
window.getSingleContact = async (id) => {
    try {
        const contact = await apiFetch(`/contacts/${id}`);  // ← Cambiado
        displaySingleContact(contact);
    } catch (error) {
        console.error('Error loading single contact:', error);
    }
};

// Display functions (mantén igual)
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

// ... (mantén todas las otras display functions igual)

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
        <h2>Contacts</h2>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Favorite Color:</strong> ${contact.favoriteColor}</p>
        <p><strong>Birthday:</strong> ${contact.birthday}</p>
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