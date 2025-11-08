import { Container } from "../../util/game/container";
import { Div } from "../../util/html/div";


export class Gameover extends Div {
    set visible(value: boolean) {
        super.visible = value;
        if (value) {
            location.reload();
        }
    }
    get visible(): boolean {
        return super.visible;
    }
    public constructor() {
        super({
            classNames: ['gameover-content'],
            style: 'background: #000; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;',
        });
        this.append(new Div({
            classNames: ['gameover-content-inner'],
            style: 'font-size: 50px; color: white; position: relative; font-family: monospace',
            // text: 'Game Over',
        }));
        this.visible = false;
    }

}
