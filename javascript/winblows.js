const windowEl = document.getElementById('window');
const navbar = document.querySelector('.navbar');
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
        const maxLeft = window.innerWidth - windowEl.offsetWidth;
        const maxTop = window.innerHeight - windowEl.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
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
    if (e.target === windowEl || e.target.tagName === 'DIV' && e.target.id === 'window') {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = windowEl.offsetWidth;
        startHeight = windowEl.offsetHeight;
        startLeft = windowEl.offsetLeft;
        startTop = windowEl.offsetTop;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        let newWidth = startWidth + (e.clientX - startX);
        let newHeight = startHeight + (e.clientY - startY);
        const maxWidth = window.innerWidth - startLeft;
        const maxHeight = window.innerHeight - startTop;
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
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let new_width = viewportWidth
    let new_height = viewportHeight * 0.78
    let offset_y = 50;

    if (window.matchMedia("(pointer: coarse)").matches) {
        new_width = viewportWidth /1.1
        new_height = viewportHeight * 0.78 / 2.5
        offset_y = 300
    } else {
        new_width = viewportWidth / 2
        new_height = viewportHeight * 0.78 / 1.2
        offset_y = 50
    }
    

    windowEl.style.width = new_width + 'px';
    windowEl.style.height = new_height + 'px';


    const windowWidth = windowEl.offsetWidth;
    const windowHeight = windowEl.offsetHeight;

    const left = (viewportWidth - windowWidth) / 2;
    const top = ((viewportHeight - windowHeight) / 4) - offset_y;

    windowEl.style.left = left + 'px';
    windowEl.style.top = top + 'px';

}


setInterval(updateTime, 500);
updateTime();
centerWindow();
