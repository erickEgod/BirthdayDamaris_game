//phaser es global


import CasaJoel from "./scenes/casaJoel.js"
import CasaDamaris from "./scenes/casaDamaris.js";

import Computadora from "./scenes/computadora.js";
import UltimaEscena from "./scenes/ultimaEscena.js";
import Intro from "./scenes/intro.js";
//!Siempre se inicia la configuración
const config = {
    type: Phaser.AUTO, //en donde se renderiza
    width: 700,
    height: 500,
    backgroundColor: "#D9D99B",
    parent: "game", //en que id del html va a estar
    physics: {  //crear las físicas
        default: "arcade",
        arcade:{
            debug: false,
        }
    },
    scene:[Intro,CasaDamaris, CasaJoel, Computadora, UltimaEscena ]
}

//!Inicializo el juego con las configuraciones
new Phaser.Game(config);



