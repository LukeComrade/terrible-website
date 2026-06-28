const messages = [
    "Apple cider vinegar",
    "I can't take it anymore",
    "Hey man",
    "Alive",
    "Something beautiful is going to happen",
    "Never say never",
    "HE SAID WHAT",
    "I am a cat",
    "and I'm doing cat stuff",
    "He said I'm annoying??",
    "That's funny dude",
    "I walked away from you",
    "I guess I'll just run away",
    "I don't want to talk to you",
    "You broke it again. Why do you do this to me?",
    "I-I'll fix it. See look! All good now.",
    "What's up everybody",
    "My name is ROBERT RANDALL.",
    "An unemployed engineer who has absolutely no life.",
    "All I ever wanted was someone to like me",
    "But I guess I'm too uncapable",
    "So what did I do instead?",
    "Become a shut in. Work on random stuff.",
    "Until I discoved... An anomaly.",
    "Shortly after. I met you.",
    "I wonder if it's a coincidence.",
    "If you were the cause of the anomaly, I'll probably let this world burn",
    "Because you're the only one I ever had.",
    "I think so too.",
    "I might genuinely be going crazy.",
    "I just wanna be happy.",
    "I wanna be loved.",
    "I wanna be accepted.",
    "This is what I am, I guess.",
    "This is ridiculous.",
    "It was like she missed him",
    "But he was a terrible person",
    "Or was he? I don't really remember anymore",
    "I wanna go home.",
    "I don't want to be this animal.",
    "What am I supposed to do here.",
    "I wish things would turn out better.",
    "Great things will happen soon.",
    "Crazy that I thought I would be happy.",
    "I don't want this life.",
    "Love yourself.",
    "Hey, do you wanna eat hummus?",
    "Life isn't what it should be.",
    "Why are things so unfair?",
    "I don't want to go yet.",
    "I want to stay.",
    "I don't love you anymore.",
    "I'm sure he's fine",
    "I'm sorry, I probably said what I shouldn't",
    "This is weird",
    "I ruined everything. I always do.",
    "Would you still love me?",
    "What will you do if I die tomorrow?",
    "I'll forget about you. Isn't this what you wanted?",
]
const files = [
    { path: "./images/yeah.jpg", type: "img" },
    { path: "./images/thumb/clark_illus.png", type: "img" },
    { path: "./images/thumb/chb.png", type: "img" },
    { path: "./images/something_troubling_you.png", type: "img" },
    { path: "./images/thumb/burningbuilding2.png", type: "img" },
    { path: "./images/thumb/at-the-end.png", type: "img" },
    { path: "./images/thumb/bowsers-revenge.jpg", type: "img" },
    { path: "./images/thumb/guy_in_my_dream.png", type: "img" },
    { path: "./images/thumb/harrier.jpg", type: "img" },
    { path: "./images/thumb/perfect.jpg", type: "img" },
    { path: "./images/thumb/stv.jpg", type: "img" },
    { path: "./images/thumb/thing.png", type: "img" },
    { path: "./images/thumb/montchiere_cologne_golden_cat_series.png", type: "img" },
    { path: "./images/thumb/poster_of_an_old_project.png", type: "img" },
    { path: "./images/thumb/cat_mouse_research.jpg", type: "img" },
    { path: "./images/bomb1.png", type: "img" }
]

const options = [messages, files]

const music_bank = [
    ["./audio/rainbg_windows.ogg", "windows"],
    ["./audio/rainbg_pillars.ogg", "pillars"],
    ["./audio/rainbg_bridges.ogg", "bridges"]
]
    

const color_bank = [
    "#da9240", "#bbcc5d", "#4fcf98", "#42b6d6", "#3a6cd8", "#db6bd1", "#dd6767",
]

const current_track_el = document.getElementById("current_track_m");

let selected_track_id = "";
let current_score = 0;
let best_score = 0;
let bgMusic;
let sfxvol = 0.3;
let musvol = 0.5;
let scoreDisplay;
let bestScoreDisplay;


