import { interactionDad, interactionState} from "./interactionsDad.js";

export function interactionMom(damaris, mamaD) {
    if (interactionState.completed==false) return; // Si ya se interactuó, no hacer nada
    
    if(interactionState.completed) {
        if (mamaD.alreadyInteracted) return
        mamaD.alreadyInteracted = true;
        console.log("listo")
    
    
      //!creación de burbuja y texto
     
    this.bubble = this.add.graphics();
    this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
    this.bubble.fillRoundedRect(mamaD.x , mamaD.y - 80, 200, 80, 10); // ajustar posición y tamaño

    // Añadir el texto dentro de la burbuja
    this.message = this.add.text(mamaD.x , mamaD.y - 80, `¡Claro \n pero te compré \n unos regalos \n y no los encuentro \n  date buscando`, {
    fontSize: '16px',
    fill: '#000'
    });

    //Opción para ocultar la burbuja después de un tiempo
    this.time.delayedCall(4000, () => { // 2 segundos de duración
    this.bubble.destroy(); // eliminar burbuja
    this.message.destroy(); // eliminar texto
    }, [], this);

      
    //creando el regalo
    //todo ESCONDER REGALOOOOOO EN ALGO DEL MISMO COLOR
    //todo añadir los dos mediante el grupo
    this.giftGroup = this.physics.add.group();

    let labial = this.giftGroup.create(40, 924, 'gift1').setDisplaySize(32, 32) // Puedes elegir cualquier otro método para seleccionar la basura
    
    let espejo = this.giftGroup.create(670, 976, 'gift2').setDisplaySize(32, 32) 
    ;
    // let gift = this.physics.add.sprite(500, 500, 'gift1').setDisplaySize(32, 32); // Cambia las coordenadas (500, 500) a la posición deseada
    // gift.setImmovable(true); // Para que no se mueva
    //gift.setData('collected', false);
    //let gift2 = this.physics.add.sprite(670, 979, 'gift2').setDisplaySize(16, 16); // Cambia las coordenadas (500, 500) a la posición deseada
    //gift.setImmovable(true); // Para que no se mueva
    //gift.setData('collected', false);
    this.giftGroup.children.iterate((gift) => {
        gift.setData('collected', false);
        gift.setImmovable(true);
    });
    labial.setTexture('gift1').setDisplaySize(7, 7);
    espejo.setTexture('gift2').setDisplaySize(7, 7);

    this.giftCount = 0;
    //función que hacer en colisión
    function collectGift(damaris, gift) {
        // Verificar si la basura ya ha sido recogida
        if (!gift.getData('collected')) {
            gift.setData('collected', true); // Marcar la basura como recogida
            gift.disableBody(true, true); // Recoger la basura y eliminarla del mapa
            this.giftCount += 1; // Incrementar el contador de basura recogida
           
            // Verificar si se ha recogido toda la basura
            if (this.giftCount === 2) {
                this.completed = false;
                //nueva burbuja de finalización
                this.bubble = this.add.graphics();
                this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
                this.bubble.fillRoundedRect(damaris.x , damaris.y - 70, 170, 70, 10); // ajustar posición y tamaño

                // Añadir el texto dentro de la burbuja
                this.message = this.add.text(damaris.x , damaris.y - 70, ` Mamá: Listo,\n pero anda \n donde tu ñaña \n que te buscaba`, {
                fontSize: '16px',
                fill: '#000'
                });

                //Opción para ocultar la burbuja después de un tiempo
                this.time.delayedCall(5000, () => { // 10 segundos de duración
                this.bubble.destroy(); // eliminar burbuja
                this.message.destroy(); // eliminar texto
                }, [], this);
                interactionState2.completed2 = true;
            }
        }
    }
    // Activar la colisión
    this.physics.add.overlap(this.damaris, this.giftGroup, collectGift, null, this);

     }
   
    
}
export const interactionState2 = {
    completed2: false // Inicialmente es falso
};