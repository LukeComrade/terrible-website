let cc = true;
let index = 0;
let sprite_timer_thingy = null;

let dog_cat_current_score = 0;
let audio_main;
let audio_sfx;

const only_reasonable_person_in_this_website = [
    "",
    ""
]

const welcome_word_bank = [
        "Welcome",
        "Bienvenido",
        "Bienvenue",
        "Willkommen",
        "Benvenuto",
        "ようこそ",
        "환영합니다",
        "欢迎",
        "Добро пожаловать",
        "स्वागत है",
        "Bem-vindo",
        "Welkom",
        "Karibu",
        "أهلا وسهلا بك",
        "Selamat datang",
        "Tervetuloa",
        "Vitajte",
        "Witamy",
        "Καλώς ήρθατε",
        "Velkommen",
        "Meow",
        "Mrrow"
        ]
        
const color_bank = [
    "#F4E9CD", "#77ACA2", "#468189", "#031926"
]

const color_bank_2 = [
    "#da9240", "#bbcc5d", "#4fcf98", "#42b6d6", "#3a6cd8", "#db6bd1", "#dd6767",
]

const winblows_iframe = document.getElementById("winblows_iframe");
const taskbar_track_name = document.getElementById("current_track");
const taskbar_stop_button = document.querySelector(".stop_that_awful_song");

let mus_vol = 0.5;
let sfx_vol = 0.3;

function play_track(track) {
    if (audio_main) {
        audio_main.pause();
        
    } else {
        audio_main = new Audio();
    }
    audio_main.volume = mus_vol
    audio_main.src = track;
    audio_main.play();
    taskbar_stop_button.setAttribute("track_playing", "true");

    audio_main.addEventListener("ended", () => {
        taskbar_track_name.textContent = "None";
        taskbar_stop_button.setAttribute("track_playing", "false");
    }, { once: false});

    taskbar_track_name.textContent = track.split('/').pop();
}

function play_sound(soundfx) {
    if (audio_sfx) {
        audio_sfx.pause();
        
    } else {
        audio_sfx = new Audio();
    }
    audio_sfx.volume = sfx_vol
    audio_sfx.src = soundfx;
    audio_sfx.play();
}

function onMusChangeVol(volume) {
    mus_vol = volume
    if (audio_main) {
        audio_main.volume = mus_vol;
    }
}

function onSfxChangeVol(volume) {
    sfx_vol = volume
    if (audio_sfx) {
        audio_sfx.volume = sfx_vol;
    }
}

function stop_that_awful_song() {
    if (audio_main) {
        audio_main.pause();
        audio_main.currentTime = 0;
    }
    taskbar_track_name.textContent = "None";
    taskbar_stop_button.setAttribute("track_playing", "false");
}

function playMEEEEE() {
    play_track('./audio/Project_68.mp3');
    
}

function dogcat_petting_machine_clicky() {
    if (sprite_timer_thingy) {
        clearTimeout(sprite_timer_thingy);
    }

    dog_cat_current_score += 1;

    var dog_cat_el = document.getElementsByClassName("dogcat_petting_machine")[0]
    var dog_cat_viewport_el = document.getElementsByClassName("dog_cat_viewport_wait_huhuh")[0];
    var button = document.querySelector(".dogcat_petting_machine_titlebar button");

    dog_cat_viewport_el.style.filter = `drop-shadow(0 8px 16px ${color_bank_2[[Math.floor(Math.random() * color_bank_2.length)]]})`;
    dog_cat_el.style.outline = `2px solid ${color_bank_2[[Math.floor(Math.random() * color_bank_2.length)]]}`;
    

    if (dog_cat_current_score > 10) {
        if (audio_main == null) {
            play_track('./audio/dog_cat_means_we_love_you.ogg');
            console.log("Playing dog_cat_means_we_love_you.ogg from 1");
        } else {

        if (audio_main.ended === true || audio_main.src.split('/').pop() !== 'dog_cat_means_we_love_you.ogg') {
            play_track('./audio/dog_cat_means_we_love_you.ogg');
            console.log("Playing dog_cat_means_we_love_you.ogg from 2");
        }
    }} else if (dog_cat_current_score > 100) {
        dog_cat_viewport_el.setAttribute('data-animation', 'crazy_clicky');

        // const link = document.createElement('a');
        // link.href = './data/iloveyou.zip';
        // link.download = 'iloveyou.zip';
        // document.body.appendChild(link); // Fixes Firefox & Safari issues
        // link.click();
        // document.body.removeChild(link);  // Cleans up the page
        // console.log("Download initiated for msg_log.js");
    }
    
    if (button.dataset.state === "to-cat") {
        dog_cat_viewport_el.src = "images/ultra_crazy_dog_with_INSANE_magic_powers_happy.gif";
        play_sound("./audio/bark.ogg");
    } else {
        dog_cat_viewport_el.src = "images/ultra_crazy_cat_with_INSANE_magic_powers_happy.gif";
        play_sound("./audio/meow.ogg");
    }
    
    sprite_timer_thingy = setTimeout(function() {
        if (button.dataset.state === "to-cat") {
            dog_cat_viewport_el.src = "images/ultra_crazy_dog_with_INSANE_magic_powers_breathing.gif";
        } else {
            dog_cat_viewport_el.src = "images/ultra_crazy_cat_with_INSANE_magic_powers_breathing.gif";
        }
        
        sprite_timer_thingy = null;
        dog_cat_viewport_el.removeAttribute('data-animation');
        dog_cat_el.style.outline = `2px solid #9DBEBB`;
        dog_cat_viewport_el.style.filter = `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))`;
    }, 10000);
}

function dogcat_petting_machine_switch() {
    console.log("Switching...");
    var button = document.querySelector(".dogcat_petting_machine_titlebar button");
    var img = document.querySelector(".dog_cat_viewport_wait_huhuh");
    var text = document.querySelector(".dogcat_petting_machine_titlebar p");

    play_sound("./audio/switcharoo.ogg")
    if (button.dataset.state === "to-cat") {
        button.dataset.state = "to-dog";
        text.textContent = "CAT PETTING MACHINE™";
        img.src = "images/ultra_crazy_cat_with_INSANE_magic_powers_breathing.gif";
    } else {
        button.dataset.state = "to-cat";
        text.textContent = "DOG PETTING MACHINE™";
        img.src = "images/ultra_crazy_dog_with_INSANE_magic_powers_breathing.gif";
    }
}

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

setInterval(
    function() {
        // if (index2 == only_reasonable_person_in_this_website.length - 1) {
        // index2 = 0;} 
        
        
        // if (cc == true) {
        //     writeTextToActually(annoying_stoner_cat[index]);
        //     index += 1;
        //     console.log(annoying_stoner_cat[index]);
        // }

        // if (cc == true) {
        //     writeTextTogood(only_reasonable_person_in_this_website[index2]);
        //     index += 1;
        //     console.log(only_reasonable_person_in_this_website[index2]);
        // }

        let randomInt = Math.floor(Math.random() * 22);

        document.getElementById("welcome_text").innerHTML = welcome_word_bank[randomInt] + " to... uh, to this place?"
    }, 1000
    
)

    async function writeTextToActually(string) {
        document.getElementById("actuallyactually").innerHTML = "";
        cc = false
        for (let i = 0; i < string.length;) {
            document.getElementById("actuallyactually").innerHTML += string.charAt(i);
            i++;
            
            await delay(50);
            
        }
        cc = true;
    }