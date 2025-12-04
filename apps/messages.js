class MessagesApp {
    constructor() {
        this.messages = [
            { sender: 'Maria Silva', avatar: 'M', time: '09:30', text: 'Olá, como você está?', unread: true },
            { sender: 'João Santos', avatar: 'J', time: 'Ontem', text: 'Vamos marcar aquele almoço?', unread: false },
            { sender: 'Ana Costa', avatar: 'A', time: '15/04', text: 'Lembrar da reunião amanhã!', unread: false }
        ];
    }
    
    getContent() {
        return `
            <div class="messages-container">
                ${this.messages.map(msg => `
                    <div class="message ${msg.unread ? 'unread' : ''}">
                        <div class="message-avatar">${msg.avatar}</div>
                        <div class="message-content">
                            <div class="message-header">
                                <span class="message-sender">${msg.sender}</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <p class="message-text">${msg.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="message-input-container">
                <div class="input-wrapper">
                    <input type="text" placeholder="Digite uma mensagem..." id="messageInput">
                    <button id="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    init() {
        setTimeout(() => {
            document.getElementById('sendMessage').addEventListener('click', () => this.sendMessage());
            document.getElementById('messageInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }, 100);
    }
    
    sendMessage() {
        const input = document.getElementById('messageInput');
        const text = input.value.trim();
        
        if (text) {
            this.messages.unshift({
                sender: 'Você',
                avatar: 'V',
                time: 'Agora',
                text: text,
                unread: false
            });
            
            // Update UI
            document.querySelector('.messages-container').innerHTML = this.messages.map(msg => `
                <div class="message ${msg.unread ? 'unread' : ''}">
                    <div class="message-avatar">${msg.avatar}</div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-sender">${msg.sender}</span>
                            <span class="message-time">${msg.time}</span>
                        </div>
                        <p class="message-text">${msg.text}</p>
                    </div>
                </div>
            `).join('');
            
            input.value = '';
            playSound('message');
        }
    }
}