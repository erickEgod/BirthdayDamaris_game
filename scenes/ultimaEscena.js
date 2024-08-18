import {createAnimations} from "../animations/animations.js"

export default class UltimaEscena extends Phaser.Scene {
    constructor() {
        super({ key: 'UltimaEscena' });
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

    
    this.load.tilemapTiledJSON("mapaPiso3","./assets/escenarios/tiled/ultimaEscena.json");

    }

    create() {
        //Creo el mapa cargado
        let map1 = this.make.tilemap({key: "mapaPiso3"});

        //añado los tilesets (img)  ("nombre tile en tiled", "imagen del cual procede")
        let pisoTileset3 = map1.addTilesetImage("baldosaypared", "imgPiso");
        let mueblesTileset3 = map1.addTilesetImage("cosasDeCasa", "imgMuebles");
        let sombraTileset3 =map1.addTilesetImage("sombra", "imgSombra");
        let camasTileset3 =map1.addTilesetImage("camas", "imgCamas");
        let mueblesTileset4 = map1.addTilesetImage("cosasDeCasa2", "imgMuebles");

        //creo las capas en orden ("nombre de la capa en tiled", variable tileset de arriba)
        let capaPiso = map1.createLayer("capaPiso", [pisoTileset3, sombraTileset3, mueblesTileset3]);
        let capaMuebles = map1.createLayer("capaMuebles", [pisoTileset3, mueblesTileset4, mueblesTileset3, camasTileset3]);
        let capaCompu = map1.createLayer("capaCompu", [camasTileset3, mueblesTileset4]);

        //--------------------------------------------------------------------------
        //!Para las colisiones
        // Obtener la capa de objetos desde el archivo JSON
        let objetosColision = map1.getObjectLayer('capaColisiones').objects;
        let objetosInteraccion = map1.getObjectLayer('capaCumpleaños').objects;

        
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
        this.damaris = this.physics.add.sprite(50, 150, "damaris").setOrigin(0,0).setScale(0.7).setOffset(0,10)
            .setSize(30, 50)
            .setCollideWorldBounds(true);  //para que no salga de las paredes del mundo
        //*Joel 
        this.joel = this.physics.add.sprite(250, 200, "joel").setFrame(1).setOrigin(0,0).setScale(0.5).setOffset(100,0)
        .setSize(30, 50);
        this.joel.body.immovable = true;
        //-------------------------------------------------------------------------------------------------
        //!añado las colisiones
        this.physics.add.collider(this.colisiones, this.damaris);
         
        function ultima (damaris){
            this.disableMovement = true;
            this.bubble = this.add.graphics();
            this.bubble.fillStyle(0xaabbff, 1); // color blanco con opacidad 1
            this.bubble.fillRoundedRect(damaris.x +100, damaris.y - 50, 260, 120, 10); // ajustar posición y tamaño
        
            // Añadir el texto dentro de la burbuja
            this.message = this.add.text(damaris.x +110, damaris.y - 50, `¡Feliz cumpleaños mi amor, \nespero que este pequeño 
presente junto con el \njuego te hayan gustado. \nDisfrute mucho de su \ndía tan especial!
Sabe que la amo muchísimo.`, {
            fontSize: '16px',
            fill: '#000'
            });
        }

        //!añado las interacciones con personajes
        
        this.physics.add.collider(this.damaris, this.interacciones, ultima, null, this);
        //-------------------------------------------------------------------------------------------------
        //!Para las fisicas del mundo
        //para el limite del mundo
        this.physics.world.setBounds(0, 0, 1430, 800);
        //para movimiento de cámara
        this.cameras.main.setBounds(0, 0, 1430, 800);
        this.cameras.main.startFollow(this.damaris);
        

        //let graphics = this.add.graphics().setAlpha(0.75);
       // this.physics.world.createDebugGraphic(graphics);
    


        

        //!para las animaciones
        createAnimations(this);

        this.bubble = this.add.graphics();
        this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
        this.bubble.fillRoundedRect(this.joel.x , this.joel.y - 50, 155, 50, 10); // ajustar posición y tamaño

        // Añadir el texto dentro de la burbuja
        this.message = this.add.text(this.joel.x , this.joel.y - 50, `¡Ven mi amor \ntenga su pastel!`, {
        fontSize: '16px',
        fill: '#000',
        });

        //Opción para ocultar la burbuja después de un tiempo
        this.time.delayedCall(3000, () => { // 3 segundos de duración
            this.bubble.destroy(); // eliminar burbuja
            this.message.destroy(); // eliminar texto
        }, [], this);


        //Para que los pasos no se reproduzcan muy rápido----------------------------
        this.lastWalkSoundTime = 0;
        
        //para mover al personaje------------------------------------------
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        //música de fondo--------------------------------------------------
        this.sound.add("ricardo", {volume: 0.1}).play();
    }



    update() {
        const speed = 200; //velocidad en px
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