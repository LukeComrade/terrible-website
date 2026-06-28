const windowEl = document.getElementById('window');
const navbar = document.querySelector('.navbar');
let max_window_size = 200 
let isDragging = false;
let isResizing = false;
let startX, startY, startWidth, startHeight, startLeft, startTop;

navbar.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - windowEl.offsetLeft;
    startY = e.clientY - windowEl.offsetTop;
    document.body.style.cursor = 'move';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newLeft = e.clientX - startX;
        let newTop = e.clientY - startY;
        const maxLeft = window.innerWidth * 0.9;
        const maxTop = window.innerHeight * 0.64;
        newLeft = Math.max(-windowEl.offsetWidth/1.5, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));
        windowEl.style.left = newLeft + 'px';
        windowEl.style.top = newTop + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});

windowEl.addEventListener('mousedown', (e) => {
    if (e.target === windowEl || (e.target.tagName === 'DIV' && e.target.id === 'window')) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = windowEl.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        let newWidth = startWidth + (e.clientX - startX);
        let newHeight = startHeight + (e.clientY - startY);
        const max_screen_width = window.innerWidth - startLeft;
        const max_screen_height = window.innerHeight - startTop;
        const maxVwPixels = window.innerWidth * 0.90;
        const maxVhPixels = window.innerHeight * 0.75;
        const maxWidth = Math.min(max_screen_width, maxVwPixels);
        const maxHeight = Math.min(max_screen_height, maxVhPixels);

        newWidth = Math.max(400, Math.min(newWidth, maxWidth));
        newHeight = Math.max(300, Math.min(newHeight, maxHeight));

        windowEl.style.width = newWidth + 'px';
        windowEl.style.height = newHeight + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
});



function updateTime() {
    const timeEl = document.getElementById('taskbar_time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function centerWindow() {
    const desktopContainer = document.getElementById('desktop-environment') || windowEl.parentElement;
    
    const containerWidth = desktopContainer.clientWidth;
    let containerHeight = desktopContainer.clientHeight;
    
    containerHeight -= 80;
    
    
    let new_width;
    let new_height;

    if (window.matchMedia("(pointer: coarse)").matches) {
        new_width = containerWidth * 0.85;
        new_height = containerHeight * 0.75;
    } else {
        new_width = containerWidth * 0.75;
        new_height = containerHeight * 0.85;

        if (new_width > new_height * 1.6) {
            new_width = new_height * 1.5;
        }
    }
    
    windowEl.style.width = new_width + 'px';
    windowEl.style.height = new_height + 'px';

    const windowWidth = windowEl.offsetWidth;
    const windowHeight = windowEl.offsetHeight;

    const left = (containerWidth - windowWidth) / 2;
    const top = (containerHeight - windowHeight) / 2;

    windowEl.style.left = left + 'px';
    windowEl.style.top = top + 'px';
}

setInterval(updateTime, 500);
updateTime();
centerWindow();
