import kaboom from "kaboom";
import {setupUserInput} from "./input";

const k = kaboom({

});

k.add([
    k.text("Tetriswap™", {
        align: "center"
    }),
    k.pos(0, 0),
    k.color(k.Color.WHITE),
]);

const debug = k.add([
    k.text(""),
    k.pos(0, 100),
    k.color(k.Color.WHITE),
    {
        time: 0
    }
]);


k.setBackground(k.Color.BLACK)
k.setGravity(2000)

function block(x = 0, y = 0) {
    const possibleColors = [
        // k.Color.RED,
        k.Color.BLUE,
        k.Color.RED,
        k.Color.GREEN,
        k.Color.YELLOW,
        k.Color.MAGENTA,
    ]

    let color = k.Color.BLACK
    let block = k.add([
        "block",
        k.pos(x, y),
        k.rect(40, 40),
        k.color(k.choose(possibleColors)),
        k.outline(2, color),
        k.area(),
        k.body({
            stickToPlatform: false,
        }),
    ]);

    return block
}

// Lots of clocks for DEMO
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
        block(42 * j, (45 * i) + 280)
    }
}


const bottomLine = k.add([
    k.pos(0, 600),
    k.rect(800, 10),
    k.area(),
    k.color(k.Color.WHITE.darken(150)),
    k.body({isStatic: true})
]);

setupUserInput(k)

// k.onUpdate(() => {
//     let dt = k.dt();
//     debug.time += dt
//     debug.text = String(debug.time.toFixed(2))
//     k.setGravity(1000)
// })