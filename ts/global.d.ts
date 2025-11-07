import { Vector2 } from './util/math/vector2';
import { Main } from './util/main';

declare global {
  interface DollarGlobal {
    get size(): Vector2;
    readonly main: Main;
    frame: number;
    time: number;
    get intervalMultiplier(): number;
  }

  var $: DollarGlobal;
}

export {};