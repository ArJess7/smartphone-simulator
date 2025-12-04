// ===== GLOBAL STATE =====
const state = {
    isLocked: true,
    currentApp: null,
    isControlCenterOpen: false,
    brightness: 70,
    volume: 50,
    notifications: [],
    battery: 85,
    wifi: true,
    bluetooth: false,
    airplane: false,
    cellular: true,
    flashlight: false,
    rotation: false,
    airdrop: false,
    hotspot: false
};

// ===== DOM ELEMENTS =====
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    phoneContainer: document.querySelector('.phone-container'),
    currentTime: document.getElementById('currentTime'),
    currentDay: document.getElementById('currentDay'),
    currentDate: document.getElementById('currentDate'),
    lockTime: document.getElementById('lockTime'),
    lockDate: document.getElementById('lockDate'),
    lockScreen: document.getElementById('lockScreen'),
    lockSlider: document.getElementById('lockSlider'),
    homeScreen: document.getElementById('homeScreen'),
    controlCenter: document.getElementById('controlCenter'),
    appWindow: document.getElementById('appWindow'),
    appTitle: document.getElementById('appTitle'),
    appContent: document.getElementById('appContent'),
    notificationsPanel: document.getElementById('notificationsPanel'),
    notificationsList: document.getElementById('notificationsList'),
    brightnessSlider: document.getElementById('brightnessSlider'),
    volumeSlider: document.getElementById('volumeSlider')
};

// ===== AUDIO =====
const audio = {
    click: document.getElementById('clickSound'),
    unlock: document.getElementById('unlockSound'),
    camera: document.getElementById('cameraSound'),
    message: document.getElementById('messageSound')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
            elements.phoneContainer.style.display = 'block';
            initPhone();
        }, 500);
    }, 2500);

    // Initialize time
    updateTime();
    setInterval(updateTime, 1000);

    // Initialize date
    updateDate();

    // Initialize notifications
    initializeNotifications();

    // Setup event listeners
    setupEventListeners();

    // Setup app icons
    setupAppIcons();

    // Setup lock screen
    setupLockScreen();
});

function initPhone() {
    // Start with lock screen
    showLockScreen();
    
    // Add some sample notifications
    addNotification({
        id: '1',
        title: 'Bem-vindo ao Nexus OS',
        message: 'Seu smartphone virtual está pronto para uso',
        icon: 'fas fa-mobile-alt',
        time: 'Agora'
    });
    
    addNotification({
        id: '2',
        title: 'Bateria',
        message: '85% restante - Carregamento completo',
        icon: 'fas fa-battery-three-quarters',
        time: '5 min atrás'
    });
}

// ===== TIME & DATE =====
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    elements.currentTime.textContent = timeString;
    elements.lockTime.textContent = timeString;
}

function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const dateString = now.toLocaleDateString('pt-BR', options);
    const [day, ...dateParts] = dateString.split(', ');
    const date = dateParts.join(', ');
    
    elements.currentDay.textContent = day;
    elements.currentDate.textContent = date;
    elements.lockDate.textContent = `${day}, ${date}`;
}

// ===== NOTIFICATIONS =====
function initializeNotifications() {
    // Sample notifications
    state.notifications = [
        {
            id: '1',
            title: 'Maria Silva',
            message: 'Olá, como você está?',
            icon: 'fas fa-envelope',
            time: '2 min atrás'
        },
        {
            id: '2',
            title: 'Reunião',
            message: 'Daily às 10:00',
            icon: 'fas fa-calendar',
            time: '15 min atrás'
        },
        {
            id: '3',
            title: 'App Store',
            message: '3 atualizações disponíveis',
            icon: 'fas fa-shopping-bag',
            time: '1 hora atrás'
        }
    ];
    
    updateNotificationsList();
}

function addNotification(notification) {
    state.notifications.unshift(notification);
    updateNotificationsList();
    playSound('message');
    
    // Show badge on home screen
    updateAppBadges();
}

function updateNotificationsList() {
    elements.notificationsList.innerHTML = '';
    
    state.notifications.forEach(notif => {
        const notifElement = document.createElement('div');
        notifElement.className = 'notification';
        notifElement.innerHTML = `
            <i class="${notif.icon}"></i>
            <div class="notification-content">
                <strong>${notif.title}</strong>
                <p>${notif.message}</p>
                <span>${notif.time}</span>
            </div>
        `;
        elements.notificationsList.appendChild(notifElement);
    });
}

