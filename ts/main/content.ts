import { Div } from "../util/html/div";
import { Vector2 } from "../util/math/vector2";
import { Dialogue } from "./dialogue/dialogue";
import { BackgroundParallax } from "./scene/backgrounds/backgroundParallax";
import { DesertBackground } from "./scene/backgrounds/desert";
import { ForestBackground } from "./scene/backgrounds/forest";
import { Plane } from "./scene/plane";


export class Content extends Div {
    content: Div;
    bg: BackgroundParallax;
    plane: Plane;
    dialogue: Dialogue;
    scaleFactor: number;
    follow1: Plane;
    follow2: Plane;
    pointerDown: boolean = false;
    public constructor() {
        super({
            classNames: ['roi'],
            style: 'display: flex; justify-content: center; align-items: center;',
        });
        this.append((this.content = new Div({
            classNames: ['content'],
            size: ['1920px', '1080px'],
            style: 'transform-origin: top left; position: absolute; left: 0; top: 0;',
        })));
        this.content.append((this.bg = new ForestBackground()));
        this.content.append((this.follow1 = new Plane()));
        this.content.append((this.plane = new Plane()));
        this.content.append((this.follow2 = new Plane()));
        this.content.append(this.bg.foregroundLayer);

        this.follow1.style('scale: 0.9;');
        this.follow2.style('scale: 1.05;');
        this.follow1.sprite.value = 5;
        this.follow2.sprite.value = 0;

        this.follow1.setPosition(this.plane.position.add(new Vector2(-5000, 40)));
        this.follow2.setPosition(this.plane.position.add(new Vector2(-4000 - 100, 120)));

        // this.content.append((this.dialogue = new Dialogue()));

        const i = this.content.append(new Div({
            size: ['1920px', '1080px'],
            style: 'position: absolute; left: 0; top: 0;',
        }));

        i.dom.addEventListener('pointerdown', (e) => {
            this.pointerDown = true;
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
        this.bg.height(this.plane.height*2 - 1400);
        this.follow1.setTarget(this.plane.followPosition1.add(new Vector2(300 - 100, 50)));
        this.follow2.setTarget(this.plane.followPosition2.add(new Vector2(150 - 100, 120)));

        // this.plane.setTarget(new Vector2(Math.sin($.time/1400)*100, Math.cos($.time/1200)*100).add(new Vector2(600, 600)));
    }
}
