export function interactionDad(damaris, papaD) {
    //todo, para que no interactúe muchas veces
    
    if (papaD.alreadyInteracted || papaD.completed) return; // Si ya se interactuó, no hacer nada

    papaD.alreadyInteracted = true; // Marcar como interactuado
    papaD.completed = false;
//!creación de burbuja y texto
    
    this.bubble = this.add.graphics();
    this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
    this.bubble.fillRoundedRect(papaD.x , papaD.y - 50, 150, 50, 10); // ajustar posición y tamaño

    // Añadir el texto dentro de la burbuja
    this.message = this.add.text(papaD.x , papaD.y - 50, `¡Recoge toda la \n  basura y te \n  doy permiso!`, {
    fontSize: '16px',
    fill: '#000'
    });

    //Opción para ocultar la burbuja después de un tiempo
    this.time.delayedCall(3000, () => { // 2 segundos de duración
    this.bubble.destroy(); // eliminar burbuja
    this.message.destroy(); // eliminar texto
    }, [], this);

    //!creación de juego de recoger basura  
    //*creo las basuras en el mapa
    // Lista de coordenadas donde quieres colocar las basuras
    const trashPositions = [
        { x: 1000, y: 600 },
        { x: 100, y: 100 },{ x: 100, y: 300 },
        { x: 150, y: 290 },{ x: 70, y: 350 },{ x: 350, y: 350 },
        { x: 450, y: 350 },{ x: 600, y: 360 },{ x: 600, y: 200 },
        { x: 800, y: 70 },{ x: 850, y: 200 },{ x: 1000, y: 400 },
        { x: 950, y: 350 },{ x: 850, y: 500 },{ x: 860, y: 600 },

        { x: 860, y: 800 },{ x: 900, y: 1000 },{ x: 1050, y: 850 },
        { x: 500, y: 750 },{ x: 400, y: 700 },{ x: 300, y: 800 },
        { x: 30, y: 700 },{ x: 850, y: 500 },{ x: 860, y: 600 },
        { x: 500, y: 500 },{ x: 600, y: 550 },{ x: 700, y: 500 },
        { x: 200, y: 1050 },{ x: 260, y: 1070 },{ x: 860, y: 1050 },
        { x: 150, y: 600 },{ x: 600, y: 1050 },{ x: 860, y: 70 },
        { x: 500, y: 150 },{ x: 230, y: 150 },
     ];

    // Crear un grupo para las basuras
    this.trashGroup = this.physics.add.group();

    // Añadir manualmente las basuras en las posiciones definidas
    trashPositions.forEach(pos => {
        let trash = this.trashGroup.create(pos.x, pos.y, 'polvo');
        trash.setImmovable(true); // Para que la basura no se mueva
        trash.setDisplaySize(32, 32);
    });

    //rimel
    let specialTrash = this.trashGroup.getFirstAlive(); // Puedes elegir cualquier otro método para seleccionar la basura
    specialTrash.setTexture('rimel').setDisplaySize(50,50);

     //* Hacer que los objetos de basura no se muevan y que solo se toquen una vez
     this.trashGroup.children.iterate((trash) => {
        trash.setData('collected', false);
        trash.setImmovable(true);
    });
    
    //*creo una colisión entre ellas y la función para que hacer con esta colisión
    this.trashCount = 0;
    //función que hacer en colisión
    function collectTrash(damaris, trash) {
        // Verificar si la basura ya ha sido recogida
        if (!trash.getData('collected')) {
            trash.setData('collected', true); // Marcar la basura como recogida
            trash.disableBody(true, true); // Recoger la basura y eliminarla del mapa
            this.trashCount += 1; // Incrementar el contador de basura recogida
            console.log(this.trashCount)
            // Verificar si se ha recogido toda la basura
            if (this.trashCount === this.trashGroup.getChildren().length) {
                this.completed = false;
                
                this.bubble = this.add.graphics();
                this.bubble.fillStyle(0xffffff, 1); // color blanco con opacidad 1
                this.bubble.fillRoundedRect(damaris.x , damaris.y - 30, 170, 50, 10); // ajustar posición y tamaño

                // Añadir el texto dentro de la burbuja
                this.message = this.add.text(damaris.x , damaris.y - 30, `Papá: Bien mija,\n  ahora pregúntale \n  a tu mami`, {
                fontSize: '16px',
                fill: '#000'
                });

                //Opción para ocultar la burbuja después de un tiempo
                this.time.delayedCall(5000, () => { // 10 segundos de duración
                this.bubble.destroy(); // eliminar burbuja
                this.message.destroy(); // eliminar texto
                }, [], this);

                interactionState.completed = true;
                
                    }
                }
            }
    
    // Activar la colisión
    this.physics.add.overlap(this.damaris, this.trashGroup, collectTrash, null, this);
        

}
//!para mandar el estado de la tarea, debe estar completa 
export const interactionState = {
    completed: false // Inicialmente es falso
};