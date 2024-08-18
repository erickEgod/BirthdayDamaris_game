import { createAnimations } from "../animations/animations.js"; //importamos las animaciones que creamos en animations.js
import {interactionDad} from "../interactions/interactionsDad.js"
import {interactionMom} from "../interactions/interactionsMom.js"
import {interactionSis} from "../interactions/interactionsSis.js"
import { interactionState3 } from "../interactions/interactionsSis.js";


export default class CasaDamaris extends Phaser.Scene{
    constructor(){
        super({key: "CasaDamaris"});
    }
    preload() {
        //dámaris personaje
        this.load.spritesheet(
            "damaris", //<--- id
            "assets/personajes/damaris.png",
            {frameWidth: 128, frameHeigth: 128} 
        )
        //papá dámaris personaje
        this.load.spritesheet(
            "papaD", //<--- id
            "assets/personajes/papaD.png",
            {frameWidth: 192, frameHeigth: 192} 
        )
         //mamá dámaris personaje
         this.load.spritesheet(
            "mamaD", //<--- id
            "assets/personajes/mamaD.png",
            {frameWidth: 192, frameHeigth: 192} 
        )
         //ñaña dámaris personaje
         this.load.spritesheet(
            "ñañaD", //<--- id
            "assets/personajes/ñañaD.png",
            {frameWidth: 192, frameHeigth: 192} 
        )
        

        this.load.audio("faltastu", "./assets/Música/faltastumorat.mp3");
        this.load.audio("julio", "./assets/Música/juliojaramillo.mp3");
        this.load.audio("walk", "./assets/Música/sounds/walking.mp3");
        
        this.load.image("polvo", "./assets/escenarios/tiled/polvo.png")
        this.load.image("rimel", "./assets/escenarios/tiled/rimel.png")
       
        this.load.image("gift1", "./assets/escenarios/tiled/labial.png");
        this.load.image("gift2", "./assets/escenarios/tiled/espejo.png");
        this.load.image("brillo", "./assets/escenarios/tiled/brillo.png");

        this.load.image("flecha", "./assets/escenarios/tiled/flecha.png");

        //importamos los sprites
        this.load.image("imgPiso", "./assets/escenarios/tiled/baldosaypared.png");
        this.load.image("imgMuebles", "./assets/escenarios/tiled/cosasDeCasa.png");
        this.load.image("imgCocina", "./assets/escenarios/tiled/cocina.png");
        this.load.image("imgCamas", "./assets/escenarios/tiled/camas.png");
        //importamos el mapa en formato json hecho en tiled
        //*ya deben tener los objetos de colisión
        
        this.load.tilemapTiledJSON("mapaPiso", "./assets/escenarios/tiled/casaDamaris.json");
    }

