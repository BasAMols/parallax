import { Div } from '../../../util/html/div';
import { Vector2 } from '../../../util/math/vector2';
import { BackgroundParallax } from './backgroundParallax';

export class AbstractBackground extends BackgroundParallax {
    public constructor() {
        super('abstract', 1920*3);
        this.backgroundLayer.append(new Div({
            classNames: ['background-image'],
            size: new Vector2(1920*3, 1080*2),
            style: 'position: absolute; left: -1920px; top: -540px;',
            background: {
                type: 'image',
                color: '#2b373d',
                image: 'dist/images/3587.jpg',
                size: `100% 100%`,
                repeat: 'repeat',
            }
        }));
    }
}