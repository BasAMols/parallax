var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// ts/util/html/css/background.ts
var Background = class {
  static getStyle(options) {
    let style = "";
    if (typeof options === "string") {
      style += "background: ".concat(options, ";");
      return style;
    }
    if (options.color) {
      style += "background-color: ".concat(options.color, ";");
    }
    if ("type" in options && options.type === "image") {
      style += "background-image: url(".concat(options.image, ");");
      style += "background-position: ".concat(options.position || "center center", ";");
      style += "background-repeat: ".concat(options.repeat || "no-repeat", ";");
      style += "background-size: ".concat(options.size || "cover", ";");
      style += "background-attachment: ".concat(options.attachment || "scroll", ";");
      style += "background-origin: ".concat(options.origin || "padding-box", ";");
      style += "background-clip: ".concat(options.clip || "border-box", ";");
    } else if ("type" in options && options.type === "linear") {
      style += "background-image: linear-gradient(".concat(options.direction || "to bottom", ", ").concat(options.colors.map((color) => "".concat(color.color, " ").concat(color.position || "")).join(", "), ");");
    }
    return style;
  }
};

// ts/util/html/css/size.ts
var Size = class {
  static getStyle(size) {
    let style = "";
    if (Array.isArray(size)) {
      style += "width: ".concat(size[0], "; height: ").concat(size[1], ";");
    } else {
      style += "width: ".concat(size.x.toString(), "px; height: ").concat(size.y.toString(), "px;");
    }
    return style;
  }
};