    create() {
        //
       
        //--------------------------------------------------------
        //Creo el mapa cargado
        let map = this.make.tilemap({key: "mapaPiso"});

        //añado los tilesets (img)  ("nombre tile en tiled", "imagen del cual procede")
        let pisoTileset = map.addTilesetImage("baldosaypared", "imgPiso");
        let mueblesTileset = map.addTilesetImage("cosasDeCasa", "imgMuebles");
        let cocinaTileset =map.addTilesetImage("cocina", "imgCocina");
        let camasTileset =map.addTilesetImage("camas", "imgCamas");

        //creo las capas en orden ("nombre de la capa en tiled", variable tileset de arriba)
        let capaPiso = map.createLayer("capaParedes", pisoTileset);
        let capaMuebles = map.createLayer("capaMuebles", [mueblesTileset, cocinaTileset, camasTileset]);
    
    //-------------------------------------------------------------------------
        //!Para las colisiones
        // Obtener la capa de objetos desde el archivo JSON
        let objetosColision = map.getObjectLayer('capaColisiones').objects;
        //salida
        let objetosInteraction= map.getObjectLayer('capaInteracciones').objects;
    
        // Crear un grupo de colisiones
        this.colisiones = this.physics.add.staticGroup();
        this.interacciones = this.physics.add.staticGroup();
       
        
        
        for (let obj of objetosColision) {
            if (obj.properties.collides === true) {
                let colision = this.colisiones.create(obj.x, obj.y, null).setOrigin(0,0)
                .setSize(obj.width, obj.height).setOffset(20, 15).setVisible(false);
                // Ajuste necesario si el origen del objeto en Tiled está en la esquina inferior izquierda
                // Ajustar tamaño del colisionador
            } 
        }
        for (let obj of objetosInteraction) {
            if (obj.properties.interaction === true) {
                let interaccion = this.interacciones.create(obj.x, obj.y, null).setOrigin(0,0)
                .setSize(obj.width, obj.height).setOffset(20, 15).setVisible(false);
                // Ajuste necesario si el origen del objeto en Tiled está en la esquina inferior izquierda
                // Ajustar tamaño del colisionador
            } 
        }
        
        
        //!PERSONAJES
        //*dámaris
        //este es la variable dámaris para que tenga fisicas y el sprite para las animaciones
        this.damaris = this.physics.add.sprite(1000, 550, "damaris").setOrigin(0,0).setScale(0.7).setOffset(100,0)
        .setSize(30, 50)
        .setCollideWorldBounds(true);  //para que no salga de las paredes del mundo
        //*Papá dámaris
        this.papaD = this.physics.add.sprite(140,880, "papaD").setOrigin(0,0).setScale(0.5).setOffset(100,0)
        .setSize(30, 50);
        this.papaD.body.immovable = true;
        //*mamá dámaris
        this.mamaD = this.physics.add.sprite(370, 150, "mamaD").setOrigin(0,0).setScale(0.5).setOffset(100,0)
        .setSize(30, 50);
        this.mamaD.body.immovable = true;
        //*ñaña dámaris
        this.sisD = this.physics.add.sprite(920, 950, "ñañaD").setOrigin(0,0).setScale(0.5).setOffset(100,0)
        .setSize(30, 50);
        this.sisD.body.immovable = true;
        console.log(interactionState3.completed)

        //!añado las colisiones
        this.physics.add.collider(this.colisiones, this.damaris);

        
            this.physics.add.collider(this.interacciones, this.damaris , ()=>{
                if (interactionState3.completed==true){
                this.sound.stopAll();
                this.scene.stop('CasaDamaris');
                this.scene.start('CasaJoel');
            }
            });
        
        
        //-------------------------------------------------
        //!añado las interacciones con personajes
        

        this.physics.add.collider(this.damaris, this.papaD, interactionDad, null, this); 
        this.physics.add.collider(this.damaris, this.mamaD, interactionMom, null, this);
        this.physics.add.collider(this.damaris, this.sisD, interactionSis, null, this);

        //-------------------------------------------------------------------------------------------------
        //!Para las fisicas del mundo
        //para el limite del mundo
        this.physics.world.setBounds(0, 0, 1120, 1150);
        //para movimiento de cámara
        this.cameras.main.setBounds(0, 0, 1120, 1150);
        this.cameras.main.startFollow(this.damaris);
        

        // let graphics = this.add.graphics().setAlpha(0.75);
        // this.physics.world.createDebugGraphic(graphics);
        

        //!para las animaciones
        createAnimations(this);


        this.lastWalkSoundTime = 0;
        //para mover al personaje
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        //música
        this.sound.add("faltastu", {volume: 0.05, loop:true}).play();
       //---------------------------------
        // Crear la zona de detección
         this.musicZone = this.add.zone(250, 890).setSize(400, 350);
         this.physics.world.enable(this.musicZone);
         this.musicZone.body.setAllowGravity(false);
         this.musicZone.body.setImmovable(true);
  
          // Cargar la pista de música
         this.backgroundMusic = this.sound.add('julio');
         this.backgroundMusic.setVolume(0.3);
          // Detectar la entrada en la zona
         this.physics.add.overlap(this.damaris, this.musicZone, this.playMusic, null, this);
      
 
    }

    update() {
            const speed = 175; //velocidad en px
        if (this.keys.left.isDown) {
            this.damaris.setVelocityX(-speed);
            this.damaris.flipX = true;
            this.damaris.anims.play("damaris-walk", true);
        } else if (this.keys.right.isDown) {
            this.damaris.setVelocityX(speed);
            this.damaris.flipX = false;
            this.damaris.anims.play("damaris-walk", true);
        } else {
            this.damaris.setVelocityX(0);
        }

        if (this.keys.up.isDown) {
            this.damaris.setVelocityY(-speed);
            this.damaris.anims.play("damaris-up", true);
        } else if (this.keys.down.isDown) {
            this.damaris.setVelocityY(speed);
            this.damaris.anims.play("damaris-down", true);
        } else {
            this.damaris.setVelocityY(0);
        }

        if (this.keys.L.isDown) {
            this.damaris.anims.play("damaris-cry", true); 
        }

        if (!this.keys.left.isDown && !this.keys.right.isDown && !this.keys.up.isDown && !this.keys.down.isDown && !this.keys.L.isDown) {
            this.damaris.anims.play("damaris-stop", true);
            //!animaciones personajes secundarios
            this.papaD.anims.play("papaD-stop", true);
            this.mamaD.anims.play("mamaD-stop", true);
        }

        // Manejar el sonido de pasos
        let currentTime = this.time.now;
        if (currentTime - this.lastWalkSoundTime > 300) { // 300 ms de intervalo
            if (this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown || this.keys.down.isDown) {
                this.sound.add("walk", { volume: 1.2 }).play();
                this.lastWalkSoundTime = currentTime;
            }
        }
        //música JULIO JARAMILLO
        if (!Phaser.Geom.Rectangle.Overlaps(this.damaris.getBounds(), this.musicZone.getBounds())) {
            this.pauseMusic();
        }
    }
    playMusic() {
        if (!this.musicPlaying) {
            this.backgroundMusic.resume(); // Reanudar si está pausada
            if (!this.backgroundMusic.isPlaying) {
                this.backgroundMusic.play({ loop: true }); // Iniciar la música si no está sonando
            }
            this.musicPlaying = true;
        }
    }

    // Función para pausar la música
    pauseMusic() {
        if (this.musicPlaying) {
            this.backgroundMusic.pause(); // Pausar la música en lugar de detenerla
            this.musicPlaying = false;
        }
    }

}