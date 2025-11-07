import { Div } from '../../util/html/div';
import { Vector2 } from '../../util/math/vector2';
import { Portrait } from './portrait';
import { Textbox } from './textbox';

export class Dialogue extends Div {
    textbox: Textbox;
    portrait: Portrait;
    public constructor() {
        super({
            classNames: ['dialogue'],
            size: new Vector2(1920, 1080),
        });
        this.append((new Portrait(new Vector2(410, 500))));
        this.append((new Portrait(new Vector2(410+800, 500))));
        this.append((this.textbox = new Textbox()));
    }
}
