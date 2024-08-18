export default class Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'Intro' });
    }

    preload() {
        // Puedes cargar aquí cualquier recurso necesario
    }

    create() {
        // Añadir el texto del título en el centro de la pantalla
        this.titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY -150, 'Cumpleaños 26', {
            fontSize: '48px',
            fill: '#f00',
            fontFamily: 'Times New Roman',
            wordWrap: { width: 600 },
        }).setOrigin(0.5);
       
        this.objetivo = this.add.text(this.cameras.main.centerX , this.cameras.main.centerY-50, `Es 18 de Agosto y Dámaris quiere
ir donde su novio, sin embargo, tiene que cumplir ciertas tareas antes de poder irse.`, {
            fontSize: '30px',
            fill: '#000',
            wordWrap: { width: 600 },
            fontFamily: 'Georgia'
        }).setOrigin(0.5);

        this.instrucciones = this.add.text(this.cameras.main.centerX , this.cameras.main.centerY+60, `Utiliza las teclas de dirección (flechas) para moverte por el mapa.
Dirígete a los miembros de la casa y te pondrán tareas.`, {
            fontSize: '20px',
            fill: '#000',
            wordWrap: { width: 600 },
            fontFamily: 'Courier New'
        }).setOrigin(0.5);
        

        // Añadir un texto indicando que presionen Enter para comenzar
        this.startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'Presiona Enter para comenzar', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Detectar la tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Al presionar Enter, cambiar de escena
        this.enterKey.on('down', () => {
            this.scene.start('CasaDamaris'); // Cambia a la escena principal del juego
        });
    }
}