// ts/util/html/el.ts
var El = class {
  constructor(type, options) {
    this.children = [];
    this._visible = true;
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
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    this.dom.style.display = value ? "block" : "none";
  }
  size(size) {
    if (typeof size === "object") {
      this.dom.style.cssText += Size.getStyle(size);
    } else {
      this.dom.style.cssText += Size.getStyle([size[0], size[1]]);
    }
  }
  style(style) {
    this.dom.style.cssText += style;
  }
  background(background) {
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
  append(child) {
    this.dom.appendChild(child.dom);
    this.children.push(child);
    return child;
  }
};

// ts/util/html/div.ts
var Div = class extends El {
  constructor(options = {}) {
    super("div", options);
  }
};

// ts/util/math/vector2.ts
var Vector2 = class _Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x += arg;
        y += arg;
      } else {
        x += arg.x;
        y += arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  subtract(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x -= arg;
        y -= arg;
      } else {
        x -= arg.x;
        y -= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  multiply(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x *= arg;
        y *= arg;
      } else {
        x *= arg.x;
        y *= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  divide(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x /= arg;
        y /= arg;
      } else {
        x /= arg.x;
        y /= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  angle() {
    const mag = this.magnitude();
    if (mag === 0)
      return 0;
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }
  angleRadians() {
    const mag = this.magnitude();
    if (mag === 0)
      return 0;
    return Math.atan2(this.y, this.x);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  rotate(angleDegrees) {
    return this.rotateRadians(angleDegrees * Math.PI / 180);
  }
  rotateRadians(angleRadians) {
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);
    return new _Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }
  floor(arg1, arg2) {
    if (arg1 === void 0) {
      return new _Vector2(Math.floor(this.x), Math.floor(this.y));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(Math.floor(this.x / arg1) * arg1, Math.floor(this.y / arg2) * arg2);
    } else if (typeof arg1 === "number") {
      return new _Vector2(Math.floor(this.x / arg1) * arg1, Math.floor(this.y / arg1) * arg1);
    } else {
      return new _Vector2(Math.floor(this.x / arg1.x) * arg1.x, Math.floor(this.y / arg1.y) * arg1.y);
    }
  }
  ceil(arg1, arg2) {
    if (arg1 === void 0) {
      return new _Vector2(Math.ceil(this.x), Math.ceil(this.y));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(Math.ceil(this.x / arg1) * arg1, Math.ceil(this.y / arg2) * arg2);
    } else if (typeof arg1 === "number") {
      return new _Vector2(Math.ceil(this.x / arg1) * arg1, Math.ceil(this.y / arg1) * arg1);
    } else {
      return new _Vector2(Math.ceil(this.x / arg1.x) * arg1.x, Math.ceil(this.y / arg1.y) * arg1.y);
    }
  }
  clamp(minArg, maxArg) {
    if (typeof minArg === "number" && typeof maxArg === "number") {
      return new _Vector2(
        Math.max(minArg, Math.min(maxArg, this.x)),
        Math.max(minArg, Math.min(maxArg, this.y))
      );
    } else if (minArg instanceof _Vector2 && maxArg instanceof _Vector2) {
      return new _Vector2(
        Math.max(minArg.x, Math.min(maxArg.x, this.x)),
        Math.max(minArg.y, Math.min(maxArg.y, this.y))
      );
    }
    throw new Error("Invalid clamp arguments: both min and max must be either numbers or Vector2 objects");
  }
  clampMagnitude(maxMagnitude) {
    const magnitude = this.magnitude();
    if (magnitude > maxMagnitude) {
      return this.normalise().multiply(maxMagnitude);
    }
    return this;
  }
  clone() {
    return new _Vector2(this.x, this.y);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  lerp(target, factor) {
    return new _Vector2(
      this.x + (target.x - this.x) * factor,
      this.y + (target.y - this.y) * factor
    );
  }
  moveTowards(target, maxDistance) {
    return this.add(target.subtract(this).clampMagnitude(maxDistance));
  }
  normalise() {
    const mag = this.magnitude();
    if (mag === 0)
      return new _Vector2(0, 0);
    return new _Vector2(this.x / mag, this.y / mag);
  }
  flip() {
    return new _Vector2(-this.x, -this.y);
  }
  flipx() {
    return new _Vector2(-this.x, this.y);
  }
  flipy() {
    return new _Vector2(this.x, -this.y);
  }
  round(arg1, arg2) {
    const roundToPrecision = (value, precision) => {
      const factor = Math.pow(10, precision);
      return Math.round(value * factor) / factor;
    };
    if (arg1 === void 0) {
      return new _Vector2(roundToPrecision(this.x, 2), roundToPrecision(this.y, 2));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(roundToPrecision(this.x, arg1), roundToPrecision(this.y, arg2));
    } else if (typeof arg1 === "number") {
      return new _Vector2(roundToPrecision(this.x, arg1), roundToPrecision(this.y, arg1));
    } else {
      return new _Vector2(roundToPrecision(this.x, arg1.x), roundToPrecision(this.y, arg1.y));
    }
  }
};

// ts/util/game/main.ts
var Main = class extends Div {
  constructor(container) {
    super({
      classNames: ["main"],
      size: ["100%", "100%"]
    });
    window["$"] = {
      get size() {
        return new Vector2(window.innerWidth, window.innerHeight);
      },
      main: this,
      frame: 0,
      time: 0,
      get intervalMultiplier() {
        return container.ticker.currentFPS / 60;
      },
      transitions: container.transitions
    };
  }
};

// ts/main/scene/backgrounds/backgroundParallax.ts
var BackgroundParallax = class extends Div {
  constructor(key, repeat) {
    super({
      classNames: ["background-parallax", key],
      style: "position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;"
    });
    this.repeat = repeat;
    this.layer = [];
    this.value = 0;
    this.append(this.backgroundLayer = new Div({
      classNames: ["background-layer"],
      style: "position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;"
    }));
    this.foregroundLayer = new Div({
      classNames: ["foreground-layer"],
      style: "position: absolute; left: 0; top: 0; display: flex; justify-content: center; align-items: center;"
    });
  }
  move(speed) {
    this.value += speed / $.intervalMultiplier;
    this.layer.forEach((layer) => {
      const p = this.value * layer.speed % this.repeat;
      layer.element.style("background-position-x: ".concat(-p, "px;"));
    });
  }
  height(height) {
    this.layer.forEach((layer) => {
      layer.element.style("margin-top: ".concat(height * -layer.speed + 100, "px;"));
    });
  }
};

// ts/main/scene/backgrounds/forest.ts
var ForestBackground = class extends BackgroundParallax {
  constructor() {
    super("forest", 1900 * 4);
    this.height(100);
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2290px;",
        background: {
          type: "image",
          image: "dist/images/forest/4_Forest_parallax_vertical_skybox_fulll.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.04
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -900px;",
        background: {
          type: "image",
          image: "dist/images/forest/8_Forest_parallax_vertical_cloud_5.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.05
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1200px;",
        background: {
          type: "image",
          image: "dist/images/forest/7_Forest_parallax_vertical_cloud_4.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.05
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1500px",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.06
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2000px;",
        background: {
          type: "image",
          image: "dist/images/forest/4-1_Forest_parallax_vertical_forest_moon_big.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.07
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: 500px;",
        background: {
          color: "#8dd7fb"
        }
      })),
      speed: 0.09
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1800px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.1
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2250px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.11
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1200px; opacity: 0.5;",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.12
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1450px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "50% 200%",
          position: "bottom center",
          repeat: "repeat-x"
        }
      })),
      speed: 0.14
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1000px; opacity: 0.5;",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.15
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 5e3),
        style: "position: absolute; left: -1920px; top: 690px;",
        background: {
          color: "#357265"
        }
      })),
      speed: 0.28
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2300px;",
        background: {
          type: "image",
          image: "dist/images/forest/2_Forest_parallax_vertical_forest_mid.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.3
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1690px;",
        background: {
          type: "image",
          image: "dist/images/forest/2_Forest_parallax_vertical_forest_mid.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.35
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1700px;",
        background: {
          type: "image",
          image: "dist/images/forest/1_Forest_parallax_vertical_forest_low.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.5
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1600px;",
        background: {
          type: "image",
          image: "dist/images/forest/0_Forest_parallax_vertical_forest_tree_front.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.55
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2300px;",
        background: {
          type: "image",
          image: "dist/images/forest/1_Forest_parallax_vertical_forest_low.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.6
    });
    this.layer.push({
      element: this.foregroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: 1250px;",
        background: {
          color: "#0f3b4a"
        }
      })),
      speed: 0.75
    });
    this.layer.push({
      element: this.foregroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2300px;",
        background: {
          type: "image",
          image: "dist/images/forest/0_Forest_parallax_vertical_forest_tree_front.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.75
    });
    this.layer.push({
      element: this.foregroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2100px;",
        background: {
          type: "image",
          image: "dist/images/forest/0_Forest_parallax_vertical_forest_tree_front.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.95
    });
  }
};

