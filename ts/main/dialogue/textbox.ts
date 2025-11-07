import { Div } from '../../util/html/div';
import { Vector2 } from '../../util/math/vector2';

export class Textbox extends Div {
    public constructor() {
        super({
            classNames: ['textbox'],
            background: '#5e889e',
            size: new Vector2(900, 200),
        });
        this.style('position: absolute; left: 510px; top: 800px;');
        this.style('border-radius: 10px;');

    }
}
