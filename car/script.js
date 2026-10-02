/**
 * Site Önizleme Platformu
 * Geliştirilmiş Modern Versiyonu
 */

document.addEventListener("DOMContentLoaded", function() {
    // DOM Elemanları
    const iframe = document.getElementById('iframe-view');
    const controlPanel = document.getElementById('control-panel');
    const togglePanelBtn = document.getElementById('toggle-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const refreshBtn = document.getElementById('refresh-btn');
    const templateSelector = document.getElementById('template-selector');
    const productLink = document.getElementById('product-link');
    const deviceButtons = document.querySelectorAll('.device-btn');
    const codeBtn = document.getElementById('code-btn');
    const codeModal = document.getElementById('code-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const codeDisplay = document.getElementById('code-display');
    const copyCodeBtn = document.getElementById('copy-code');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const currentSizeDisplay = document.getElementById('current-size');
    const gridToggle = document.getElementById('grid-toggle');
    const darkModeToggle = document.getElementById('dark-mode');
    const iframeContainer = document.querySelector('.iframe-container');
    const loadingOverlay = document.getElementById('loading-overlay');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // Durum Değişkenleri
    let currentDevice = 'desktop';
    let currentTab = 'html';
    let codeContent = {
        html: '',
        css: '',
        js: ''
    };
    
    // İnitial yükleme göstergesini göster
    showLoading();
    
    // Iframe yüklendiğinde yükleme göstergesini gizle
    iframe.onload = function() {
        hideLoading();
        updateScreenSize();
    };
    
    // --------------- PANEL KONTROLÜ ---------------
    
    // Panel aç/kapa butonları
    togglePanelBtn.addEventListener('click', function() {
        controlPanel.classList.toggle('show');
    });
    
    closePanelBtn.addEventListener('click', function() {
        controlPanel.classList.remove('show');
    });
    
    // Belge tıklama olayında paneli kapat (panel dışında tıklandığında)
    document.addEventListener('click', function(e) {
        if (!controlPanel.contains(e.target) && 
            e.target !== togglePanelBtn && 
            !togglePanelBtn.contains(e.target)) {
            controlPanel.classList.remove('show');
        }
    });
    
    // --------------- CİHAZ BUTONLARI ---------------
    
    // Cihaz butonları için tıklama olayları
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const device = this.getAttribute('data-device');
            setDeviceView(device);
            
            // Aktif butonu güncelle
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Cihaz görünümünü ayarla
    function setDeviceView(device) {
        currentDevice = device;
        showLoading();
        
        // Tüm görünüm sınıflarını temizle
        iframe.classList.remove('mobile-view', 'tablet-view', 'laptop-view');
        
        switch(device) {
            case 'mobile':
                iframe.style.width = '375px';
                iframe.style.height = '812px';
                iframe.classList.add('mobile-view');
                break;
            case 'tablet':
                iframe.style.width = '768px';
                iframe.style.height = '1024px';
                iframe.classList.add('tablet-view');
                break;
            case 'laptop':
                iframe.style.width = '1280px';
                iframe.style.height = '800px';
                iframe.classList.add('laptop-view');
                break;
            default: // desktop
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                break;
        }
        
        setTimeout(function() {
            updateScreenSize();
            hideLoading();
        }, 500);
    }
    
    // --------------- ŞABLON SEÇİCİ ---------------
    
    // Şablon değiştirme
    templateSelector.addEventListener('change', function() {
        const demoUrl = this.value;
        const productUrl = this.options[this.selectedIndex].getAttribute('data-product');
        
        showLoading();
        iframe.src = demoUrl;
        productLink.href = productUrl;
    });
    
    // --------------- YENİLEME BUTONU ---------------
    
    // Iframe yenileme
    refreshBtn.addEventListener('click', function() {
        showLoading();
        iframe.src = iframe.src;
    });
    
    // --------------- KOD GÖRÜNTÜLEME ---------------
    
    // Kod butonu
    codeBtn.addEventListener('click', function() {
        showLoading();
        fetchSourceCode().then(() => {
            showTab(currentTab);
            codeModal.classList.add('show');
            hideLoading();
        }).catch(error => {
            console.error('Kaynak kod alınamadı:', error);
            hideLoading();
            alert('Kaynak kod alınamadı. Lütfen tekrar deneyin.');
        });
    })};
