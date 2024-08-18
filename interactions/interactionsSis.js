import { interactionState2 } from "./interactionsMom.js";

export function interactionSis(damaris, sisD) {
    if (interactionState2==false) return;
        if(interactionState2.completed2){
            if (sisD.alreadyInteracted) return; // Si ya se interactuó, no hacer nada

                sisD.alreadyInteracted = true; // Marcar como interactuado
    

    //!creación de burbuja y texto
    
    this.bubble = this.add.graphics();
    this.bubble.fillStyle(0xffffff, 1); // Color blanco con opacidad 1
    this.bubble.fillRoundedRect(sisD.x -70, sisD.y - 80, 240, 220, 10); // Ajustar posición y tamaño

    // Añadir el texto dentro de la burbuja
    this.message = this.add.text(sisD.x -50, sisD.y - 80, `  Ñaña, ayúdame \na recordar lo que \nsigue de esta canción
        \n "Give your heart \nand soul to me and \nlife will always be.."
        `, {
        fontSize: '16px',
        fill: '#000'
    });

    // Añadir opciones de respuesta
    let option1 = this.add.text(sisD.x -50, sisD.y + 50, '1. come around a talk', { fontSize: '16px', fill: '#000' }).setInteractive();
    let option2 = this.add.text(sisD.x -50, sisD.y + 70, '2. just dance', { fontSize: '16px', fill: '#000' }).setInteractive();
    let option3 = this.add.text(sisD.x -50, sisD.y + 90, '3. la vie en rose', { fontSize: '16px', fill: '#000' }).setInteractive();
    let option4 = this.add.text(sisD.x -50, sisD.y + 110, '4. vive la vida loca', { fontSize: '16px', fill: '#000' }).setInteractive();

    // Configurar las respuestas
    option3.on('pointerdown', () => {
        this.bubble.destroy(); // Eliminar burbuja
        this.message.destroy();
        option1.destroy();
        option2.destroy();
        option3.destroy();
        option4.destroy();
        //*Mensaje de agradecimiento
        this.bubble = this.add.graphics();
        this.bubble.fillStyle(0xffffff, 1); // Color blanco con opacidad 1
        this.bubble.fillRoundedRect(sisD.x -30, sisD.y - 50, 200, 50, 10); // Ajustar posición y tamaño
         this.message = this.add.text(sisD.x -30, sisD.y - 50, ` Gracias ñaña, \n en el baño \n te dejé un regalo`, {
        fontSize: '16px',
        fill: '#000'
        

        });
        let brillo = this.physics.add.sprite(1000, 450, 'brillo').setDisplaySize(50, 50); // Cambia las coordenadas (500, 500) a la posición deseada
        brillo.setImmovable(true); // Para que no se mueva
        brillo.setData('collected', false);

        this.giftCount = 0;
    //función que hacer en colisión
    function collectGift(damaris, gift) {
        // Verificar si la basura ya ha sido recogida
        if (!brillo.getData('collected')) {
            brillo.setData('collected', true); // Marcar la basura como recogida
            brillo.disableBody(true, true); // Recoger la basura y eliminarla del mapa
            this.giftCount += 1; // Incrementar el contador de basura recogida
           
            // Verificar si se ha recogido toda la basura
            if (this.giftCount === 1) {
                this.completed = false;
                //nueva burbuja de finalización
                this.bubble = this.add.graphics();
                this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
                this.bubble.fillRoundedRect(damaris.x -200, damaris.y +180, 200, 40, 10); // ajustar posición y tamaño

                // Añadir el texto dentro de la burbuja
                this.message = this.add.text(damaris.x -195, damaris.y + 185, ` Ya puedes salir`, {
                fontSize: '16px',
                fill: '#000'
                });

                //flecha
                this.add.image(950, 610, 'flecha').setScale(0.1);
                //Opción para ocultar la burbuja después de un tiempo
                this.time.delayedCall(10000, () => { // 10 segundos de duración
                this.bubble.destroy(); // eliminar burbuja
                this.message.destroy(); // eliminar texto
                }, [], this);
                interactionState3.completed = true;

            }
        }
    }
    this.physics.add.overlap(this.damaris, brillo, collectGift, null, this);
        //---para eliminar la bubble
        this.time.delayedCall(3000, () => { // 2 segundos de duración
        this.bubble.destroy(); // eliminar burbuja
        this.message.destroy(); // eliminar texto
        }, [], this);
       

    });

    option1.on('pointerdown', () => {
        option1.setText("No").setStyle({ fill: '#f00' })
    });

    option2.on('pointerdown', () => {
        option2.setText("Nunca").setStyle({ fill: '#f00' })
    });
    option4.on('pointerdown', () => {
        option4.setText("Como crees").setStyle({ fill: '#f00' })
    });
    }
}

export const interactionState3 = {
    completed: false // Inicialmente es falso
};
