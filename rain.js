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
]
const files = [
    { path: "./yeah.jpg", type: "img" },
    { path: "./art/chb.png", type: "img" },
    { path: "./art/burningbuilding2.png", type: "img" },
    { path: "./art/at-the-end.png", type: "img" },
    { path: "./art/bowsers-revenge.jpg", type: "img" },
    { path: "./art/harrier.jpg", type: "img" },
    { path: "./art/perfect.jpg", type: "img" },
    { path: "./art/stv.jpg", type: "img" },
    { path: "./art/poster_of_an_old_project.png", type: "img" },
    { path: "./art/cat_mouse_research.jpg", type: "img" }
]
const options = [messages, files]
setInterval(() => {
    let type = Math.floor(Math.random() * options.length)
    let create = options[type][Math.floor(Math.random() * options[type].length)]
    let parent = document.createElement("div");
    let newElement = document.createElement(create.type ?? "p")
    if (create.type == "audio") {
        newElement.setAttribute("controls", "")
    }
    parent.append(newElement)
    let left = (Math.random() * document.body.clientWidth);
    if (create.type == "img") { 
        newElement.src = create.path;
    } else if (create.type == "audio") {
        newElement.src = create.path;
    } else {
        newElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
    document.body.append(parent)
    parent.classList.add("rain");
    parent.style.left = left + 'px';
    setTimeout(() => {
        parent.remove();
    }, 8500);
    parent.onclick = () => {
        const audio = document.createElement("audio")
        audio.src = "./explosion.mp3"
        audio.setAttribute("autoplay", "")
        document.body.append(audio)
        parent.remove()
    }
}, 1000);
