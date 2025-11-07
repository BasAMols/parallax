import { Div } from "../../util/html/div";
import { Sprite } from "../../util/html/sprite";
import { Vector2 } from "../../util/math/vector2";


export class Plane extends Div {
    sprite: Sprite;
    public speed: number = 30;
    public maxScreenSpeed: number = 3;
    public height: number = 0;
    exhaustHigh: Sprite;
    exhaustLow: Sprite;
    target: Vector2 = new Vector2(0, 0);
    position: Vector2 = new Vector2(0, 0);
    positions: Vector2[] = [];

    public constructor() {
        super({
            classNames: ['plane'],
            size: new Vector2(350, 150),
            style: 'transform-origin: center center;',
        });

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
        this.position = v;
        this.style(`transform: translate(${v.x}px, ${v.y}px);`);
        this.height = v.y
        this.positions.push(v);
        while (this.positions.length < 20) {
            this.positions.push(v);
        }
        while (this.positions.length > 20) {
            this.positions.shift();
        }
    }
    get followPosition1(): Vector2 {
        return this.positions[0];
    }
    get followPosition2(): Vector2 {
        return this.positions[10];
    }
    setTarget(v: Vector2) {
        this.target = v;
    }

    tick() {
        super.tick();
        this.exhaustHigh.value = Math.floor($.time / 100);
        this.exhaustLow.value = Math.floor($.time / 100);
        const lastPosition = this.position.clone();
        if (this.target){
            this.setPosition(this.position.moveTowards(this.target.subtract(new Vector2(175, 75)), this.maxScreenSpeed*$.intervalMultiplier));
        }
        const delta = this.position.subtract(lastPosition);
        if (delta.x > (this.maxScreenSpeed/3)) {
            this.exhaustHigh.visible = true;
            this.exhaustLow.visible = false;
        } else {
            this.exhaustHigh.visible = false;
            this.exhaustLow.visible = true;
        }
        
    }
}