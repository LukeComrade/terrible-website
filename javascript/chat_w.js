const chatWindow = document.getElementById('chat-window');
const logg_bank = log_bank || {};


let message_bank = []
let latest_key = "0"
let current_key = "0";
let current_message_index = 0;
// const msg_log_data_url = './data/msg_log.js';

function on_ready() {
    get_set_latest_log();
    set_selector();

    message_bank = logg_bank[latest_key].message_bank;
    // console.log(latest_key);
}
 
function set_selector() {
    const selector = document.getElementById('log_selector');
    selector.innerHTML = '';

    Object.keys(logg_bank).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.text = logg_bank[key].profile_name || `Log ${key}`;
        selector.appendChild(option);
    });

    current_key = latest_key;
    selector.value = current_key;
}

function get_set_latest_log() {
    latest_key = Object.keys(logg_bank).reduce((max, key) => {
    const num = parseInt(key);
    const maxNum = parseInt(max);
    return num > maxNum ? key : max;
    }, Object.keys(logg_bank)[0]);
}


function change_log() {
    const selector = document.getElementById('log_selector');
    const selected_key = selector.value;
    if (logg_bank[selected_key]) {
        current_key = selected_key;
        message_bank = logg_bank[current_key].message_bank;
        current_message_index = 0;
        chatWindow.innerHTML = '';
    } else {
        console.error('Selected log not found:', selected_key);
    }
}

function display_new_message() {
    if (current_message_index < message_bank.length) {
        displayMessage(message_bank[current_message_index]);
        current_message_index += 1;
    } else {
        displayMessage("SYSTEM: END");
    }
}

function displayMessage(msg) {
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const msgDiv = document.createElement('div');
    
    const isSystem = msg.startsWith("SYSTEM:");
    
    if (isSystem) {
        msgDiv.className = 'system-msg'; 
        msgDiv.innerHTML = `${msg}`;
    } else {
        msgDiv.className = 'container';
        
        const isImage = msg.match(/\.(jpeg|jpg|gif|png|webp)$/) != null || msg.includes('text=');
        const isAudio = msg.match(/\.(mp3|wav|ogg|m4a)$/) != null;
        // const isNameChange = msg.startsWith("namename:"); // update the display name later

        if (isAudio) {
            msgDiv.innerHTML = `<audio controls><source src="${"./audio/" +msg}"></audio>`;
        } else if (isImage) {
            msgDiv.innerHTML = `<img src="${"./images/" +msg}" class="chat-img">`;
        } 
        else {
            msgDiv.innerHTML = `<p>${msg}</p>`;
        }
        
        msgDiv.innerHTML += `<span class="time-right">${time}</span><div style="clear:both;"></div>`;
    }
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.onload = () => on_ready();