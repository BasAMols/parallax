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


export class Flight extends Div {
    public content: Div;
    public bg: BackgroundParallax;
    public plane: Plane;
    public dialogue: Dialogue;
    public scaleFactor: number;
    public follow1: Plane;
    public follow2: Plane;
    public follow3: Plane;
    public follow4: Plane;
    public pointerDown: boolean = false;

    set visible(value: boolean) {
        super.visible = value;
        if (!value) {
            this.pointerDown = false;
        }
    }
    get visible(): boolean {
        return super.visible;
    }

    public constructor(protected parent: FlightGame, bg: BackgroundParallax) {
        super({
            classNames: ['roi'],
            style: 'display: flex; justify-content: center; align-items: center;',
        });
        this.append((this.content = new Div({
            classNames: ['content'],
            size: ['1920px', '1080px'],
            style: 'transform-origin: top left; position: absolute; left: 0; top: 0;',
        })));
        this.content.append((this.bg = bg));

        this.content.append((this.follow1 = new Plane()));
        this.content.append((this.follow2 = new Plane()));
        this.content.append((this.plane = new Plane()));
        this.content.append((this.follow3 = new Plane()));
        this.content.append((this.follow4 = new Plane()));

        this.content.append(this.bg.foregroundLayer);

        this.follow1.style('scale: 0.8;');
        this.follow2.style('scale: 0.9;');
        this.follow3.style('scale: 1.05;');
        this.follow4.style('scale: 1.1;');
        this.follow1.sprite.value = 5;
        this.follow2.sprite.value = 3;
        this.follow3.sprite.value = 2;
        this.follow4.sprite.value = 0;

        this.follow1.setPosition(this.plane.position.add(new Vector2(-5000, 120)));
        this.follow2.setPosition(this.plane.position.add(new Vector2(-4000, 120)));
        this.follow3.setPosition(this.plane.position.add(new Vector2(-4000, 120)));
        this.follow4.setPosition(this.plane.position.add(new Vector2(-5000, 120)));

        // this.content.append((this.dialogue = new Dialogue()));

        const i = this.content.append(new Div({
            size: ['1920px', '1080px'],
            style: 'position: absolute; left: 0; top: 0;',
        }));

        i.dom.addEventListener('pointerdown', (e) => {
            this.pointerDown = true;
            this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
        });
        i.dom.addEventListener('pointermove', (e) => {
            if (this.pointerDown) {
                this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
            }
        });
        i.dom.addEventListener('pointerup', (e) => {
            this.pointerDown = false;
        });

    }

    scale(factor: number) {
        this.scaleFactor = factor;
        this.size([`${factor * 16}px`, `${factor * 9}px`]);
        this.content.style(`transform: scale(${factor * 16 / 1920}, ${factor * 16 / 1920});`);
    }

    tick(): void {
        super.tick();
        this.bg.move(this.plane.speed);
        this.bg.height(this.plane.height * 2 - 1400);
        this.follow1.setTarget(this.plane.getFollowPosition(0, 4).add(new Vector2(300 - 150 - 80, 80)));
        this.follow2.setTarget(this.plane.getFollowPosition(2, 4).add(new Vector2(300 - 150, 80,)));
        this.follow3.setTarget(this.plane.getFollowPosition(3, 4).add(new Vector2(150 - 150, 80,)));
        this.follow4.setTarget(this.plane.getFollowPosition(1, 4).add(new Vector2(150 - 150 - 120, 80,)));
    }
}
