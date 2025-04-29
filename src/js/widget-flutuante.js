
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chatIcon');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    
    let userName = '';
    let currentStep = 0;
    const chatSteps = [
        {
            question: "Olá! 😄 Me chamo Camila, sou assistente virtual do Estúdio Lucas Ribeiro. Antes de começarmos poderia me informar qual seu nome?",
            storeResponse: true,
            field: "name"
        },
        {
            question: "Deseja fazer uma consultoria no escritório?",
            options: ["Sim", "Ainda não"]
        }
    ];
    
    // Abrir/fechar chat
    chatIcon.addEventListener('click', function() {
        chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
        if (chatContainer.style.display === 'block' && currentStep === 0) {
            addBotMessage(chatSteps[0].question);
        }
    });
    
    closeChat.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });
    
    // Enviar mensagem
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addUserMessage(message);
        userInput.value = '';
        
        if (currentStep < chatSteps.length) {
            processUserResponse(message);
        }
    }
    
    sendMessage.addEventListener('click', sendUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Adicionar mensagem do bot
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', 'bot-message');
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Adicionar mensagem do usuário
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', 'user-message');
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Processar resposta do usuário
    function processUserResponse(response) {
        if (currentStep === 0) {
            userName = response;
            currentStep++;
            setTimeout(() => {
                addBotMessage(`Olá ${userName}! ${chatSteps[1].question}`);
            }, 800);
        } else if (currentStep === 1) {
            if (response.toLowerCase() === 'sim') {
                setTimeout(() => {
                    const whatsappLink = `https://wa.me/5531998105234?text=Olá, eu sou ${userName} e desejo fazer uma consultoria no Estúdio Lucas Ribeiro`;
                    chatBody.innerHTML += `
                        <div class="chat-message bot-message">
                            Ótimo! Clique no botão abaixo para conversar diretamente conosco no WhatsApp:
                            <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">
                                <i class="fab fa-whatsapp"></i> Abrir WhatsApp
                            </a>
                        </div>
                    `;
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 800);
            } else {
                setTimeout(() => {
                    addBotMessage("Entendido. Fique à vontade para nos contatar quando quiser. Estamos à disposição!");
                }, 800);
            }
            currentStep++;
        }
    }
});
