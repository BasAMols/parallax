
import { Div } from '../../../util/html/div';
import { Vector2 } from '../../../util/math/vector2';
import { BackgroundParallax } from './backgroundParallax';

export class DesertBackground extends BackgroundParallax {

    public constructor() {
        super('desert', 1920 * 3);
        this.backgroundLayer.append(new Div({
            size: new Vector2(1920 * 3, 1080*2),
            style: 'position: absolute; left: -1920px; top: -540px;',
            background: {
                color: '#a3cbf0',
            }
        }));
        this.backgroundLayer.append(new Div({
            size: new Vector2(1920 * 3, 500),
            style: 'position: absolute; left: -1920px; top: -540px;',
            background: {
                color: '#3772d6',
            }
        }));
        this.backgroundLayer.append(new Div({
            size: new Vector2(1920 * 3, 1080 * 2),
            style: 'position: absolute; left: -1920px; top: -250px;',
            background: {
                type: 'image',
                image: 'dist/images/desert/desert_sky.png',
                size: `100% auto `,
                repeat: 'repeat-x',
            }
        }));
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1920 * 3, 1080 * 2),
                style: 'position: absolute; left: -1920px; top: -500px;',
                background: {
                    type: 'image',
                    image: 'dist/images/desert/desert_cloud.png',
                    size: `50% auto `,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.1,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1920 * 3, 1080 * 2),
                style: 'position: absolute; left: -1920px; top: -350px;',
                background: {
                    type: 'image',
                    image: 'dist/images/desert/desert_mountain.png',
                    size: `50% auto`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.3,
        });
        this.backgroundLayer.append(new Div({
            size: new Vector2(1920 * 3, 1000),
            style: 'position: absolute; left: -1920px; top: 920px;',
            background: {
                color: '#7e85a5',
            }
        }));
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1920 * 3, 1080 * 2),
                style: 'position: absolute; left: -1920px; top: -500px;',
                background: {
                    type: 'image',
                    image: 'dist/images/desert/desert_dunemid.png',
                    size: `50% auto `,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.7,
        });
        this.backgroundLayer.append(new Div({
            size: new Vector2(1920 * 3, 500),
            style: 'position: absolute; left: -1920px; top: 1220px;',
            background: {
                color: '#cc8675',
            }
        }));
        this.layer.push({
            element: this.foregroundLayer.append(new Div({
                size: new Vector2(1920 * 3, 1080 * 2),
                style: 'position: absolute; left: -1920px; top: -350px;',
                background: {
                    type: 'image',
                    image: 'dist/images/desert/desert_dunefrontt.png',
                    size: `50% auto`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 1.2,
        });


    }

}