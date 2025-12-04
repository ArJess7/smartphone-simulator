class CameraApp {
    constructor() {
        this.isFrontCamera = false;
        this.flashOn = false;
        this.photos = [];
        this.stream = null;
        this.videoElement = null;
    }
    
    getContent() {
        return `
            <div class="camera-app">
                <div class="camera-view">
                    <div class="camera-preview" id="cameraPreview">
                        <div class="camera-placeholder">
                            <i class="fas fa-camera"></i>
                            <p>Câmera ativa</p>
                        </div>
                    </div>
                    <div class="camera-overlay">
                        <div class="grid-overlay"></div>
                    </div>
                    <div class="camera-controls">
                        <button class="camera-btn secondary" id="switchCamera">
                            <i class="fas fa-camera-rotate"></i>
                        </button>
                        <button class="camera-btn" id="takePhoto">
                            <div class="shutter-ring"></div>
                            <i class="fas fa-circle"></i>
                        </button>
                        <button class="camera-btn secondary" id="toggleFlash">
                            <i class="fas fa-bolt"></i>
                        </button>
                    </div>
                    <div class="camera-modes">
                        <button class="mode-btn active">FOTO</button>
                        <button class="mode-btn">VÍDEO</button>
                        <button class="mode-btn">RETRATO</button>
                    </div>
                    <div class="photo-preview" id="photoPreview">
                        <div class="preview-header">
                            <button class="preview-close"><i class="fas fa-times"></i></button>
                            <button class="preview-save"><i class="fas fa-save"></i></button>
                        </div>
                        <img id="capturedPhoto" src="" alt="Foto capturada">
                    </div>
                </div>
            </div>
            
            <style>
                .camera-app {
                    height: 100%;
                    background: #000;
                    position: relative;
                }
                
                .camera-view {
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                
                .camera-preview {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #1a1a2e, #16213e);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .camera-placeholder {
                    text-align: center;
                    color: white;
                }
                
                .camera-placeholder i {
                    font-size: 4rem;
                    margin-bottom: 15px;
                    opacity: 0.7;
                }
                
                .camera-placeholder p {
                    font-size: 1.2rem;
                    opacity: 0.8;
                }
                
                .camera-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                .grid-overlay {
                    width: 100%;
                    height: 100%;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 25% 25%;
                }
                
                .camera-controls {
                    position: absolute;
                    bottom: 30px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    z-index: 10;
                }
                
                .camera-btn {
                    width: 70px;
                    height: 70px;
                    border-radius: 35px;
                    background: white;
                    border: 5px solid rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: #333;
                }
                
                .camera-btn:hover {
                    transform: scale(1.1);
                }
                
                .camera-btn.secondary {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                }
                
                .shutter-ring {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    border: 2px solid white;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }
                
                .camera-modes {
                    position: absolute;
                    top: 20px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    z-index: 10;
                }
                
                .mode-btn {
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .mode-btn.active {
                    background: white;
                    color: black;
                }
                
                .mode-btn:hover {
                    background: rgba(255, 255, 255, 0.8);
                    color: black;
                }
                
                .photo-preview {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: black;
                    z-index: 20;
                    display: none;
                    flex-direction: column;
                }
                
                .preview-header {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.8);
                }
                
                .preview-close, .preview-save {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    color: white;
                    cursor: pointer;
                    font-size: 1.2rem;
                }
                
                #capturedPhoto {
                    flex: 1;
                    object-fit: contain;
                    width: 100%;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                
                @keyframes flash {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            </style>
        `;
    }
    
    init() {
        setTimeout(() => {
            // Setup event listeners
            document.getElementById('takePhoto').addEventListener('click', () => this.capturePhoto());
            document.getElementById('switchCamera').addEventListener('click', () => this.switchCamera());
            document.getElementById('toggleFlash').addEventListener('click', () => this.toggleFlash());
            
            // Mode buttons
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                });
            });
            
            // Preview buttons
            const previewClose = document.querySelector('.preview-close');
            const previewSave = document.querySelector('.preview-save');
            
            if (previewClose) {
                previewClose.addEventListener('click', () => {
                    document.getElementById('photoPreview').style.display = 'none';
                });
            }
            
            if (previewSave) {
                previewSave.addEventListener('click', () => this.savePhoto());
            }
            
            // Try to access real camera (will only work with HTTPS)
            this.initializeCamera();
        }, 100);
    }
    
    async initializeCamera() {
        try {
            const constraints = {
                video: {
                    facingMode: this.isFrontCamera ? "user" : "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Create video element if it doesn't exist
            if (!this.videoElement) {
                this.videoElement = document.createElement('video');
                this.videoElement.autoplay = true;
                this.videoElement.playsInline = true;
                const preview = document.getElementById('cameraPreview');
                if (preview) {
                    preview.innerHTML = '';
                    preview.appendChild(this.videoElement);
                }
            }
            
            this.videoElement.srcObject = this.stream;
            
        } catch (err) {
            console.log('Camera access error:', err);
            // Fallback to placeholder
            const preview = document.getElementById('cameraPreview');
            if (preview) {
                preview.innerHTML = `
                    <div class="camera-placeholder">
                        <i class="fas fa-camera"></i>
                        <p>Câmera simulada</p>
                        <p style="font-size: 0.9rem; opacity: 0.6;">(Usando modo de demonstração)</p>
                    </div>
                `;
            }
        }
    }
    
    capturePhoto() {
        playSound('camera');
        
        // Flash effect
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.right = '0';
        flash.style.bottom = '0';
        flash.style.background = 'white';
        flash.style.zIndex = '15';
        flash.style.animation = 'flash 0.3s';
        document.querySelector('.camera-view').appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 300);
        
        // Simulate photo capture
        setTimeout(() => {
            this.showPreview();
        }, 350);
    }
    
    showPreview() {
        // Generate a random photo
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, randomColor);
        gradient.addColorStop(1, colors[(colors.indexOf(randomColor) + 1) % colors.length]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('📸 Foto Capturada', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText(new Date().toLocaleTimeString(), canvas.width / 2, canvas.height / 2 + 50);
        
        // Show preview
        const preview = document.getElementById('photoPreview');
        const img = document.getElementById('capturedPhoto');
        img.src = canvas.toDataURL('image/png');
        preview.style.display = 'flex';
        
        // Store photo
        this.photos.push({
            id: Date.now(),
            data: canvas.toDataURL('image/png'),
            timestamp: new Date()
        });
    }
    
    switchCamera() {
        playSound('click');
        this.isFrontCamera = !this.isFrontCamera;
        
        // Update icon
        const icon = document.querySelector('#switchCamera i');
        icon.className = this.isFrontCamera ? 'fas fa-camera' : 'fas fa-camera-rotate';
        
        // Restart camera with new facing mode
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        this.initializeCamera();
    }
    
    toggleFlash() {
        playSound('click');
        this.flashOn = !this.flashOn;
        
        // Update icon
        const icon = document.querySelector('#toggleFlash i');
        if (this.flashOn) {
            icon.className = 'fas fa-bolt';
            icon.style.color = '#FFD700';
        } else {
            icon.className = 'fas fa-bolt';
            icon.style.color = 'white';
        }
    }
    
    savePhoto() {
        playSound('click');
        
        // Show success message
        const preview = document.getElementById('photoPreview');
        preview.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #4CD964; margin-bottom: 20px;"></i>
                <h2>Foto Salva!</h2>
                <p>Adicionada à galeria</p>
                <button id="closePreview" style="margin-top: 30px; padding: 10px 30px; background: white; color: black; border: none; border-radius: 20px; cursor: pointer;">
                    OK
                </button>
            </div>
        `;
        
        document.getElementById('closePreview').addEventListener('click', () => {
            document.getElementById('photoPreview').style.display = 'none';
            // Reload camera view
            this.init();
        });
        
        // Add notification
        if (window.addNotification) {
            window.addNotification({
                id: Date.now().toString(),
                title: 'Câmera',
                message: 'Nova foto salva na galeria',
                icon: 'fas fa-camera',
                time: 'Agora'
            });
        }
    }
    
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}