let visitCounter = 0;
let userName = "";
let currentPage = "";
let darkMode = false;

function showWelcomeMessage() {
    visitCounter++;
    
    if (visitCounter === 1) {
        console.log("Primera visita a TodoEnUno");
    } else if (visitCounter <= 5) {
        console.log(`Visita número ${visitCounter}`);
    } else {
        console.log("Visitante frecuente");
    }
}

function askUserName() {
    userName = prompt("¿Cómo te llamas?");
    
    if (userName && userName.trim() !== "") {
        document.querySelector('h1').innerHTML = `¡Hola ${userName}! Bienvenido a TodoEnUno`;
        localStorage.setItem('todoEnUnoUser', userName);
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    const body = document.body;
    
    if (darkMode) {
        body.style.backgroundColor = '#2c3e50';
        body.style.color = 'white';
        
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = '#34495e';
            header.style.color = 'white';
        }
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.backgroundColor = '#34495e';
            section.style.color = 'white';
        });
    } else {
        body.style.backgroundColor = '#7d9e5d';
        body.style.color = 'black';
        
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = '#fdddca';
            header.style.color = '#571d1d';
        }
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.backgroundColor = '#fdddca';
            section.style.color = 'black';
        });
    }
}

function showRandomTip() {
    const tips = [
        "💡 Consejo: Toma descansos cada 25 minutos mientras estudias",
        "🥗 Salud: Bebe al menos 8 vasos de agua al día",
        "📚 Estudio: Organiza tus apuntes por colores",
        "😴 Descanso: Duerme entre 7-8 horas diarias",
        "🏃‍♂️ Ejercicio: Camina 30 minutos al día"
    ];
    
    const randomIndex = Math.floor(Math.random() * tips.length);
    const selectedTip = tips[randomIndex];
    
    const tipDisplay = document.getElementById('tipDisplay') || createTipDisplay();
    tipDisplay.textContent = selectedTip;
    tipDisplay.style.display = 'block';
    
    setTimeout(() => {
        tipDisplay.style.display = 'none';
    }, 3000);
}

function createTipDisplay() {
    const tipDisplay = document.createElement('div');
    tipDisplay.id = 'tipDisplay';
    tipDisplay.style.position = 'fixed';
    tipDisplay.style.top = '50%';
    tipDisplay.style.left = '50%';
    tipDisplay.style.transform = 'translate(-50%, -50%)';
    tipDisplay.style.backgroundColor = '#553c30';
    tipDisplay.style.color = 'white';
    tipDisplay.style.padding = '20px';
    tipDisplay.style.borderRadius = '10px';
    tipDisplay.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
    tipDisplay.style.zIndex = '1000';
    tipDisplay.style.textAlign = 'center';
    tipDisplay.style.maxWidth = '300px';
    tipDisplay.style.display = 'none';
    document.body.appendChild(tipDisplay);
    return tipDisplay;
}

function validateContactForm(event) {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');
    
    let isValid = true;
    let errorMessage = "";
    
    if (!nombre || nombre.value.trim().length < 2) {
        errorMessage += "- El nombre debe tener al menos 2 caracteres\n";
        isValid = false;
    }
    
    if (!correo || !correo.value.includes('@')) {
        errorMessage += "- Ingresa un correo electrónico válido\n";
        isValid = false;
    }
    
    if (!mensaje || mensaje.value.trim().length < 10) {
        errorMessage += "- El mensaje debe tener al menos 10 caracteres\n";
        isValid = false;
    }
    
    if (!isValid) {
        event.preventDefault();
        showValidationError(errorMessage);
    } else {
        event.preventDefault();
        showSuccessMessage(nombre.value);
        nombre.value = "";
        correo.value = "";
        mensaje.value = "";
        if (document.getElementById('categoria')) {
            document.getElementById('categoria').value = "";
        }
    }
}

