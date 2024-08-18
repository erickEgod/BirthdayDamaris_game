import {createAnimations} from "../animations/animations.js"

export default class CasaJoel extends Phaser.Scene {
    constructor() {
        super({ key: 'CasaJoel' });
    }

    preload() {
        this.load.spritesheet(
            "damaris", //<--- id
            "assets/personajes/damaris.png",
            {frameWidth: 128, frameHeigth: 128} 
        )
         //Joel personaje
         this.load.spritesheet(
            "joel", //<--- id
            "assets/personajes/joel.png",
            {frameWidth: 192, frameHeigth: 192} 
        )

        this.load.audio("ricardo", "./assets/Música/ricardoArjona.mp3");
        this.load.audio("walk", "./assets/Música/sounds/walking.mp3");

        //importamos los sprites
        this.load.image("imgPiso", "./assets/escenarios/tiled/baldosaypared.png");
        this.load.image("imgMuebles", "./assets/escenarios/tiled/cosasDeCasa.png");
        this.load.image("imgSombra", "./assets/escenarios/tiled/sombra.png");
        this.load.image("imgCamas", "./assets/escenarios/tiled/camas.png");
        //importamos el mapa en formato json hecho en tiled
        //*ya deben tener los objetos de colisión

    this.load.tilemapTiledJSON("mapaPiso2", "./assets/escenarios/tiled/casaJoel.json");

    }

    create() {
        //Creo el mapa cargado
        let map = this.make.tilemap({key: "mapaPiso2"});

        //añado los tilesets (img)  ("nombre tile en tiled", "imagen del cual procede")
        let pisoTileset = map.addTilesetImage("baldosaypared", "imgPiso");
        let mueblesTileset = map.addTilesetImage("cosasDeCasa", "imgMuebles");
        let sombraTileset =map.addTilesetImage("sombra", "imgSombra");
        let camasTileset =map.addTilesetImage("camas", "imgCamas");
        let mueblesTileset2 = map.addTilesetImage("cosasDeCasa2", "imgMuebles");

        //creo las capas en orden ("nombre de la capa en tiled", variable tileset de arriba)
        let capaPiso = map.createLayer("capaPiso", [pisoTileset, sombraTileset, mueblesTileset]);
        let capaMuebles = map.createLayer("capaMuebles", [pisoTileset, mueblesTileset2, mueblesTileset, camasTileset]);
        let capaCompu = map.createLayer("capaCompu", [camasTileset, mueblesTileset2]);

        //--------------------------------------------------------------------------
        //!Para las colisiones
        // Obtener la capa de objetos desde el archivo JSON
        let objetosColision = map.getObjectLayer('capaColisiones').objects;
        let objetosInteraccion = map.getObjectLayer('capaInteracciones').objects;

        
        // Crear un grupo de colisiones
        this.colisiones = this.physics.add.staticGroup();
        this.interacciones = this.physics.add.staticGroup();

        // let prueba = this.physics.add.sprite(400,620, "prueba");
        // prueba.setOrigin(0,1)
        // prueba.setSize(64,64)
        // prueba.setVelocityX(-50);
        // Añadir los objetos con colisión
        
        for (let obj of objetosColision) {
            if (obj.properties.collides === true) {
                let colision = this.colisiones.create(obj.x, obj.y, null).setOrigin(0,0)
                .setSize(obj.width, obj.height).setOffset(20, 15).setVisible(false);
                // Ajuste necesario si el origen del objeto en Tiled está en la esquina inferior izquierda
                // Ajustar tamaño del colisionador
            } 
        }
        for (let obj of objetosInteraccion) {
            if (obj.properties.interaccion === true) {
                let interaccion = this.interacciones.create(obj.x, obj.y, null).setOrigin(0,0)
                .setSize(obj.width, obj.height).setOffset(20, 15).setVisible(false);
                // Ajuste necesario si el origen del objeto en Tiled está en la esquina inferior izquierda
                // Ajustar tamaño del colisionador
            } 
        }
    

        //-----------------------------------------------------------------------------------------------------
        //!personaje dámaris
        //este es la variable dámaris para que tenga fisicas y el sprite para las animaciones
        this.damaris = this.physics.add.sprite(1350, 400, "damaris").setOrigin(0,0).setScale(0.7).setOffset(0,10)
            .setSize(30, 50)
            .setCollideWorldBounds(true);  //para que no salga de las paredes del mundo
        //*Joel 
        this.joel = this.physics.add.sprite(200, 80, "joel").setFrame(1).setOrigin(0,0).setScale(0.5).setOffset(100,0)
        .setSize(30, 50);
        this.joel.body.immovable = true;
        //-------------------------------------------------------------------------------------------------
        //!añado las colisiones
        this.physics.add.collider(this.colisiones, this.damaris);
         
        function interactionJoel(joel){
            if (joel.alreadyInteracted) return; // Si ya se interactuó, no hacer nada

            joel.alreadyInteracted = true; // Marcar como interactuado
            this.bubble = this.add.graphics();
            this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
            this.bubble.fillRoundedRect(joel.x , joel.y - 50, 170, 70, 10); // ajustar posición y tamaño
        
            // Añadir el texto dentro de la burbuja
            this.message = this.add.text(joel.x , joel.y - 50, ` Hola mi amor \n Feliz cumpleaños \n de regalo te \n hice un juego`, {
            fontSize: '16px',
            fill: '#000'
            });
        
            //Opción para ocultar la burbuja después de un tiempo
            this.time.delayedCall(4000, () => { // 2 segundos de duración
            this.bubble.destroy(); // eliminar burbuja
            this.message.destroy(); // eliminar texto
            }, [], this);
            
        }

        
        function interactionPC (final) {
                this.sound.stopAll();
                this.scene.start('Computadora');          
        }


        //!añado las interacciones con personajes
        this.physics.add.collider(this.damaris, this.joel, interactionJoel, null, this);
        this.physics.add.collider(this.damaris, this.interacciones, interactionPC, null, this);
        //-------------------------------------------------------------------------------------------------
        //!Para las fisicas del mundo
        //para el limite del mundo
        this.physics.world.setBounds(0, 0, 1430, 800);
        //para movimiento de cámara
        this.cameras.main.setBounds(0, 0, 1430, 800);
        this.cameras.main.startFollow(this.damaris);
        

        //let graphics = this.add.graphics().setAlpha(0.75);
        //this.physics.world.createDebugGraphic(graphics);
    


        

        //!para las animaciones
        createAnimations(this);

        //Para que los pasos no se reproduzcan muy rápido----------------------------
        this.lastWalkSoundTime = 0;
       
        
        //para mover al personaje------------------------------------------
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        //música de fondo--------------------------------------------------
        this.sound.add("ricardo", {volume: 0.3}).play();
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
        
    }

    // Manejar el sonido de pasos
    let currentTime = this.time.now;
    if (currentTime - this.lastWalkSoundTime > 300) { // 300 ms de intervalo
        if (this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown || this.keys.down.isDown) {
            this.sound.add("walk", { volume: 1.2 }).play();
            this.lastWalkSoundTime = currentTime;
        }
    }
    }
}