// ts/util/html/sprite.ts
var Sprite = class extends Div {
  constructor(options) {
    super(__spreadValues({
      size: options.size,
      background: {
        type: "image",
        image: options.image,
        size: "".concat(options.size.x * options.columns, "px ").concat(options.size.y * options.rows, "px"),
        repeat: "no-repeat"
      }
    }, options));
    this.max = options.columns * options.rows;
    this.options = options;
    this.value = options.value || 0;
  }
  set value(value) {
    this._value = Math.floor(value % this.max);
    let column = this._value % this.options.columns;
    let row = Math.floor(this._value / this.options.columns);
    this.style("background-position-x: -".concat(this.options.size.x * column, "px; background-position-y: -").concat(this.options.size.y * row, "px;"));
  }
};

// ts/main/scene/plane.ts
var Plane = class extends Div {
  constructor() {
    super({
      classNames: ["plane"],
      size: new Vector2(350, 150),
      style: "transform-origin: center center;"
    });
    this.speed = 30;
    this.maxScreenSpeed = 3;
    this.height = 0;
    this.target = new Vector2(0, 0);
    this.position = new Vector2(0, 0);
    this.positions = [];
    this.append(this.sprite = new Sprite({
      image: "dist/images/ship/sprite_player_spaceship_up_down.png",
      size: new Vector2(350, 150),
      columns: 7,
      rows: 1,
      value: 3
    }));
    this.append(this.exhaustHigh = new Sprite({
      image: "dist/images/ship/sprite_player_spaceship_exhaust_high.png",
      size: new Vector2(64, 32),
      columns: 2,
      rows: 1,
      value: 1,
      style: "left: -14px; top: 61px;"
    }));
    this.append(this.exhaustLow = new Sprite({
      image: "dist/images/ship/sprite_player_spaceship_exhaust_low.png",
      size: new Vector2(64, 32),
      columns: 2,
      rows: 1,
      value: 1,
      style: "left: -14px; top: 61px;",
      visible: false
    }));
    this.setPosition(new Vector2(900, 400));
    this.setTarget(new Vector2(900, 400));
  }
  setPosition(v) {
    this.position = v;
    this.style("transform: translate(".concat(v.x, "px, ").concat(v.y, "px);"));
    this.height = v.y;
    this.positions.push(v);
    while (this.positions.length < 20) {
      this.positions.push(v);
    }
    while (this.positions.length > 20) {
      this.positions.shift();
    }
  }
  get followPosition1() {
    return this.positions[0];
  }
  get followPosition2() {
    return this.positions[10];
  }
  setTarget(v) {
    this.target = v;
  }
  tick() {
    super.tick();
    this.exhaustHigh.value = Math.floor($.time / 100);
    this.exhaustLow.value = Math.floor($.time / 100);
    const lastPosition = this.position.clone();
    if (this.target) {
      this.setPosition(this.position.moveTowards(this.target.subtract(new Vector2(175, 75)), this.maxScreenSpeed * $.intervalMultiplier));
    }
    const delta = this.position.subtract(lastPosition);
    if (delta.x > this.maxScreenSpeed / 3) {
      this.exhaustHigh.visible = true;
      this.exhaustLow.visible = false;
    } else {
      this.exhaustHigh.visible = false;
      this.exhaustLow.visible = true;
    }
  }
};

