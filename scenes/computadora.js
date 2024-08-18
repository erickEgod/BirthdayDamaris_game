export default class Computadora extends Phaser.Scene {
    constructor() {
        super({ key: 'Computadora' });
    }

    preload() {
        // Aquí puedes cargar recursos si es necesario
    }

    create() {
        // Configurar fondo de pantalla
        this.cameras.main.setBackgroundColor('#3b99e7'); // Fondo negro
        
        // Añadir texto en toda la pantalla
        this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            `Entonces la cumpleañera jugó el juego que su novio con mucho esfuerzo y amor le programó`, 
            { 
                fontSize: '30px', 
                fill: '#ffffff',
                align: 'center',
                wordWrap: { width: 600 },
            }
        ).setOrigin(0.5, 0.5); // Centrar el texto en la pantalla
        
        // Opcional: Añadir temporizador para cambiar de escena después de un tiempo
        this.time.delayedCall(5000, () => {
            this.scene.start('UltimaEscena'); // Cambiar a la escena principal después de 5 segundos
        });
    }

    update() {
        // Aquí puedes agregar lógica de actualización si es necesario
    }
}

// Exportar la escena para usarla en tu juego
