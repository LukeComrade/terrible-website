let cc = true;
let index = 0;
let sprite_timer_thingy = null;

let dog_cat_score = 0;
let audio_main;

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


function playMEEEEE() {
    if (audio_main) {
        audio_main.pause();
        
    } else {
        audio_main = new Audio();
    }
    audio_main.src = './audio/Project_68.mp3';
    audio_main.play();
}

function dogcat_petting_machine_clicky() {
    if (sprite_timer_thingy) {
        clearTimeout(sprite_timer_thingy);
    }

    dog_cat_score += 1;

    document.getElementsByClassName("dog_cat_viewport_wait_huhuh")[0].style.filter = `drop-shadow(0 8px 16px ${color_bank_2[[Math.floor(Math.random() * color_bank_2.length)]]})`;

    if (dog_cat_score == 10) {
        if (audio_main) {
            audio_main.pause();
            
        } else {
            audio_main = new Audio();
        }
        audio_main.src = './audio/dog_cat_means_we_love_you.ogg';
        audio_main.play();


        // document.getElementById("dog_cat_score").innerHTML = "100";

        dog_cat_means_we_love_you.ogg
        // const link = document.createElement('a');
        // link.href = './data/iloveyou.zip';
        // link.download = 'iloveyou.zip';
        // document.body.appendChild(link); // Fixes Firefox & Safari issues
        // link.click();
        // document.body.removeChild(link);  // Cleans up the page
        // console.log("Download initiated for msg_log.js");

    }
    
    document.getElementsByClassName("dog_cat_viewport_wait_huhuh")[0].src = "images/ultra_crazy_dog_with_INSANE_magic_powers_happy.gif";
    
    sprite_timer_thingy = setTimeout(function() {
        document.getElementsByClassName("dog_cat_viewport_wait_huhuh")[0].src = "images/ultra_crazy_dog_with_INSANE_magic_powers_breathing.gif";
        sprite_timer_thingy = null;
    }, 10000);
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