// ts/main/scene/forestFlight.ts
var ForestFlight = class extends Div {
  constructor(parent) {
    super({
      classNames: ["roi"],
      style: "display: flex; justify-content: center; align-items: center;"
    });
    this.parent = parent;
    this.pointerDown = false;
    this.append(this.content = new Div({
      classNames: ["content"],
      size: ["1920px", "1080px"],
      style: "transform-origin: top left; position: absolute; left: 0; top: 0;"
    }));
    this.content.append(this.bg = new ForestBackground());
    this.content.append(this.follow1 = new Plane());
    this.content.append(this.plane = new Plane());
    this.content.append(this.follow2 = new Plane());
    this.content.append(this.bg.foregroundLayer);
    this.follow1.style("scale: 0.9;");
    this.follow2.style("scale: 1.05;");
    this.follow1.sprite.value = 5;
    this.follow2.sprite.value = 0;
    this.follow1.setPosition(this.plane.position.add(new Vector2(-5e3, 40)));
    this.follow2.setPosition(this.plane.position.add(new Vector2(-4e3 - 100, 120)));
    const i = this.content.append(new Div({
      size: ["1920px", "1080px"],
      style: "position: absolute; left: 0; top: 0;"
    }));
    i.dom.addEventListener("pointerdown", (e) => {
      this.pointerDown = true;
      this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
    });
    i.dom.addEventListener("pointermove", (e) => {
      if (this.pointerDown) {
        this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
      }
    });
    i.dom.addEventListener("pointerup", (e) => {
      this.pointerDown = false;
    });
  }
  scale(factor) {
    this.scaleFactor = factor;
    this.size(["".concat(factor * 16, "px"), "".concat(factor * 9, "px")]);
    this.content.style("transform: scale(".concat(factor * 16 / 1920, ", ").concat(factor * 16 / 1920, ");"));
  }
  tick() {
    super.tick();
    this.bg.move(this.plane.speed);
    this.bg.height(this.plane.height * 2 - 1400);
    this.follow1.setTarget(this.plane.followPosition1.add(new Vector2(300 - 100, 50)));
    this.follow2.setTarget(this.plane.followPosition2.add(new Vector2(150 - 100, 120)));
    if (this.visible) {
      this.parent.desertScene.plane.setTarget(this.plane.target);
    }
    if ($.frame % 2e3 === 1e3) {
      $.transitions.trigger({
        from: this,
        to: this.parent.desertScene,
        inTransition: $.transitions.IN.WIPERIGHT,
        inSettings: { color: "#357265" },
        outTransition: $.transitions.OUT.WIPERIGHT,
        outSettings: { color: "#357265" }
      });
    }
  }
};

