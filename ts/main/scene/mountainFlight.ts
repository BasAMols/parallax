import { Main } from "../../util/game/main";
import { Transitions } from "../../util/game/transitions/transitionLibrary";
import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";
import { Dialogue } from "../dialogue/dialogue";
import { FlightGame } from "../flightGame";
import { BackgroundParallax } from "./backgrounds/backgroundParallax";
import { DesertBackground } from "./backgrounds/moutain";
import { ForestBackground } from "./backgrounds/forest";
import { Plane } from "./plane";
import { Flight } from "./flight";


export class MountainFlight extends Flight {
    public constructor(parent: FlightGame) {
        super(parent, new DesertBackground());
    }

    tick(): void {
        super.tick();
        if (this.visible) {
            this.parent.forestScene.plane.setTarget(this.plane.target);
            if ($.frame % 2000 === 1000) {
                $.transitions.trigger({
                    from: this,
                    to: this.parent.forestScene,
                    inTransition: $.transitions.IN.WIPERIGHT,
                    inSettings: { color: '#539ac1' },
                    outTransition: $.transitions.OUT.WIPERIGHT,
                    outSettings: { color: '#539ac1' },
                });
            }
        }
    }
}
