import { Container } from '../util/container';
import { Main } from '../util/main';
import { Content } from './content';
import { BackgroundParallax } from './scene/backgrounds/backgroundParallax';

export class Game extends Main {
    roi: Content;
    bg: BackgroundParallax;
    public constructor(container: Container) {
        super(container);
        this.style('display: flex; justify-content: center; align-items: center;');

        this.append((this.roi = new Content()));

    }

    resize() {
        super.resize();
        let factor = Math.min(
            ($.size.x) / 16,
            ($.size.y) / 9
        );
        this.roi.scale(factor);
    }
}