// ts/main/scene/backgrounds/desert.ts
var DesertBackground = class extends BackgroundParallax {
  constructor() {
    super("desert", 1900 * 4);
    this.height(100);
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2290px;",
        background: {
          type: "image",
          image: "dist/images/forest/4_Forest_parallax_vertical_skybox_fulll.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.04
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -900px;",
        background: {
          type: "image",
          image: "dist/images/forest/8_Forest_parallax_vertical_cloud_5.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.05
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1200px;",
        background: {
          type: "image",
          image: "dist/images/forest/7_Forest_parallax_vertical_cloud_4.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.05
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1500px",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.06
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2000px;",
        background: {
          type: "image",
          image: "dist/images/forest/4-1_Forest_parallax_vertical_forest_moon_big.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.07
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: 500px;",
        background: {
          color: "#8dd7fb"
        }
      })),
      speed: 0.09
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1800px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.1
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -2250px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.11
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1200px; opacity: 0.5;",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "12.5% 50%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.12
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1450px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "50% 200%",
          position: "bottom center",
          repeat: "repeat-x"
        }
      })),
      speed: 0.14
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1000px; opacity: 0.5;",
        background: {
          type: "image",
          image: "dist/images/forest/6_Forest_parallax_vertical_cloud_3.png",
          size: "25% 100%",
          repeat: "repeat-x"
        }
      })),
      speed: 0.15
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: -1000px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "50% 200%",
          position: "bottom center",
          repeat: "repeat-x"
        }
      })),
      speed: 0.2
    });
    this.layer.push({
      element: this.backgroundLayer.append(new Div({
        size: new Vector2(1900 * 4, 3450),
        style: "position: absolute; left: -1920px; top: 0px;",
        background: {
          type: "image",
          image: "dist/images/forest/3_Forest_parallax_vertical_mountain_back.png",
          size: "100% 400%",
          position: "bottom center",
          repeat: "repeat-x"
        }
      })),
      speed: 0.3
    });
  }
};

// ts/main/scene/desertFlight.ts
var DesertFlight = class extends Div {
  constructor(parent) {
    super({
      classNames: ["roi"],
      style: "display: flex; justify-content: center; align-items: center;"
    });
    this.parent = parent;
    this.pointerDown = false;
    this.append(this.content = new Div({
      classNames: ["content"],
      size: ["1920px", "1080px"],
      style: "transform-origin: top left; position: absolute; left: 0; top: 0;"
    }));
    this.content.append(this.bg = new DesertBackground());
    this.content.append(this.follow1 = new Plane());
    this.content.append(this.plane = new Plane());
    this.content.append(this.follow2 = new Plane());
    this.content.append(this.bg.foregroundLayer);
    this.follow1.style("scale: 0.9;");
    this.follow2.style("scale: 1.05;");
    this.follow1.sprite.value = 5;
    this.follow2.sprite.value = 0;
    this.follow1.setPosition(this.plane.position.add(new Vector2(-5e3, 40)));
    this.follow2.setPosition(this.plane.position.add(new Vector2(-4e3 - 100, 120)));
    const i = this.content.append(new Div({
      size: ["1920px", "1080px"],
      style: "position: absolute; left: 0; top: 0;"
    }));
    i.dom.addEventListener("pointerdown", (e) => {
      this.pointerDown = true;
      this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
    });
    i.dom.addEventListener("pointermove", (e) => {
      if (this.pointerDown) {
        this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
      }
    });
    i.dom.addEventListener("pointerup", (e) => {
      this.pointerDown = false;
    });
  }
  scale(factor) {
    this.scaleFactor = factor;
    this.size(["".concat(factor * 16, "px"), "".concat(factor * 9, "px")]);
    this.content.style("transform: scale(".concat(factor * 16 / 1920, ", ").concat(factor * 16 / 1920, ");"));
  }
  tick() {
    super.tick();
    this.bg.move(this.plane.speed);
    this.bg.height(this.plane.height * 2 - 1400);
    this.follow1.setTarget(this.plane.followPosition1.add(new Vector2(300 - 100, 50)));
    this.follow2.setTarget(this.plane.followPosition2.add(new Vector2(150 - 100, 120)));
    if (this.visible) {
      this.parent.forestScene.plane.setTarget(this.plane.target);
    }
    if ($.frame % 2e3 === 0) {
      $.transitions.trigger({
        from: this,
        to: this.parent.forestScene,
        inTransition: $.transitions.IN.WIPERIGHT,
        inSettings: { color: "#539ac1" },
        outTransition: $.transitions.OUT.WIPERIGHT,
        outSettings: { color: "#539ac1" }
      });
    }
  }
};

