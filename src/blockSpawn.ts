import {k} from "./engineBootstrap";
import {AreaComp, GameObjRaw, MergeComps, OpacityComp, OutlineComp, PosComp, RectComp, ZComp} from "kaboom";

function block(x = 0, y = 0,
               tags = [], gravityScale?,
               collisionIgnore = []) {
    const possibleColors = [
        k.Color.BLUE,
        k.Color.RED,
        k.Color.GREEN,
        k.Color.YELLOW,
        k.Color.MAGENTA,
    ]

    let color = k.Color.BLACK
    return k.add([
        "block",
        k.pos(x, y),
        k.rect(40, 40),
        k.color(k.choose(possibleColors)),
        k.outline(2, color),
        k.area({
            collisionIgnore
        }),
        k.body({
            gravityScale,
            stickToPlatform: false,
        }),
        ...tags
    ])
}

function setupBlockSpawn(cursor: GameObjRaw & MergeComps<ZComp | PosComp | RectComp | OutlineComp | AreaComp | OpacityComp>) {
    const ITERATIONS_HARD_LIMIT = 13
    let iterations = 0

    generateBlocksAndInvisiblePushLine()
    makeNewBlocksGraduallyPushTheExistingOnes()
    setupHUD();

    function setupHUD() {
        const pushLineMask = k.add([
            k.z(99),
            k.pos(0, 600),
            k.rect(6 * 40 + 6 * 2, 100),
            k.color(k.Color.BLACK),
        ]);

    }

    function makeNewBlocksGraduallyPushTheExistingOnes() {
        k.loop(0.05, () => {
            k.get("push-line").forEach((item) => {
                if (iterations < ITERATIONS_HARD_LIMIT) {
                    item.moveBy(0, -1)
                    cursor.moveBy(0, -1)
                }
            })
        })
    }

    function generateBlocksAndInvisiblePushLine() {
        if (iterations >= ITERATIONS_HARD_LIMIT) {
            return
        } else {
            iterations += 1
        }

        for (let i = 0; i < 6; i++) {
            let b = block(42 * i, 600, ["unready"], 0, ['ready-line'])
            b.originalColor = b.color
            b.color = b.color.darken(150)
        }

        const pushLine = k.add([
            k.pos(0, 640),
            k.rect(6 * 40 + 6 * 2, 10),
            k.area(),
            k.color(k.Color.WHITE),
            k.body({isStatic: true}),
            "push-line"
        ]);

        pushLine.onUpdate(() => {
            if (pushLine.pos.y <= 600) {
                console.log(k.get("unready").length)
                k.get("unready").forEach((item) => {
                    item.collisionIgnore = []
                    item.gravityScale = 1
                    item.color = item.originalColor
                    item.unuse("unready")
                })
                if (iterations < ITERATIONS_HARD_LIMIT) {
                    pushLine.destroy()
                }
                generateBlocksAndInvisiblePushLine()
            }
        })

    }

}

export {setupBlockSpawn};