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
    "I don't want to talk to you",
    "What's up everybody",
    "My name is ROBERT RANDALL.",
    "An unemployed engineer who has absolutely no life.",
    "I think so too.",
    "I might genuinely be going crazy.",
    "I just wanna be happy.",
    "I wanna be loved.",
    "I wanna be accepted.",
    "This is what I am, I guess.",
    "This is ridiculous.",
    "I wanna go home.",
    "I don't want to be this animal.",
    "What am I supposed to do here."
]
const files = [
    { path: "./yeah.jpg", type: "img" },
    { path: "./images/chb.png", type: "img" },
    { path: "./images/burningbuilding2.png", type: "img" },
    { path: "./images/at-the-end.png", type: "img" },
    { path: "./images/bowsers-revenge.jpg", type: "img" },
    { path: "./images/harrier.jpg", type: "img" },
    { path: "./images/perfect.jpg", type: "img" },
    { path: "./images/stv.jpg", type: "img" },
    { path: "./images/poster_of_an_old_project.png", type: "img" },
    { path: "./images/cat_mouse_research.jpg", type: "img" },
    { path: "./images/bomb1.png", type: "img" }
]

const options = [messages, files]

const color_bank = [
    "#da9240", "#bbcc5d", "#4fcf98", "#42b6d6", "#3a6cd8", "#db6bd1", "#dd6767",
]

let current_score = 0;
let best_score = 0;
let bgMusic;
let sfxvol = 0.5;
let musvol = 0.5;

setInterval(() => {
    let type = Math.floor(Math.random() * options.length)
    let create = options[type][Math.floor(Math.random() * options[type].length)]
    let parent = document.createElement("div");
    let newElement = document.createElement(create.type ?? "p")

    newElement.userSelect = "none";
    newElement.webkitUserSelect = "none";
    newElement.mozUserSelect = "none";

    parent.dataset.itemPath = create.path;
    parent.dataset.itemType = create.type ?? "p";


    if (create.type == "audio") {
        newElement.setAttribute("controls", "")
    }
    parent.append(newElement)
    let left = (Math.random() * document.body.clientWidth);
    if (create.type == "img") { 
        newElement.src = create.path;
        newElement.draggable = false;
    } else if (create.type == "audio") {
        newElement.src = create.path;
    } else {
        newElement.style.backgroundColor = color_bank[Math.floor(Math.random() * color_bank.length)];
        newElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
    document.body.append(parent)
    parent.classList.add("rain");
    parent.style.left = left + 'px';
    setTimeout(() => {
        parent.remove();
    }, 8500);

    const handleClick = () => {
        const audio = document.createElement("audio")
        audio.src = "./audio/explosion.mp3"
        audio.setAttribute("autoplay", "")
        audio.volume = sfxvol;
        audio.addEventListener("ended", () => {
            audio.remove();
        });
        
        document.body.append(audio)
        parent.remove()

        if (parent.dataset.itemPath.includes("bomb")) {
            death();
        } else {
            current_score += 1;
        }

        if (current_score > best_score) {
            // const oldBest = best_score;
            best_score = current_score;
            setCookie("best_score", best_score);
            document.getElementById("best-score").textContent = `Best Score: ${best_score}`;
        }

        document.getElementById("score").textContent = `Score: ${current_score}`;
    };

    parent.addEventListener("click", handleClick);
    parent.addEventListener("touchend", handleClick);
}, 600);

function getCookie(name) {
    const cookies = document.cookie.split(";");
    let highestValue = null;
    let duplicates = [];
    
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
            const decodedValue = decodeURIComponent(value);
            const numValue = parseInt(decodedValue);
            
            if (!isNaN(numValue)) {
                duplicates.push(numValue);
                if (highestValue === null || numValue > highestValue) {
                    highestValue = numValue;
                }
            }
        }
    }
    
    // check dup
    if (duplicates.length > 1) {
        setCookie(name, highestValue);
    }
    
    return highestValue !== null ? highestValue.toString() : null;
}

function setCookie(name, value) {
    const oneYear = 365 * 24 * 60 * 60;
    const cookieStr = `${name}=${encodeURIComponent(value)}; max-age=${oneYear}; path=/`;
    console.log("Setting cookie:", cookieStr);
    document.cookie = cookieStr;
    console.log("All cookies after set:", document.cookie);
}

function on_ready() {
    let savedScore = getCookie("best_score");
    if (savedScore !== null && !isNaN(savedScore)) {
        best_score = parseInt(savedScore);
        console.log("Loaded best_score from cookie:", best_score);
    }
    document.getElementById("best-score").textContent = `Best Score: ${best_score}`;
    
    // mus
    bgMusic = document.createElement("audio");
    bgMusic.src = "./audio/project_78.mp3";
    bgMusic.style.display = "none";
    bgMusic.loop = true;
    bgMusic.volume = musvol;
    document.body.appendChild(bgMusic);
    

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
    document.getElementById("best-score").textContent = `Best Score: ${best_score}`;
    document.getElementById("score").textContent = `Score: ${current_score}`;
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