function updateAppBadges() {
    // Update message badge
    const messageBadge = document.querySelector('.app-icon[data-app="messages"] .app-badge');
    const messageCount = state.notifications.filter(n => n.icon === 'fas fa-envelope').length;
    messageBadge.textContent = messageCount;
    messageBadge.style.display = messageCount > 0 ? 'flex' : 'none';
    
    // Update email badge
    const emailBadge = document.querySelector('.app-icon[data-app="email"] .app-badge');
    emailBadge.style.display = 'flex';
}

// ===== LOCK SCREEN =====
function setupLockScreen() {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const slider = elements.lockSlider;
    const track = slider.querySelector('.slider-track');
    const maxSlide = slider.offsetWidth - 100;
    
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentX = startX;
        slider.style.cursor = 'grabbing';
        track.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentX = clientX;
        
        const deltaX = currentX - startX;
        const newX = Math.max(0, Math.min(maxSlide, deltaX));
        
        track.style.transform = `translateX(${newX}px)`;
        
        // Change opacity based on slide progress
        const progress = newX / maxSlide;
        track.style.opacity = 0.7 + (progress * 0.3);
        
        // Update text
        const text = track.querySelector('span');
        if (progress > 0.7) {
            text.textContent = 'Solte para desbloquear';
            text.style.color = '#4CD964';
        } else {
            text.textContent = 'Deslize para desbloquear';
            text.style.color = 'white';
        }
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = currentX - startX;
        const progress = deltaX / maxSlide;
        
        if (progress > 0.7) {
            // Unlock
            unlockPhone();
        }
        
        // Reset
        track.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        track.style.transform = 'translateX(0)';
        track.style.opacity = '1';
        
        const text = track.querySelector('span');
        text.textContent = 'Deslize para desbloquear';
        text.style.color = 'white';
        
        slider.style.cursor = 'pointer';
    }
}

function unlockPhone() {
    playSound('unlock');
    state.isLocked = false;
    
    elements.lockScreen.style.animation = 'slideOut 0.5s ease forwards';
    setTimeout(() => {
        elements.lockScreen.style.display = 'none';
        showHomeScreen();
    }, 500);
}

function lockPhone() {
    playSound('click');
    state.isLocked = true;
    state.currentApp = null;
    
    elements.lockScreen.style.display = 'flex';
    elements.lockScreen.style.animation = 'slideIn 0.5s ease forwards';
    elements.homeScreen.style.display = 'none';
    elements.appWindow.style.display = 'none';
    elements.controlCenter.classList.remove('active');
}

// ===== SCREEN MANAGEMENT =====
function showHomeScreen() {
    elements.homeScreen.style.display = 'flex';
    elements.homeScreen.style.animation = 'fadeIn 0.3s ease';
    elements.appWindow.style.display = 'none';
    elements.notificationsPanel.style.display = 'none';
    state.currentApp = null;
}

function showApp(appName) {
    if (state.isLocked) return;
    
    playSound('click');
    state.currentApp = appName;
    
    elements.homeScreen.style.display = 'none';
    elements.appWindow.style.display = 'flex';
    elements.notificationsPanel.style.display = 'none';
    
    // Load app content
    loadApp(appName);
}

function showNotifications() {
    if (state.isLocked) return;
    
    playSound('click');
    elements.homeScreen.style.display = 'none';
    elements.appWindow.style.display = 'none';
    elements.notificationsPanel.style.display = 'flex';
    elements.notificationsPanel.style.animation = 'slideIn 0.3s ease';
}

function toggleControlCenter() {
    playSound('click');
    state.isControlCenterOpen = !state.isControlCenterOpen;
    elements.controlCenter.classList.toggle('active', state.isControlCenterOpen);
}

// ===== APP SYSTEM =====
function setupAppIcons() {
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const app = this.dataset.app;
            showApp(app);
        });
    });
}

