import { Container } from '../util/game/container';
import { Main } from '../util/game/main';
import { ForestFlight } from './scene/forestFlight';
import { BackgroundParallax } from './scene/backgrounds/backgroundParallax';
import { DesertFlight } from './scene/desertFlight';

export class FlightGame extends Main {
    forestScene: ForestFlight;
    desertScene: DesertFlight;
    bg: BackgroundParallax;
    public constructor(container: Container) {
        super(container);
        this.style('display: flex; justify-content: center; align-items: center;');
        this.append((this.forestScene = new ForestFlight(this)));
        this.append((this.desertScene = new DesertFlight(this)));
        

        this.forestScene.visible = false;
        this.desertScene.visible = false;
        $.transitions.trigger({
            to: this.forestScene,
            inTransition: $.transitions.IN.INSTANT,
            inSettings: { color: 'black', duration: 100 },
            outTransition: $.transitions.OUT.FADE,
            outSettings: { color: 'black' },
        });
    }

    resize() {
        super.resize();
        let factor = Math.min(
            ($.size.x) / 16,
            ($.size.y) / 9
        );
        this.forestScene.scale(factor);
        this.desertScene.scale(factor);
    }
}
