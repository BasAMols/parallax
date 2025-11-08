import { Container } from '../util/game/container';
import { Main } from '../util/game/main';
import { ForestFlight } from './scene/forestFlight';
import { BackgroundParallax } from './scene/backgrounds/backgroundParallax';
import { MountainFlight } from './scene/mountainFlight';
import { Gameover } from './menu/gameover';
import { Flight } from './scene/flight';
import { ForestBackground } from './scene/backgrounds/forest';
import { DesertBackground } from './scene/backgrounds/moutain';

export class FlightGame extends Main {
    forestScene: ForestFlight;
    mountainScene: MountainFlight;
    bg: BackgroundParallax;
    gameover: any;
    public constructor(container: Container) {
        super(container);
        this.style('display: flex; justify-content: center; align-items: center;');
        this.append((this.forestScene = new Flight(this, new ForestBackground())));
        // this.append((this.mountainScene = new Flight(this, new DesertBackground())));
        this.append((this.gameover = new Gameover()));

        this.forestScene.visible = false;
        // this.mountainScene.visible = false;
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
        // this.mountainScene.scale(factor);
    }
}
