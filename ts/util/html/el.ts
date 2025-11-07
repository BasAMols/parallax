import { Vector2 } from '../math/vector2';
import { Background, BackgroundOptions } from './css/background';
import { Size } from './css/size';

export interface ElOptions {
    classNames?: string[];
    id?: string;
    style?: string;
    attributes?: { [key: string]: string };
    background?: BackgroundOptions;
    size?: Vector2|[string, string];
    visible?: boolean;
}
export class El<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
    public dom: HTMLElementTagNameMap[T];
    public children: El<T>[] = [];

    protected _visible: boolean = true;
    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this.dom.style.display = value ? 'block' : 'none';
    }

    public constructor(type: T, options: ElOptions) {
        this.dom = document.createElement(type);
        this._visible = options.visible || true;
        if (options.classNames) {
            this.dom.classList.add(...options.classNames);
        }
        if (options.id) {
            this.dom.id = options.id;
        }
        if (options.style) {
            this.dom.style.cssText = options.style;
        }
        if (options.background) {
            this.dom.style.cssText += Background.getStyle(options.background);
        }
        if (options.size) {
            this.dom.style.cssText += Size.getStyle(options.size);
        }
        if (options.attributes) {
            for (const [key, value] of Object.entries(options.attributes)) {
                this.dom.setAttribute(key, value);
            }
        }
    }

    size(size: Vector2|[string, string]) {
        if (typeof size === 'object') {
            this.dom.style.cssText += Size.getStyle(size);
        } else {
            this.dom.style.cssText += Size.getStyle([size[0], size[1]]);
        }
    }

    style(style: string) {
        this.dom.style.cssText += style;
    }
    background(background: BackgroundOptions) {
        this.dom.style.cssText += Background.getStyle(background);
    }

    tick() {
        for (const child of this.children) {
            child.tick();
        }
    }

    resize() {
        for (const child of this.children) {
            child.resize();
        }
    }

    append(child: El<T>) {
        this.dom.appendChild(child.dom);
        this.children.push(child);
        return child;
    }
}