function loadApp(appName) {
    // Set app title
    const appNames = {
        phone: 'Telefone',
        messages: 'Mensagens',
        browser: 'Navegador',
        music: 'Música',
        camera: 'Câmera',
        gallery: 'Fotos',
        settings: 'Configurações',
        calendar: 'Calendário',
        weather: 'Tempo',
        maps: 'Mapas',
        email: 'Email',
        notes: 'Notas',
        calculator: 'Calculadora',
        clock: 'Relógio',
        contacts: 'Contatos',
        store: 'Loja'
    };
    
    elements.appTitle.textContent = appNames[appName] || 'App';
    
    // Load app content
    let appContent = '';
    
    switch(appName) {
        case 'phone':
            appContent = getPhoneApp();
            break;
        case 'messages':
            appContent = getMessagesApp();
            break;
        case 'camera':
            appContent = getCameraApp();
            break;
        case 'browser':
            appContent = getBrowserApp();
            break;
        case 'music':
            appContent = getMusicApp();
            break;
        case 'settings':
            appContent = getSettingsApp();
            break;
        default:
            appContent = getDefaultApp(appName);
    }
    
    elements.appContent.innerHTML = appContent;
    
    // Initialize app-specific functionality
    initApp(appName);
}

function getPhoneApp() {
    return `
        <div class="phone-app">
            <div class="phone-number-display">
                <h2 style="text-align: center; margin: 20px 0; font-size: 2rem; color: #333;">(11) 99999-9999</h2>
            </div>
            <div class="keypad">
                <button class="key"><span>1</span><br><span class="sub"></span></button>
                <button class="key"><span>2</span><br><span class="sub">ABC</span></button>
                <button class="key"><span>3</span><br><span class="sub">DEF</span></button>
                <button class="key"><span>4</span><br><span class="sub">GHI</span></button>
                <button class="key"><span>5</span><br><span class="sub">JKL</span></button>
                <button class="key"><span>6</span><br><span class="sub">MNO</span></button>
                <button class="key"><span>7</span><br><span class="sub">PQRS</span></button>
                <button class="key"><span>8</span><br><span class="sub">TUV</span></button>
                <button class="key"><span>9</span><br><span class="sub">WXYZ</span></button>
                <button class="key"><span>*</span></button>
                <button class="key"><span>0</span><br><span class="sub">+</span></button>
                <button class="key"><span>#</span></button>
            </div>
            <div style="display: flex; justify-content: center; gap: 40px; margin-top: 30px;">
                <button class="key" style="background: #4CD964; color: white; width: 70px; height: 70px;">
                    <i class="fas fa-phone"></i>
                </button>
                <button class="key" style="background: #FF3B30; color: white; width: 70px; height: 70px;">
                    <i class="fas fa-phone-slash"></i>
                </button>
            </div>
        </div>
    `;
}

