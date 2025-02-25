// Create a new file for chat functionality
let chatOpen = false;

function toggleChat() {
    const popup = document.getElementById('chatPopup');
    chatOpen = !chatOpen;
    popup.style.display = chatOpen ? 'flex' : 'none';
}

function handleQuickAction(action) {
    let response = '';
    switch(action) {
        case 'major':
            response = "I can help you find the perfect major! Let me ask a few questions:\n1. What subjects do you enjoy most?\n2. What are your career goals?\n3. Are you more interested in creative or technical fields?";
            break;
        case 'scholarship':
            response = "I'll help you find scholarships! Please tell me:\n1. What's your current GPA?\n2. Any specific field of study?\n3. Are you looking for merit-based or need-based scholarships?";
            break;
        case 'schedule':
            response = "Let's plan your schedule! I'll need to know:\n1. What year are you in?\n2. What major are you pursuing?\n3. Any specific courses you need to take?";
            break;
    }
    addMessage(response, 'bot');
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (message) {
        addMessage(message, 'user');
        processUserMessage(message);
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(message, sender) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function processUserMessage(message) {
    // Simple response logic - can be expanded
    const lowerMessage = message.toLowerCase();
    let response = '';

    if (lowerMessage.includes('major')) {
        response = "Based on your interest, I'd recommend exploring these majors:\n1. Computer Science\n2. Business Administration\n3. Psychology\nWould you like more details about any of these?";
    } else if (lowerMessage.includes('scholarship')) {
        response = "I found several scholarship opportunities:\n1. Academic Merit Scholarship ($5000)\n2. STEM Excellence Award ($3000)\n3. First-Year Student Grant ($2000)\nShall I provide more information?";
    } else if (lowerMessage.includes('schedule')) {
        response = "I can help you create a balanced schedule. What semester are you planning for? I'll suggest some course combinations based on your major requirements.";
    } else {
        response = "I'm here to help with major selection, scholarships, and class scheduling. What would you like to know more about?";
    }

    setTimeout(() => addMessage(response, 'bot'), 500);
}

function pulseNotification() {
    const dot = document.querySelector('.notification-dot');
    dot.style.animation = 'pulse 2s infinite';
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    </style>
`);

window.addEventListener('load', pulseNotification); 