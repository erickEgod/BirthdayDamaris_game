export const createAnimations = (game) =>{
    //?animación movimiento dámaris left, rigth
    game.anims.create({
        key: "damaris-walk",
        frames: game.anims.generateFrameNumbers("damaris", {start:0, end:1}),
        frameRate: 12, //velocidad de la animación
        repeat: -1, //infinito
    })

    //?damaris stop
    game.anims.create({
        key: "damaris-stop",
        frames: [{key:"damaris", frame:0}],
    })

    //?damaris up
    game.anims.create({
        key: "damaris-up",
        frames: game.anims.generateFrameNumbers("damaris", {start:5, end:5}),
        frameRate: 12,
        
    })
    //?damaris down
    game.anims.create({
        key: "damaris-down",
        frames: game.anims.generateFrameNumbers("damaris", {start:4, end:4}),
        frameRate: 12,
        
    })
    //*PAPÁ DÁMARIS
    game.anims.create({
        key: "papaD-stop",
        frames: game.anims.generateFrameNumbers("papaD", {start:0, end:1}),
        frameRate: 3,
        
    })
    //*MAMÁ DÁMARIS
    game.anims.create({
        key: "mamaD-stop",
        frames: game.anims.generateFrameNumbers("mamaD", {start:0, end:1}),
        frameRate: 3,
        
    })
   
    //*DÁMARIS LLORANDO
    game.anims.create({
        key: "damaris-cry",
        frames: game.anims.generateFrameNumbers("damaris", {start:6, end:6}),
        frameRate: 3,
    })
}