function getMessagesApp() {
    return `
        <div class="messages-container">
            <div class="message">
                <div class="message-avatar">M</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">Maria Silva</span>
                        <span class="message-time">09:30</span>
                    </div>
                    <p class="message-text">Olá, como você está?</p>
                </div>
            </div>
            <div class="message">
                <div class="message-avatar">J</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">João Santos</span>
                        <span class="message-time">Ontem</span>
                    </div>
                    <p class="message-text">Vamos marcar aquele almoço?</p>
                </div>
            </div>
            <div class="message">
                <div class="message-avatar">A</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">Ana Costa</span>
                        <span class="message-time">15/04</span>
                    </div>
                    <p class="message-text">Lembrar da reunião amanhã!</p>
                </div>
            </div>
        </div>
        <div style="position: absolute; bottom: 20px; left: 20px; right: 20px;">
            <div style="display: flex; gap: 10px;">
                <input type="text" placeholder="Digite uma mensagem..." style="flex: 1; padding: 15px; border: 1px solid #ddd; border-radius: 25px; font-size: 1rem;">
                <button style="width: 50px; height: 50px; border-radius: 25px; background: #007AFF; color: white; border: none; cursor: pointer;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
}

function getCameraApp() {
    return `
        <div class="camera-view">
            <div class="camera-preview" style="background: linear-gradient(45deg, #667eea, #764ba2);"></div>
            <div class="camera-controls">
                <button class="camera-btn secondary">
                    <i class="fas fa-camera-rotate"></i>
                </button>
                <button class="camera-btn" id="takePhoto">
                    <i class="fas fa-circle"></i>
                </button>
                <button class="camera-btn secondary">
                    <i class="fas fa-images"></i>
                </button>
            </div>
        </div>
    `;
}

function getBrowserApp() {
    return `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="display: flex; gap: 10px; padding: 10px; border-bottom: 1px solid #ddd;">
                <button style="padding: 10px 15px; background: #f0f0f0; border: none; border-radius: 10px; cursor: pointer;">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <input type="text" value="https://nexusos.com" style="flex: 1; padding: 10px 15px; border: 1px solid #ddd; border-radius: 10px; font-size: 0.9rem;">
                <button style="padding: 10px 15px; background: #007AFF; color: white; border: none; border-radius: 10px; cursor: pointer;">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <div style="flex: 1; padding: 20px; overflow-y: auto;">
                <h3 style="margin-bottom: 15px;">Nexus OS Browser</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                    Bem-vindo ao navegador do Nexus OS. Este é um navegador simulado para demonstração.
                </p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                        <h4 style="margin-bottom: 10px;">Notícias</h4>
                        <p style="font-size: 0.9rem; color: #666;">Últimas atualizações do mundo tech</p>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                        <h4 style="margin-bottom: 10px;">Redes Sociais</h4>
                        <p style="font-size: 0.9rem; color: #666;">Conecte-se com amigos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMusicApp() {
    return `
        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center;">
            <div style="width: 200px; height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 20px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-music" style="font-size: 4rem; color: white;"></i>
            </div>
            <h3 style="margin-bottom: 10px;">Música Relaxante</h3>
            <p style="color: #666; margin-bottom: 30px;">Playlist: Chill Vibes</p>
            <div style="width: 100%; margin-bottom: 30px;">
                <div style="height: 4px; background: #ddd; border-radius: 2px; margin-bottom: 10px;">
                    <div style="width: 30%; height: 100%; background: #007AFF; border-radius: 2px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #666;">
                    <span>1:30</span>
                    <span>5:00</span>
                </div>
            </div>
            <div style="display: flex; justify-content: center; gap: 30px;">
                <button style="width: 50px; height: 50px; border-radius: 25px; background: #f0f0f0; border: none; cursor: pointer; font-size: 1.2rem;">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button style="width: 70px; height: 70px; border-radius: 35px; background: #007AFF; color: white; border: none; cursor: pointer; font-size: 1.5rem;">
                    <i class="fas fa-play"></i>
                </button>
                <button style="width: 50px; height: 50px; border-radius: 25px; background: #f0f0f0; border: none; cursor: pointer; font-size: 1.2rem;">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>
        </div>
    `;
}

function getSettingsApp() {
    return `
        <div style="height: 100%; overflow-y: auto;">
            <div class="settings-section">
                <h4 style="padding: 15px 20px; background: #f8f8f8; color: #666; font-size: 0.9rem; margin: 0;">CONEXÕES</h4>
                <div class="settings-item">
                    <i class="fas fa-wifi"></i>
                    <span>Wi-Fi</span>
                    <span style="color: #666; margin-left: auto;">Conectado</span>
                </div>
                <div class="settings-item">
                    <i class="fas fa-bluetooth"></i>
                    <span>Bluetooth</span>
                    <span style="color: #666; margin-left: auto;">Desligado</span>
                </div>
            </div>
            <div class="settings-section">
                <h4 style="padding: 15px 20px; background: #f8f8f8; color: #666; font-size: 0.9rem; margin: 0;">TELA</h4>
                <div class="settings-item">
                    <i class="fas fa-sun"></i>
                    <span>Brilho</span>
                    <span style="color: #666; margin-left: auto;">70%</span>
                </div>
                <div class="settings-item">
                    <i class="fas fa-palette"></i>
                    <span>Papel de Parede</span>
                    <span style="color: #666; margin-left: auto;"></span>
                </div>
            </div>
        </div>
    `;
}

function getDefaultApp(appName) {
    return `
        <div class="app-placeholder">
            <i class="fas fa-${getAppIcon(appName)}"></i>
            <p>${appName.charAt(0).toUpperCase() + appName.slice(1)} App</p>
            <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">Em desenvolvimento</p>
        </div>
    `;
}

function getAppIcon(appName) {
    const icons = {
        phone: 'phone',
        messages: 'comment-dots',
        browser: 'globe',
        music: 'music',
        camera: 'camera',
        gallery: 'images',
        settings: 'cog',
        calendar: 'calendar',
        weather: 'cloud-sun',
        maps: 'map-marked-alt',
        email: 'envelope',
        notes: 'sticky-note',
        calculator: 'calculator',
        clock: 'clock',
        contacts: 'address-book',
        store: 'shopping-bag'
    };
    return icons[appName] || 'mobile-alt';
}

function initApp(appName) {
    switch(appName) {
        case 'camera':
            const takePhotoBtn = document.getElementById('takePhoto');
            if (takePhotoBtn) {
                takePhotoBtn.addEventListener('click', function() {
                    playSound('camera');
                    // Add flash effect
                    document.querySelector('.camera-view').style.backgroundColor = 'white';
                    setTimeout(() => {
                        document.querySelector('.camera-view').style.backgroundColor = 'black';
                    }, 100);
                    
                    // Add notification
                    addNotification({
                        id: Date.now().toString(),
                        title: 'Câmera',
                        message: 'Foto salva na galeria',
                        icon: 'fas fa-camera',
                        time: 'Agora'
                    });
                });
            }
            break;
            
        case 'phone':
            // Initialize keypad
            document.querySelectorAll('.keypad .key').forEach(key => {
                key.addEventListener('click', function() {
                    playSound('click');
                });
            });
            break;
    }
}

// ===== CONTROL CENTER =====
function setupEventListeners() {
    // Control Center toggle
    document.querySelector('.control-center-toggle').addEventListener('click', toggleControlCenter);
    document.querySelector('.cc-close').addEventListener('click', toggleControlCenter);
    
    // Navigation buttons
    document.getElementById('navBack').addEventListener('click', function() {
        playSound('click');
        if (state.currentApp) {
            showHomeScreen();
        } else if (elements.notificationsPanel.style.display === 'flex') {
            showHomeScreen();
        }
    });
    
    document.getElementById('navHome').addEventListener('click', function() {
        playSound('click');
        showHomeScreen();
    });
    
    document.getElementById('navRecent').addEventListener('click', function() {
        playSound('click');
        showNotifications();
    });
    
    // Back button in app header
    document.querySelector('.back-btn').addEventListener('click', function() {
        playSound('click');
        showHomeScreen();
    });
    
    // Brightness slider
    elements.brightnessSlider.addEventListener('input', function() {
        state.brightness = this.value;
        updatePhoneBrightness();
    });
    
    // Volume slider
    elements.volumeSlider.addEventListener('input', function() {
        state.volume = this.value;
        updatePhoneVolume();
    });
    
    // Control Center tiles
    document.querySelectorAll('.cc-tile').forEach(tile => {
        tile.addEventListener('click', function() {
            playSound('click');
            const toggle = this.dataset.toggle;
            toggleFeature(toggle);
            this.classList.toggle('active');
        });
    });
    
    // Clear notifications
    document.querySelector('.clear-btn').addEventListener('click', function() {
        playSound('click');
        state.notifications = [];
        updateNotificationsList();
        updateAppBadges();
    });
}

function toggleFeature(feature) {
    state[feature] = !state[feature];
    console.log(`${feature}: ${state[feature] ? 'ON' : 'OFF'}`);
}

function updatePhoneBrightness() {
    document.body.style.filter = `brightness(${state.brightness}%)`;
}

function updatePhoneVolume() {
    Object.values(audio).forEach(sound => {
        sound.volume = state.volume / 100;
    });
}

// ===== UTILITIES =====
function playSound(soundName) {
    const sound = audio[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Áudio bloqueado"));
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (state.currentApp || elements.notificationsPanel.style.display === 'flex') {
            showHomeScreen();
        } else if (state.isControlCenterOpen) {
            toggleControlCenter();
        }
    } else if (e.key === 'l') {
        lockPhone();
    } else if (e.key === 'c') {
        toggleControlCenter();
    } else if (e.key === 'n') {
        showNotifications();
    }
});