// ts/main/flightGame.ts
var FlightGame = class extends Main {
  constructor(container) {
    super(container);
    this.style("display: flex; justify-content: center; align-items: center;");
    this.append(this.forestScene = new ForestFlight(this));
    this.append(this.desertScene = new DesertFlight(this));
    this.forestScene.visible = false;
    this.desertScene.visible = false;
    $.transitions.trigger({
      to: this.forestScene,
      inTransition: $.transitions.IN.INSTANT,
      inSettings: { color: "black", duration: 100 },
      outTransition: $.transitions.OUT.FADE,
      outSettings: { color: "black" }
    });
  }
  resize() {
    super.resize();
    let factor = Math.min(
      $.size.x / 16,
      $.size.y / 9
    );
    this.forestScene.scale(factor);
    this.desertScene.scale(factor);
  }
};

// ts/util/game/ticker.ts
var Ticker = class {
  constructor() {
    this.animationFrameId = null;
    this.callbacks = /* @__PURE__ */ new Set();
    this.startTime = 0;
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.isRunning = false;
  }
  /**
   * Starts the ticker using requestAnimationFrame
   */
  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.frameCount = 0;
    this.tick();
  }
  /**
   * Stops the ticker
   */
  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  /**
   * Adds a callback to be called on each tick
   */
  addCallback(callback) {
    this.callbacks.add(callback);
  }
  /**
   * Removes a callback
   */
  removeCallback(callback) {
    this.callbacks.delete(callback);
  }
  /**
   * Removes all callbacks
   */
  clearCallbacks() {
    this.callbacks.clear();
  }
  /**
   * Gets the current average frame rate based on elapsed time and frame count
   */
  get currentFPS() {
    if (!this.isRunning || this.frameCount === 0) {
      return 0;
    }
    const elapsedSeconds = (performance.now() - this.startTime) / 1e3;
    return this.frameCount / elapsedSeconds;
  }
  /**
   * Gets whether the ticker is currently running
   */
  get running() {
    return this.isRunning;
  }
  /**
   * Gets the current frame count
   */
  get currentFrameCount() {
    return this.frameCount;
  }
  /**
   * Gets the total elapsed time since start in milliseconds
   */
  get elapsedTime() {
    if (!this.isRunning) {
      return 0;
    }
    return performance.now() - this.startTime;
  }
  tick() {
    if (!this.isRunning) {
      return;
    }
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    const elapsedTime = currentTime - this.startTime;
    this.frameCount++;
    this.lastFrameTime = currentTime;
    this.callbacks.forEach((callback) => {
      callback(deltaTime, elapsedTime, this.frameCount);
    });
    this.animationFrameId = requestAnimationFrame(() => {
      this.tick();
    });
  }
};
var ticker = new Ticker();

// ts/util/game/transitions/transitionBase.ts
var TransitionIn = class extends Div {
  constructor(defaultSettings) {
    super({
      classNames: ["transition-in"],
      size: ["100%", "100%"]
    });
    this.defaultSettings = defaultSettings;
    this.active = false;
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
    this.visible = value;
  }
  trigger(from, to, via, settings, settingsOut) {
    this.startTime = $.time;
    this.data = {
      from,
      to,
      via,
      settings,
      settingsOut
    };
    this.applySettings(settings);
    this.active = true;
  }
  applySettings(settings) {
    this.duration = (settings == null ? void 0 : settings.duration) || this.defaultSettings.duration;
  }
  tick() {
    if (this.active) {
      const p = ($.time - this.startTime) / this.duration;
      this.progress = Math.min(p, 1);
      if (p >= 1) {
        this.active = false;
        this.progress = 0;
        if (this.data.from) {
          this.data.from.visible = false;
        }
        if (this.data.via) {
          this.data.via.trigger(this.data.to, this.data.settingsOut);
        }
      }
    }
  }
};
var TransitionOut = class extends Div {
  constructor(defaultSettings) {
    super({
      classNames: ["transition-out"],
      size: ["100%", "100%"]
    });
    this.defaultSettings = defaultSettings;
    this.active = false;
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
    this.visible = value;
  }
  trigger(to, settings) {
    this.startTime = $.time;
    this.data = {
      to,
      settings
    };
    this.applySettings(settings);
    this.active = true;
    if (to) {
      to.visible = true;
    }
  }
  applySettings(settings) {
    this.duration = (settings == null ? void 0 : settings.duration) || this.defaultSettings.duration;
  }
  tick() {
    if (this.active) {
      const p = ($.time - this.startTime) / this.duration;
      this.progress = Math.min(p, 1);
      if (p >= 1) {
        this.active = false;
        this.progress = 0;
      }
    }
  }
};

