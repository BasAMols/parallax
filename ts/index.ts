import { FlightGame } from './main/flightGame';
import { Container } from "./util/game/container";

document.addEventListener("DOMContentLoaded", async () => {
    const g = new Container();
    document.body.appendChild(g.dom);
    g.append(new FlightGame(g));
    g.start();
});