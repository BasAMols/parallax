
import { Div } from '../../../util/html/div';
import { Vector2 } from '../../../util/math/vector2';
import { BackgroundParallax } from './backgroundParallax';

export class DesertBackground extends BackgroundParallax {

    public constructor() {
        super('desert', 1900*4);

        this.height(100);
   
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -2290px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/4_Forest_parallax_vertical_skybox_fulll.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.04,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -900px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/8_Forest_parallax_vertical_cloud_5.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.05,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1200px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/7_Forest_parallax_vertical_cloud_4.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.05,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1500px',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/6_Forest_parallax_vertical_cloud_3.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.06,
        });

        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -2000px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/4-1_Forest_parallax_vertical_forest_moon_big.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.07,
        });

        //mountains
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: 500px;',
                background: {
                    color: '#8dd7fb',
                }
            })) as Div,
            speed: 0.09,
        });

        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1800px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/3_Forest_parallax_vertical_mountain_back.png',
                    size: `12.5% 50%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.1,
        });

        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -2250px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/3_Forest_parallax_vertical_mountain_back.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.11,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1200px; opacity: 0.5;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/6_Forest_parallax_vertical_cloud_3.png',
                    size: `12.5% 50%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.12,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1450px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/3_Forest_parallax_vertical_mountain_back.png',
                    size: `50% 200%`,
                    position: 'bottom center',
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.14,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1000px; opacity: 0.5;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/6_Forest_parallax_vertical_cloud_3.png',
                    size: `25% 100%`,
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.15,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: -1000px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/3_Forest_parallax_vertical_mountain_back.png',
                    size: `50% 200%`,
                    position: 'bottom center',
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.2,
        });
        this.layer.push({
            element: this.backgroundLayer.append(new Div({
                size: new Vector2(1900*4, 3450),
                style: 'position: absolute; left: -1920px; top: 0px;',
                background: {
                    type: 'image',
                    image: 'dist/images/forest/3_Forest_parallax_vertical_mountain_back.png',
                    size: `100% 400%`,
                    position: 'bottom center',
                    repeat: 'repeat-x',
                }
            })) as Div,
            speed: 0.3,
        });


    }
}