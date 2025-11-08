import { ExplosionHit } from "../../util/game/particles/explosion/explosionHit";
import { Div } from "../../util/html/div";
import { Sprite } from "../../util/html/sprite";
import { MathUtil } from "../../util/math/math";
import { Vector2 } from "../../util/math/vector2";
import { Flight } from "./flight";


export class Plane extends Div {
    sprite: Sprite;
    public speed: number = 30;
    public maxScreenSpeed: number = 2;
    public get height(): number {
        return this.position.y;
    }
    exhaustHigh: Sprite;
    exhaustLow: Sprite;
    target: Vector2 = new Vector2(0, 0);
    position: Vector2 = new Vector2(0, 0);
    positions: Vector2[] = [];
    random: number = 0;
    rotation: number = 0;
    crashed: boolean = false;
    crashTime: number = 0;

    public constructor(public scale: number = 1, public parent: Flight) {
        super({
            classNames: ['plane'],
            size: new Vector2(350, 150),
            style: `transform-origin: 175px 75px; scale(${scale}); pointer-events: none;`,
        });

        this.random = Math.random() * 120;

        this.append((this.sprite = new Sprite({
            image: 'dist/images/ship/sprite_player_spaceship_up_down.png',
            size: new Vector2(350, 150),
            columns: 7,
            rows: 1,
            value: 3
        })));
        this.append((this.exhaustHigh = new Sprite({
            image: 'dist/images/ship/sprite_player_spaceship_exhaust_high.png',
            size: new Vector2(64, 32),
            columns: 2,
            rows: 1,
            value: 1,
            style: 'left: -14px; top: 61px;'
        })));
        this.append((this.exhaustLow = new Sprite({
            image: 'dist/images/ship/sprite_player_spaceship_exhaust_low.png',
            size: new Vector2(64, 32),
            columns: 2,
            rows: 1,
            value: 1,
            style: 'left: -14px; top: 61px;',
            visible: false
        })));

        this.setPosition(new Vector2(900, 400));
        this.setTarget(new Vector2(900, 400));
    }


    setPosition(v: Vector2) {
        if (!this.visible) return;

        this.position = v;
        this.realPosition = v.clone().add(new Vector2(
            Math.sin(($.frame + this.random) / 120) * 20,
            Math.sin(($.frame + this.random) / 140) * 20
        ));

        if (this.scale !== 1) {
            this.realPosition.y = this.realPosition.y + ((this.realPosition.y - 450) * 0.8 * (this.scale - 1))
            this.realPosition.x = this.realPosition.x + ((this.realPosition.x - 700) * 0.8 * (this.scale - 1))
        }
        this.style(`transform: translate(${this.realPosition.x}px, ${this.realPosition.y}px) scale(${this.scale}, ${this.scale}) rotate(${this.rotation}deg);`);
        this.positions.push(v);
        if (!this.crashed) {
            this.sprite.value = 6 - Math.floor(MathUtil.clamp((this.height) / 1000 * 6, 0, 6));
        } else {
            if (this.scale < 1) {
                this.sprite.value = 6;
                this.scale = MathUtil.max(this.scale-0.0005, 0.2);
            }
            if (this.scale > 1) {
                this.sprite.value = 0;
                this.scale = MathUtil.min(this.scale+0.002, 2);
            }
        }

        while (this.positions.length < 20) {
            this.positions.push(v);
        }
        while (this.positions.length > 20) {
            this.positions.shift();
        }
    }
    realPosition: Vector2 = new Vector2(0, 0);
    getFollowPosition(n: number, max: number): Vector2 {
        return this.positions[Math.min(Math.floor(n / max * 20), 19)].add(new Vector2(175, 75));
    }
    setTarget(v: Vector2) {
        this.target = v;
    }
    crash() {
        if (this.crashed) return;
        this.crashed = true;
        this.crashTime = $.time;
        this.style('filter: brightness(0.7);');
    }
    impact() {
        if (!this.crashed) return;
        if (!this.visible) return;
        this.parent.explodeGround(this);
        this.visible = false;
    }

    tick() {
        super.tick();

        if (!this.visible && this.scale !== 1) return;

        this.exhaustHigh.value = Math.floor($.time / 100);
        this.exhaustLow.value = Math.floor($.time / 100);
        const lastPosition = this.position.clone();

        
        if (this.crashed) {
            this.setPosition(new Vector2(this.position.x - ($.time - this.crashTime) * 0.004, this.position.y + ($.time - this.crashTime) * 0.004));
            this.rotation = Math.min(this.rotation + ($.time - this.crashTime)*0.00005*$.intervalMultiplier, 10);
            this.speed = MathUtil.max(this.speed - ($.time - this.crashTime) * 0.0001, 0);
            if (this.scale !== 1 && this.realPosition.y > 1000){
                this.impact();
            }
            if (this.scale === 1 && this.position.y > 800/this.scale){
                this.impact();
            }
        } else {
            this.setPosition(this.position.moveTowards(this.target.subtract(new Vector2(175, 75)), this.maxScreenSpeed * $.intervalMultiplier));
        }
        const delta = this.position.subtract(lastPosition).x + this.speed;

        if (!this.crashed && delta > (31)) {
            this.exhaustHigh.visible = true;
            this.exhaustLow.visible = false;
        } else if (!this.crash && delta > (28)) {
            this.exhaustHigh.visible = false;
            this.exhaustLow.visible = true;
        } else {
            this.exhaustHigh.visible = false;
            this.exhaustLow.visible = false;
        }

    }
}