function showValidationError(errorMessage) {
    const errorDiv = document.getElementById('errorDisplay') || createErrorDisplay();
    errorDiv.innerHTML = `<strong>Por favor corrige estos errores:</strong><br>${errorMessage.replace(/\n/g, '<br>')}`;
    errorDiv.style.display = 'block';
    errorDiv.style.backgroundColor = '#e74c3c';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 4000);
}

function showSuccessMessage(name) {
    const successDiv = document.getElementById('errorDisplay') || createErrorDisplay();
    successDiv.innerHTML = `¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. 📧`;
    successDiv.style.display = 'block';
    successDiv.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

function createErrorDisplay() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorDisplay';
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '15px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.zIndex = '1000';
    errorDiv.style.maxWidth = '300px';
    errorDiv.style.display = 'none';
    document.body.appendChild(errorDiv);
    return errorDiv;
}

function countWords() {
    const textarea = document.getElementById('mensaje');
    if (textarea) {
        const wordCount = textarea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
        
        let counter = document.getElementById('wordCounter');
        
        if (!counter) {
            counter = document.createElement('p');
            counter.id = 'wordCounter';
            counter.style.fontSize = '0.9em';
            counter.style.color = '#666';
            textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        }
        
        if (wordCount < 5) {
            counter.style.color = 'red';
            counter.textContent = `Palabras: ${wordCount} (mínimo 5 palabras)`;
        } else if (wordCount >= 5 && wordCount <= 50) {
            counter.style.color = 'green';
            counter.textContent = `Palabras: ${wordCount} ✓`;
        } else {
            counter.style.color = 'orange';
            counter.textContent = `Palabras: ${wordCount} (mensaje muy largo)`;
        }
    }
}

function animateButton(button) {
    const originalScale = button.style.transform;
    
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
        button.style.transform = originalScale;
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log(`Página actual: ${currentPage}`);
    
    if (currentPage === 'index.html' || currentPage === '') {
        setTimeout(showWelcomeMessage, 1000);
        
        const savedUser = localStorage.getItem('todoEnUnoUser');
        if (savedUser) {
            userName = savedUser;
            document.querySelector('h1').innerHTML = `¡Hola ${userName}! Bienvenido a TodoEnUno`;
        }
    }
    
    const header = document.querySelector('header');
    if (header) {
        const darkModeBtn = document.createElement('button');
        darkModeBtn.textContent = '🌙 Modo Oscuro';
        darkModeBtn.style.position = 'absolute';
        darkModeBtn.style.top = '10px';
        darkModeBtn.style.right = '20px';
        darkModeBtn.style.padding = '8px 15px';
        darkModeBtn.style.border = 'none';
        darkModeBtn.style.borderRadius = '5px';
        darkModeBtn.style.cursor = 'pointer';
        darkModeBtn.style.backgroundColor = '#553c30';
        darkModeBtn.style.color = 'white';
        
        darkModeBtn.addEventListener('click', toggleDarkMode);
        
        header.style.position = 'relative';
        header.appendChild(darkModeBtn);
    }
    
    const main = document.querySelector('main');
    if (main && currentPage === 'index.html') {
        const tipBtn = document.createElement('button');
        tipBtn.textContent = '💡 Tip Aleatorio';
        tipBtn.className = 'nav-button';
        tipBtn.style.margin = '20px auto';
        tipBtn.style.display = 'block';
        
        tipBtn.addEventListener('click', function() {
            animateButton(this);
            showRandomTip();
        });
        
        main.appendChild(tipBtn);
    }
    
    const contactForm = document.querySelector('form');
    if (contactForm && currentPage === 'contacto.html') {
        contactForm.addEventListener('submit', validateContactForm);
        
        const messageField = document.getElementById('mensaje');
        if (messageField) {
            messageField.addEventListener('input', countWords);
        }
        
        if (!userName && !localStorage.getItem('todoEnUnoUser')) {
            setTimeout(askUserName, 2000);
        }
    }
    
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            animateButton(this);
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    window.addEventListener('beforeunload', function() {
        if (userName) {
            console.log(`Usuario ${userName} saliendo de TodoEnUno`);
        }
    });
    
    console.log('✅ JavaScript cargado correctamente');
});