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
import { ExplosionHit } from "../../util/game/particles/explosion/explosionHit";
import { ExplosionGround } from "../../util/game/particles/explosion/explosionGround";
import { Particle } from "../../util/game/particles/particle";


export class Flight extends Div {
    public content: Div;
    public test: Div;
    public bg: BackgroundParallax;
    public plane: Plane;
    public dialogue: Dialogue;
    public scaleFactor: number;
    public follow1: Plane;
    public follow2: Plane;
    public follow3: Plane;
    public follow4: Plane;
    public pointerDown: boolean = false;
    public lives: number = 5;
    explosions: Particle[] = [];
    test2: Div;

    public hit() {
        if (this.plane.crashed) return;
        this.lives--;
        if (this.lives <= 0) {
            this.plane.crash();
            this.gameOver();
            this.explode(this.plane.realPosition, this.plane.dom.style.zIndex);
        } else {
            const plane = [this.follow1, this.follow2, this.follow3, this.follow4].filter(plane => !plane.crashed).sort((a, b) => Math.random() - 0.5)[0];
            plane.crash();
            this.explode(plane.realPosition, plane.dom.style.zIndex);
        }
    }

    public explode(v: Vector2, zIndex: string) {
        for (let i = 0; i < Math.random() * 20 + 5; i++) {
            const explosion = new ExplosionHit(this.content, v.add(new Vector2(Math.random() * 200, Math.random() * 100)), 700, Math.random() * 2 + 2, (Math.random() * 100) + (i * 250));
            explosion.style(`z-index: ${zIndex};`);
        }
    }
    public explodeGround(plane: Plane) {
        const explosion = new ExplosionGround(this.content, plane.realPosition.add(new Vector2(-80, -180)), 1000, 4*plane.scale, 0);
        explosion.style(`z-index: ${plane.dom.style.zIndex};`);
        this.explosions.push(explosion);
    }

    gameOver() {
        $.transitions.trigger({
            from: this,
            to: this.parent.gameover,
            inTransition: $.transitions.IN.FADE,
            inSettings: { color: 'black', duration: 5000 },
            outTransition: $.transitions.OUT.FADE,
            outSettings: { color: 'black', duration: 500 },
        });
    }

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
        this.bg.style('z-index: 10;');
        this.content.append((this.follow1 = new Plane(0.7, this)));
        this.follow1.style('z-index: 11;');
        this.content.append((this.follow2 = new Plane(0.85, this)));
        this.follow2.style('z-index: 12;');
        this.content.append((this.plane = new Plane(1, this)));
        this.plane.style('z-index: 13;');
        this.content.append((this.follow3 = new Plane(1.15, this)));
        this.follow3.style('z-index: 14;');
        this.content.append(this.bg.foregroundLayer);
        this.bg.foregroundLayer.style('z-index: 15;');
        this.content.append((this.follow4 = new Plane(1.4, this)));
        this.follow4.style('z-index: 16;');

        this.follow1.setPosition(this.plane.position.add(new Vector2(-4500, 120)));
        this.follow2.setPosition(this.plane.position.add(new Vector2(-3000, 120)));
        this.follow3.setPosition(this.plane.position.add(new Vector2(-3000, 120)));
        this.follow4.setPosition(this.plane.position.add(new Vector2(-4500, 120)));

        this.plane.style('filter: hue-rotate(72deg);');
        this.follow1.style('filter: hue-rotate(144deg);');
        this.follow2.style('filter: hue-rotate(216deg);');
        this.follow3.style('filter: hue-rotate(288deg);');
        this.follow4.style('filter: hue-rotate(360deg);');

        // this.content.append((this.dialogue = new Dialogue()));

        const i = this.content.append(new Div({
            size: ['1920px', '1080px'],
            style: 'position: absolute; left: 0; top: 0; z-index: 100;',
        }));

        i.dom.addEventListener('pointerdown', (e) => {
            if (e.button == 1) {
                this.hit();
            } else if (e.button == 0) {
                this.pointerDown = true;
                this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
            }
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

        this.follow2.setTarget(this.plane.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
        this.follow3.setTarget(this.plane.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));

        if (this.follow2.crashed) {
            this.follow1.setTarget(this.plane.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
        } else {
            this.follow1.setTarget(this.follow2.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
        }

        if (this.follow3.crashed) {
            this.follow4.setTarget(this.plane.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));
        } else {
            this.follow4.setTarget(this.follow3.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));
        }

        this.explosions.forEach(explosion => {
            explosion.transform.move(new Vector2(-this.plane.speed/$.intervalMultiplier*0.5,0 ));
        });

    }
}
