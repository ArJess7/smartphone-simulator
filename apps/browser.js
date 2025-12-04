class BrowserApp {
    constructor() {
        this.history = [];
        this.bookmarks = [
            { name: 'Google', url: 'https://www.google.com', icon: 'fas fa-search' },
            { name: 'YouTube', url: 'https://www.youtube.com', icon: 'fas fa-play' },
            { name: 'GitHub', url: 'https://www.github.com', icon: 'fab fa-github' },
            { name: 'Twitter', url: 'https://www.twitter.com', icon: 'fab fa-twitter' }
        ];
        this.currentUrl = 'https://nexusos.com';
        this.homepage = 'https://nexusos.com';
    }
    
    getContent() {
        return `
            <div class="browser-app">
                <div class="browser-header">
                    <div class="nav-buttons">
                        <button class="nav-btn" id="browserBack">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="nav-btn" id="browserForward">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button class="nav-btn" id="browserRefresh">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="nav-btn" id="browserHome">
                            <i class="fas fa-home"></i>
                        </button>
                    </div>
                    <div class="url-bar">
                        <i class="fas fa-lock"></i>
                        <input type="text" id="urlInput" value="${this.currentUrl}" placeholder="Buscar ou digitar URL">
                        <button class="go-btn" id="goButton">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div class="browser-menu">
                        <button class="menu-btn" id="browserMenu">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                
                <div class="browser-content">
                    <div class="browser-view" id="browserView">
                        <!-- Content will be loaded here -->
                    </div>
                    
                    <div class="browser-home" id="browserHomeScreen">
                        <div class="search-box">
                            <div class="search-input">
                                <i class="fas fa-search"></i>
                                <input type="text" id="searchInput" placeholder="Buscar no Nexus Search">
                                <button id="searchButton">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="bookmarks-section">
                            <h3>Favoritos</h3>
                            <div class="bookmarks-grid">
                                ${this.bookmarks.map(bookmark => `
                                    <div class="bookmark" data-url="${bookmark.url}">
                                        <div class="bookmark-icon">
                                            <i class="${bookmark.icon}"></i>
                                        </div>
                                        <span class="bookmark-name">${bookmark.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="quick-links">
                            <h3>Links Rápidos</h3>
                            <div class="links-grid">
                                <div class="quick-link" data-url="https://news.google.com">
                                    <i class="fas fa-newspaper"></i>
                                    <span>Notícias</span>
                                </div>
                                <div class="quick-link" data-url="https://web.whatsapp.com">
                                    <i class="fab fa-whatsapp"></i>
                                    <span>WhatsApp Web</span>
                                </div>
                                <div class="quick-link" data-url="https://mail.google.com">
                                    <i class="fas fa-envelope"></i>
                                    <span>Gmail</span>
                                </div>
                                <div class="quick-link" data-url="https://drive.google.com">
                                    <i class="fas fa-cloud"></i>
                                    <span>Google Drive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="browser-tabs">
                    <div class="tabs-header">
                        <span>Abas</span>
                        <button id="newTab">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="tabs-list">
                        <div class="tab active">
                            <i class="fas fa-globe"></i>
                            <span>Nexus OS</span>
                            <button class="close-tab"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                
                <div class="browser-menu-panel" id="menuPanel">
                    <div class="menu-item">
                        <i class="fas fa-bookmark"></i>
                        <span>Favoritos</span>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-history"></i>
                        <span>Histórico</span>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-download"></i>
                        <span>Downloads</span>
                    </div>
                    <div class="menu-item">
                        <i class="fas fa-cog"></i>
                        <span>Configurações</span>
                    </div>
                </div>
            </div>
            
            <style>
                .browser-app {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: white;
                }
                
                .browser-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: #f8f8f8;
                    border-bottom: 1px solid #ddd;
                }
                
                .nav-buttons {
                    display: flex;
                    gap: 5px;
                }
                
                .nav-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    background: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #333;
                }
                
                .nav-btn:hover {
                    background: #f0f0f0;
                }
                
                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .url-bar {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    padding: 8px 15px;
                }
                
                .url-bar i {
                    color: #4CD964;
                    font-size: 0.9rem;
                }
                
                #urlInput {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 0.9rem;
                    background: transparent;
                }
                
                .go-btn {
                    background: #007AFF;
                    color: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                }
                
                .browser-menu {
                    margin-left: auto;
                }
                
                .menu-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    background: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .browser-content {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
                
                .browser-view, .browser-home {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow-y: auto;
                }
                
                .browser-home {
                    padding: 20px;
                }
                
                .search-box {
                    margin-bottom: 30px;
                }
                
                .search-input {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #f0f0f0;
                    border-radius: 25px;
                    padding: 12px 20px;
                }
                
                .search-input i {
                    color: #999;
                }
                
                #searchInput {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 1rem;
                }
                
                #searchButton {
                    background: #007AFF;
                    color: white;
                    border: none;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                }
                
                .bookmarks-section, .quick-links {
                    margin-bottom: 30px;
                }
                
                .bookmarks-section h3, .quick-links h3 {
                    margin-bottom: 15px;
                    color: #333;
                    font-size: 1.1rem;
                }
                
                .bookmarks-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }
                
                .bookmark {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 10px;
                    transition: background 0.3s ease;
                }
                
                .bookmark:hover {
                    background: #f0f0f0;
                }
                
                .bookmark-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: #007AFF;
                }
                
                .bookmark-name {
                    font-size: 0.8rem;
                    text-align: center;
                    color: #333;
                }
                
                .links-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }
                
                .quick-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 10px;
                    transition: background 0.3s ease;
                }
                
                .quick-link:hover {
                    background: #f0f0f0;
                }
                
                .quick-link i {
                    font-size: 1.5rem;
                    color: #007AFF;
                }
                
                .quick-link span {
                    font-size: 0.8rem;
                    text-align: center;
                    color: #333;
                }
                
                .browser-tabs {
                    border-top: 1px solid #ddd;
                    background: #f8f8f8;
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .tabs-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px;
                    border-bottom: 1px solid #ddd;
                }
                
                .tabs-header span {
                    font-weight: 600;
                    color: #333;
                }
                
                #newTab {
                    background: #007AFF;
                    color: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                }
                
                .tabs-list {
                    padding: 10px;
                }
                
                .tab {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: white;
                    border-radius: 10px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    border: 2px solid transparent;
                }
                
                .tab.active {
                    border-color: #007AFF;
                }
                
                .tab i {
                    color: #007AFF;
                }
                
                .tab span {
                    flex: 1;
                    font-size: 0.9rem;
                }
                
                .close-tab {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-tab:hover {
                    background: #f0f0f0;
                }
                
                .browser-menu-panel {
                    position: absolute;
                    top: 60px;
                    right: 10px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    display: none;
                    z-index: 100;
                    min-width: 200px;
                }
                
                .browser-menu-panel.show {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }
                
                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                
                .menu-item:hover {
                    background: #f0f0f0;
                }
                
                .menu-item i {
                    width: 20px;
                    text-align: center;
                    color: #007AFF;
                }
                
                .webpage {
                    padding: 20px;
                }
                
                .webpage h1 {
                    margin-bottom: 20px;
                    color: #333;
                }
                
                .webpage p {
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 15px;
                }
                
                .webpage-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-top: 30px;
                }
                
                .content-card {
                    background: #f8f8f8;
                    padding: 20px;
                    border-radius: 10px;
                }
                
                .content-card h3 {
                    margin-bottom: 10px;
                    color: #333;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;
    }
    
    init() {
        setTimeout(() => {
            this.setupEventListeners();
            this.loadHomepage();
        }, 100);
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('browserBack').addEventListener('click', () => this.goBack());
        document.getElementById('browserForward').addEventListener('click', () => this.goForward());
        document.getElementById('browserRefresh').addEventListener('click', () => this.refreshPage());
        document.getElementById('browserHome').addEventListener('click', () => this.goHome());
        
        // URL bar
        document.getElementById('urlInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.navigateToUrl();
        });
        
        document.getElementById('goButton').addEventListener('click', () => this.navigateToUrl());
        
        // Search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        document.getElementById('searchButton').addEventListener('click', () => this.performSearch());
        
        // Bookmarks and quick links
        document.querySelectorAll('.bookmark, .quick-link').forEach(item => {
            item.addEventListener('click', (e) => {
                const url = e.currentTarget.dataset.url;
                this.navigate(url);
            });
        });
        
        // Menu
        document.getElementById('browserMenu').addEventListener('click', () => {
            const panel = document.getElementById('menuPanel');
            panel.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.browser-menu') && !e.target.closest('.browser-menu-panel')) {
                document.getElementById('menuPanel').classList.remove('show');
            }
        });
        
        // New tab
        document.getElementById('newTab').addEventListener('click', () => this.newTab());
        
        // Close tab
        document.querySelector('.close-tab').addEventListener('click', (e) => {
            e.stopPropagation();
            // In a real app, you would remove the tab
            alert('Funcionalidade de fechar aba em desenvolvimento');
        });
    }
    
    navigateToUrl() {
        const urlInput = document.getElementById('urlInput');
        let url = urlInput.value.trim();
        
        if (!url) return;
        
        // Add https:// if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        this.navigate(url);
    }
    
    navigate(url) {
        playSound('click');
        this.currentUrl = url;
        document.getElementById('urlInput').value = url;
        
        // Add to history
        this.history.push({
            url: url,
            title: `Visita a ${new URL(url).hostname}`,
            timestamp: new Date()
        });
        
        // Hide home screen
        document.getElementById('browserHomeScreen').style.display = 'none';
        document.getElementById('browserView').style.display = 'block';
        
        // Load content based on URL
        this.loadWebpage(url);
        
        // Close menu if open
        document.getElementById('menuPanel').classList.remove('show');
    }
    
    loadWebpage(url) {
        const browserView = document.getElementById('browserView');
        const hostname = new URL(url).hostname;
        
        // Simulate different websites
        let content = '';
        
        if (hostname.includes('google.com')) {
            content = this.getGooglePage();
        } else if (hostname.includes('youtube.com')) {
            content = this.getYouTubePage();
        } else if (hostname.includes('github.com')) {
            content = this.getGitHubPage();
        } else if (hostname.includes('twitter.com')) {
            content = this.getTwitterPage();
        } else if (hostname.includes('whatsapp.com')) {
            content = this.getWhatsAppPage();
        } else {
            content = this.getDefaultPage(url);
        }
        
        browserView.innerHTML = content;
        browserView.scrollTop = 0;
    }
    
    loadHomepage() {
        this.currentUrl = this.homepage;
        document.getElementById('urlInput').value = this.homepage;
        document.getElementById('browserHomeScreen').style.display = 'block';
        document.getElementById('browserView').style.display = 'none';
    }
    
    goBack() {
        playSound('click');
        if (this.history.length > 1) {
            this.history.pop(); // Remove current
            const previous = this.history.pop();
            if (previous) {
                this.navigate(previous.url);
            }
        }
    }
    
    goForward() {
        playSound('click');
        // In a real app, you would have forward history
        alert('Histórico de avanço não implementado nesta demonstração');
    }
    
    refreshPage() {
        playSound('click');
        this.loadWebpage(this.currentUrl);
    }
    
    goHome() {
        playSound('click');
        this.loadHomepage();
    }
    
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            this.navigate(searchUrl);
        }
    }
    
    newTab() {
        playSound('click');
        // In a real app, you would create a new tab
        alert('Funcionalidade de nova aba em desenvolvimento');
    }
    
    getGooglePage() {
        return `
            <div class="webpage">
                <div style="text-align: center; padding: 40px 20px;">
                    <h1 style="font-size: 4rem; color: #4285F4; margin-bottom: 30px;">
                        <span style="color: #EA4335">G</span>
                        <span style="color: #FBBC05">o</span>
                        <span style="color: #4285F4">o</span>
                        <span style="color: #34A853">g</span>
                        <span style="color: #EA4335">l</span>
                        <span style="color: #FBBC05">e</span>
                    </h1>
                    <div style="max-width: 500px; margin: 0 auto;">
                        <div style="display: flex; align-items: center; background: white; border: 1px solid #ddd; border-radius: 25px; padding: 10px 20px; margin-bottom: 20px;">
                            <i class="fas fa-search" style="color: #999; margin-right: 10px;"></i>
                            <input type="text" style="flex: 1; border: none; outline: none; font-size: 1rem;" value="Nexus OS smartphone simulator" readonly>
                        </div>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button style="padding: 10px 20px; background: #f8f8f8; border: 1px solid #f8f8f8; border-radius: 5px; cursor: pointer;">Pesquisa Google</button>
                            <button style="padding: 10px 20px; background: #f8f8f8; border: 1px solid #f8f8f8; border-radius: 5px; cursor: pointer;">Estou com sorte</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getYouTubePage() {
        return `
            <div class="webpage">
                <div style="background: #ff0000; color: white; padding: 15px; text-align: center;">
                    <h1 style="font-size: 2rem; margin: 0;">
                        <i class="fab fa-youtube"></i> YouTube
                    </h1>
                </div>
                <div style="padding: 20px;">
                    <h2>Vídeos Recomendados</h2>
                    <div class="webpage-content">
                        <div class="content-card">
                            <div style="width: 100%; height: 150px; background: #333; border-radius: 10px; margin-bottom: 10px;"></div>
                            <h3>Como criar um smartphone virtual</h3>
                            <p>Nexus OS • 250K visualizações</p>
                        </div>
                        <div class="content-card">
                            <div style="width: 100%; height: 150px; background: #333; border-radius: 10px; margin-bottom: 10px;"></div>
                            <h3>Tutorial de desenvolvimento web</h3>
                            <p>DevTips • 150K visualizações</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getGitHubPage() {
        return `
            <div class="webpage">
                <div style="background: #24292e; color: white; padding: 20px;">
                    <h1 style="display: flex; align-items: center; gap: 10px;">
                        <i class="fab fa-github"></i> GitHub
                    </h1>
                </div>
                <div style="padding: 20px;">
                    <h2>Repositórios Populares</h2>
                    <div class="webpage-content">
                        <div class="content-card">
                            <h3>ArJess7/smartphone-simulator</h3>
                            <p>⭐ 1.2k • Simulador de smartphone em HTML/CSS/JS</p>
                        </div>
                        <div class="content-card">
                            <h3>ArJess7/adivinhe-o-numero</h3>
                            <p>⭐ 850 • Jogo de adivinhação com design moderno</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTwitterPage() {
        return `
            <div class="webpage">
                <div style="background: #1DA1F2; color: white; padding: 15px; text-align: center;">
                    <h1 style="font-size: 2rem; margin: 0;">
                        <i class="fab fa-twitter"></i> Twitter
                    </h1>
                </div>
                <div style="padding: 20px;">
                    <h2>O que está acontecendo</h2>
                    <div class="content-card" style="margin-bottom: 15px;">
                        <p><strong>#WebDevelopment</strong> está em alta</p>
                        <p>25.4K posts</p>
                    </div>
                    <div class="content-card" style="margin-bottom: 15px;">
                        <p><strong>#NexusOS</strong> Tendência no Brasil</p>
                        <p>5.2K posts</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    getWhatsAppPage() {
        return `
            <div class="webpage">
                <div style="background: #25D366; color: white; padding: 15px; text-align: center;">
                    <h1 style="font-size: 2rem; margin: 0; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <i class="fab fa-whatsapp"></i> WhatsApp Web
                    </h1>
                </div>
                <div style="padding: 40px 20px; text-align: center;">
                    <div style="font-size: 5rem; color: #25D366; margin-bottom: 20px;">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <h2>Use o WhatsApp no seu computador</h2>
                    <p>1. Abra o WhatsApp no seu telefone</p>
                    <p>2. Toque em Menu e selecione WhatsApp Web</p>
                    <p>3. Aponte seu telefone para esta tela para capturar o código</p>
                    <div style="margin: 30px auto; width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        QR Code
                    </div>
                </div>
            </div>
        `;
    }
    
    getDefaultPage(url) {
        return `
            <div class="webpage">
                <h1>${new URL(url).hostname}</h1>
                <p>Bem-vindo ao navegador Nexus OS!</p>
                <p>Você está visitando: <strong>${url}</strong></p>
                <p>Este é um navegador simulado para demonstração. Em um navegador real, esta página seria carregada da internet.</p>
                
                <div class="webpage-content">
                    <div class="content-card">
                        <h3>Recursos do Navegador</h3>
                        <p>• Navegação por URLs</p>
                        <p>• Sistema de favoritos</p>
                        <p>• Histórico de navegação</p>
                        <p>• Múltiplas abas</p>
                    </div>
                    <div class="content-card">
                        <h3>Simulação de Sites</h3>
                        <p>• Google</p>
                        <p>• YouTube</p>
                        <p>• GitHub</p>
                        <p>• Twitter</p>
                        <p>• WhatsApp Web</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #f8f8f8; border-radius: 10px;">
                    <h3>Experimente:</h3>
                    <p>Tente digitar:</p>
                    <ul>
                        <li>google.com</li>
                        <li>youtube.com</li>
                        <li>github.com</li>
                        <li>twitter.com</li>
                        <li>web.whatsapp.com</li>
                    </ul>
                </div>
            </div>
        `;
    }
}