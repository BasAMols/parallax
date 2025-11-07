import { Game } from './main/game';
import { Container } from "./util/container";

document.addEventListener("DOMContentLoaded", async () => {
    const g = new Container();
    document.body.appendChild(g.dom);
    g.append(new Game(g));
    g.start();
});