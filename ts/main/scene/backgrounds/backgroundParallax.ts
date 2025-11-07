import { Div } from "../../../util/html/div";

export class BackgroundParallax extends Div {
    
    protected layer: {
        element: Div;
        speed: number;
    }[] = [];
    value: number = 0;

    public backgroundLayer: Div;
    public foregroundLayer: Div;


    public constructor(key: string, private repeat: number) {
        super({
            classNames: ['background-parallax', key],
            style: 'position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;',
        });
        this.append((this.backgroundLayer = new Div({
            classNames: ['background-layer'],
            style: 'position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;',
        })));
        (this.foregroundLayer = new Div({
            classNames: ['foreground-layer'],
            style: 'position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;',
        }));
    }
    
    move(speed: number) {
        this.value += speed /$.intervalMultiplier;
        this.layer.forEach(layer => {
            const p = (this.value*layer.speed) % (this.repeat);
            layer.element.style(`background-position-x: ${-p}px;`);
        });
    }

    height(height: number) {
        // this.foregroundLayer.style(`top: ${height}px;`);
        // this.backgroundLayer.style(`top: ${height}px;`);
        this.layer.forEach(layer => {
            layer.element.style(`margin-top: ${height*-layer.speed + 100}px;`);
        });
    }
}