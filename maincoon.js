let cc = true;
let index = 0;



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

function playMEEEEE() {
    var audio = new Audio('./Project_68.mp3');
    audio.play();
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