// ts/util/game/transitions/transitionFade.ts
var TransitionInFade = class extends TransitionIn {
  set progress(value) {
    this.cover.style("opacity: ".concat(value, ";"));
  }
  constructor() {
    super({ duration: 400, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutFade = class extends TransitionOut {
  set progress(value) {
    this.cover.style("opacity: ".concat(1 - value, ";"));
  }
  constructor() {
    super({ duration: 400, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};

// ts/util/game/transitions/transitionInstant.ts
var TransitionInInstant = class extends TransitionIn {
  set progress(value) {
    this.cover.style("opacity: ".concat(value >= 1 ? 0 : 1, ";"));
  }
  constructor() {
    super({ duration: 0, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutInstant = class extends TransitionOut {
  set progress(value) {
    this.cover.style("opacity: ".concat(value >= 1 ? 1 : 0, ";"));
  }
  constructor() {
    super({ duration: 0, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};

// ts/util/math/ease.ts
var Ease = class {
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  static easeIn(t) {
    return t * t;
  }
  static easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  }
};

// ts/util/game/transitions/transitionWipe.ts
var TransitionInWipeLeft = class extends TransitionIn {
  set progress(value) {
    this.cover.style("transform: translateX(".concat((1 - Ease.easeIn(value)) * 100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutWipeLeft = class extends TransitionOut {
  set progress(value) {
    this.cover.style("transform: translateX(".concat(Ease.easeOut(value) * -100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: "black"
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionInWipeRight = class extends TransitionIn {
  set progress(value) {
    this.cover.style("transform: translateX(".concat((1 - Ease.easeIn(value)) * -100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutWipeRight = class extends TransitionOut {
  set progress(value) {
    this.cover.style("transform: translateX(".concat(Ease.easeOut(value) * 100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: "black"
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || "black", ";"));
  }
};

// ts/util/game/transitions/transitionLibrary.ts
var Transitions = class extends Div {
  constructor() {
    super({
      classNames: ["transitions"],
      size: ["100%", "100%"],
      style: " z-index: 100; pointer-events: none;"
    });
    this.IN = {
      FADE: new TransitionInFade(),
      WIPELEFT: new TransitionInWipeLeft(),
      WIPERIGHT: new TransitionInWipeRight(),
      INSTANT: new TransitionInInstant()
    };
    this.OUT = {
      FADE: new TransitionOutFade(),
      WIPELEFT: new TransitionOutWipeLeft(),
      WIPERIGHT: new TransitionOutWipeRight(),
      INSTANT: new TransitionOutInstant()
    };
    [...Object.values(this.IN), ...Object.values(this.OUT)].forEach((transition) => {
      this.append(transition);
      transition.active = false;
      transition.progress = 0;
    });
  }
  trigger({
    from,
    to,
    inTransition,
    inSettings,
    outTransition,
    outSettings
  }) {
    inTransition.trigger(from, to, outTransition, inSettings, outSettings);
  }
};

// ts/util/game/container.ts
var Container = class extends Div {
  constructor() {
    super({
      classNames: ["container"],
      style: "width: 100%; height: 100%; overflow: hidden;"
    });
    this.ticker = new Ticker();
    this.ticker.addCallback(this.tick.bind(this));
    this.append(this.transitions = new Transitions());
    window.addEventListener("resize", this.resize.bind(this));
  }
  resize() {
    super.resize();
  }
  tick() {
    $.frame++;
    $.time = this.ticker.elapsedTime;
    super.tick();
  }
  start() {
    this.ticker.start();
    this.resize();
  }
};

// ts/index.ts
document.addEventListener("DOMContentLoaded", async () => {
  const g = new Container();
  document.body.appendChild(g.dom);
  g.append(new FlightGame(g));
  g.start();
});
//# sourceMappingURL=index.js.map
