function setupUserInput(k) {
    const cursor = k.add([
        k.pos(0, 80 * 7),
        k.rect(84, 40),
        k.outline(2, k.Color.WHITE),
        k.area({
            offset: new Vec2(40, 20),
            scale: 0.5
        }),
        k.opacity(0.50)
    ]);

    k.onKeyRelease('right', () => {
        cursor.moveBy(42, 0)
    })
    k.onKeyRelease('left', () => {
        cursor.moveBy(-42, 0)
    })

    k.onKeyRelease('up', () => {
        cursor.moveBy(0, -40)
    })

    k.onKeyRelease('down', () => {
        cursor.moveBy(0, 40)
    })

    k.onKeyRelease('space', () => {
        const collisions = cursor.getCollisions()
        if (collisions.length == 2) {
            let [blockA, blockB] = collisions
            if (blockA.isLeft()) {
                blockA.target.moveBy(+42, 0)
                blockB.target.moveBy(-42, 0)
            } else {
                blockA.target.moveBy(-42, 0)
                blockB.target.moveBy(+42, 0)
            }

        } else if (collisions.length == 1) {
            let [blockA] = collisions
            if (blockA.isLeft()) {
                blockA.target.moveBy(+42)
            } else {
                blockA.target.moveBy(-42)
            }
        }
    })
}

export {setupUserInput};