// get random from array yaye wow
function getRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function handleElementClick(event) {
    const parent = event.currentTarget;
    const audio = document.createElement("audio");
    audio.src = "./audio/explosion.ogg";
    audio.autoplay = true;
    audio.volume = sfxvol;
    audio.addEventListener("ended", () => {
        audio.remove();
    });

    shakescreen();
    
    document.body.append(audio);
    parent.remove();

    if (parent.dataset.itemPath.includes("bomb")) {
        death();
    } else {
        current_score += 1;
    }

    if (current_score > best_score) {
        best_score = current_score;
        setCookie("best_score", best_score);
        bestScoreDisplay.textContent = `Best Score: ${best_score}`;
    }

    scoreDisplay.textContent = `Score: ${current_score}`;
}

function shakescreen() {
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'subtle_shake 1s';
    }, 10);
}


// IF SOMETHING BREAKS::::: it's not your fault anymore. It's up to god now
setInterval(() => {
    let type = Math.floor(Math.random() * options.length);
    let create = getRandomFrom(options[type]);
    let parent = document.createElement("div");
    let newElement = document.createElement(create.type ?? "p");

    newElement.style.userSelect = "none";
    newElement.style.webkitUserSelect = "none";
    newElement.style.mozUserSelect = "none";

    parent.dataset.itemPath = create.path;
    parent.dataset.itemType = create.type ?? "p";

    if (create.type == "audio") {
        newElement.setAttribute("controls", "");
    }
    parent.append(newElement);
    let left = Math.random() * document.body.clientWidth;
    
    if (create.type == "img") { 
        newElement.src = create.path;
        newElement.draggable = false;
    } else if (create.type == "audio") {
        newElement.src = create.path;
    } else {
        newElement.style.backgroundColor = color_bank[Math.floor(Math.random() * color_bank.length)];
        newElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
    
    document.body.append(parent);
    parent.classList.add("rain");
    parent.style.left = left + 'px';
    
    setTimeout(() => {
        parent.remove();
    }, 8500);

    parent.addEventListener("click", handleElementClick);
    parent.addEventListener("touchend", handleElementClick);
}, 600);

function getRandomBGTrack() {
    const track_id = Math.floor(Math.random() * music_bank.length)
    const track = music_bank[track_id][0];
    selected_track_id = track_id
    return track;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function setCookie(name, value) {
    const oneYear = 365 * 24 * 60 * 60;
    const cookieStr = `${name}=${encodeURIComponent(value)}; max-age=${oneYear}; path=/`;
    console.log("Setting cookie:", cookieStr);
    document.cookie = cookieStr;
    console.log("All cookies after set:", document.cookie);
}

function on_ready() {
    scoreDisplay = document.getElementById("score");
    bestScoreDisplay = document.getElementById("best-score");
    
    let savedScore = getCookie("best_score");
    if (savedScore !== null && !isNaN(savedScore)) {
        best_score = parseInt(savedScore);
        console.log("Loaded best_score from cookie:", best_score);
    }
    bestScoreDisplay.textContent = `Best Score: ${best_score}`;
    
    // mus
    bgMusic = document.createElement("audio");
    bgMusic.src = getRandomBGTrack();
    bgMusic.style.display = "none";
    bgMusic.loop = true;
    bgMusic.volume = musvol;
    document.body.appendChild(bgMusic);

    current_track_el.textContent = "Current Track: " + music_bank[selected_track_id][1];
    
    const startMusic = () => {
        bgMusic.play().then(() => {
            console.log("STARETAIF");
        }).catch(error => {
            console.log("OH NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:", error);
        });
    };

    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("touchend", startMusic, { once: true });
}

function death() {
    best_score = Math.max(best_score, current_score);
    setCookie("best_score", best_score);
    current_score = 0;
    bestScoreDisplay.textContent = `Best Score: ${best_score}`;
    scoreDisplay.textContent = `Score: ${current_score}`;
    
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'shake 0.2s';
    }, 10);
    
    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 610);
}

function onhome() {
    window.location.href = "index.html";
}

function onChangeVol(value) {
    bgMusic.volume = value;
    musvol = value;
}

function onChangeSFXVol(value) {
   sfxvol = value;
}

window.onload = () => on_ready();
window.onbeforeunload = () => {
    setCookie("best_score", best_score);
};