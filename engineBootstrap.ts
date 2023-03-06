import kaboom from "kaboom";

const k = kaboom({});

k.add([
    k.text("Tetriswap™", {
        align: "center"
    }),
    k.pos(0, 0),
    k.color(k.Color.WHITE),
]);

k.setBackground(k.Color.BLACK)
k.setGravity(1000)


export {k}