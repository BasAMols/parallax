import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";

export class Portrait extends Div {
    public constructor(position: Vector2) {
        super({
            classNames: ['portrait'],
            background: '#5e889ecc',
            size: new Vector2(300, 350),
        });
        this.style(`position: absolute; left: ${position.x}px; top: ${position.y}px;`);
        this.style('border-radius: 50% 50% 20px 20px;');

    }
}
