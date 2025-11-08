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
  stringSize() {
    return "".concat(this.x, "px ").concat(this.y, "px");
  }
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

// ts/util/math/transform.ts
var Transform2d = class _Transform2d {
  constructor(element) {
    this._position = new Vector2(0, 0);
    this._rotation = 0;
    // in degrees
    this._scale = new Vector2(1, 1);
    this._anchor = new Vector2(0, 0);
    // normalized 0-1 or pixel values
    this._cachedMatrix = null;
    this._element = element;
  }
  get position() {
    return this._position.clone();
  }
  setPosition(value, y) {
    if (typeof value === "number") {
      this._position = new Vector2(value, y != null ? y : value);
    } else {
      this._position = value.clone();
    }
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  move(value) {
    this._position = this._position.add(value);
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get rotation() {
    return this._rotation;
  }
  setRotation(value) {
    this._rotation = value;
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  rotate(value) {
    this._rotation = this._rotation + value;
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get scale() {
    return this._scale.clone();
  }
  setScale(value) {
    if (typeof value === "number") {
      this._scale = new Vector2(value, value);
    } else {
      this._scale = value.clone();
    }
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get anchor() {
    return this._anchor.clone();
  }
  setAnchor(value) {
    this._anchor = value.clone();
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  /**
   * Gets the anchor point in pixels.
   * If anchor values are between 0-1, they're treated as normalized (0-1 range).
   * Otherwise, they're treated as pixel values.
   */
  getAnchorPoint() {
    return this._anchor;
  }
  /**
   * Calculates and caches the CSS transform matrix string.
   * The matrix combines: translation, rotation, and scale with proper anchor point handling.
   * 
   * Transformation order: T(-anchor) -> Scale -> Rotate -> T(anchor) -> T(position)
   * This ensures transformations occur around the anchor point, then the element is moved to position.
   */
  calculateMatrix() {
    const anchorPoint = this.getAnchorPoint();
    const rotationRad = this._rotation * Math.PI / 180;
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    const sx = this._scale.x;
    const sy = this._scale.y;
    const anchorX = anchorPoint.x;
    const anchorY = anchorPoint.y;
    const a = sx * cos;
    const b = sx * sin;
    const c = -sy * sin;
    const d = sy * cos;
    const e = this._position.x + anchorX - anchorX * a - anchorY * c;
    const f = this._position.y + anchorY - anchorX * b - anchorY * d;
    this._cachedMatrix = "matrix(".concat(a, ", ").concat(b, ", ").concat(c, ", ").concat(d, ", ").concat(e, ", ").concat(f, ")");
    this._element.style("transform: ".concat(this._cachedMatrix, "; transform-origin: 0 0;"));
  }
  /**
   * Gets the CSS transform matrix string.
   * Returns the cached matrix if available, otherwise calculates it.
   */
  getMatrix() {
    if (this._cachedMatrix === null) {
      this.calculateMatrix();
    }
    return this._cachedMatrix;
  }
  /**
   * Gets the CSS transform-origin string based on the anchor point.
   * Note: When using getMatrix(), the anchor is baked into the matrix, so transform-origin should be 0,0.
   * This method is provided for cases where you want to use transform-origin separately.
   */
  getTransformOrigin() {
    const anchorPoint = this.getAnchorPoint();
    return "".concat(anchorPoint.x, "px ").concat(anchorPoint.y, "px");
  }
  /**
   * Gets the complete CSS transform string (matrix only, with transform-origin set to 0,0).
   * The anchor point is baked into the matrix calculation.
   */
  getCSS() {
    return "transform: ".concat(this.getMatrix(), "; transform-origin: 0 0;");
  }
  /**
   * Gets just the transform property value.
   */
  getTransform() {
    return this.getMatrix();
  }
  /**
   * Clones this transform.
   */
  clone() {
    return new _Transform2d(this._element).setPosition(this._position.clone()).setRotation(this._rotation).setScale(this._scale.clone()).setAnchor(this._anchor.clone());
  }
};

// ts/util/html/el.ts
var El = class {
  constructor(type, options) {
    this.children = [];
    this._lastDisplay = "block";
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
      this.style(options.style);
    }
    if (options.background) {
      this.style(Background.getStyle(options.background));
    }
    if (options.size) {
      this.size(options.size);
    }
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        this.dom.setAttribute(key, value);
      }
    }
    if (options.text) {
      this.dom.textContent = options.text;
    }
    if (options.html) {
      this.dom.innerHTML = options.html;
    }
    this.transform = new Transform2d(this).setPosition(options.position || new Vector2(0, 0)).setRotation(options.rotation || 0).setScale(options.scale || new Vector2(1, 1)).setAnchor(options.anchor || new Vector2(0, 0));
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    this.dom.style.display = value ? this._lastDisplay : "none";
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
    if (this.dom.style.display !== "none") {
      this._lastDisplay = this.dom.style.display || "block";
    }
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
  removeChild(child) {
    this.dom.removeChild(child.dom);
    this.children = this.children.filter((c) => c !== child);
  }
};

// ts/util/html/div.ts
var Div = class extends El {
  constructor(options = {}) {
    super("div", options);
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

// ts/main/menu/gameover.ts
var Gameover = class extends Div {
  constructor() {
    super({
      classNames: ["gameover-content"],
      style: "background: #000; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
    });
    this.append(new Div({
      classNames: ["gameover-content-inner"],
      style: "font-size: 50px; color: white; position: relative; font-family: monospace"
      // text: 'Game Over',
    }));
    this.visible = false;
  }
};

// ts/util/math/math.ts
var MathUtil = class {
  static max(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a > b ? a : b;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x > b.x ? a.x : b.x,
        a.y > b.y ? a.y : b.y
      );
    }
    throw new Error("Invalid max arguments: both arguments must be either numbers or Vector2 objects");
  }
  static min(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a < b ? a : b;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x < b.x ? a.x : b.x,
        a.y < b.y ? a.y : b.y
      );
    }
    throw new Error("Invalid min arguments: both arguments must be either numbers or Vector2 objects");
  }
  static clamp(value, min, max) {
    if (typeof value === "number" && typeof min === "number" && typeof max === "number") {
      return this.max(min, this.min(value, max));
    } else if (value instanceof Vector2 && min instanceof Vector2 && max instanceof Vector2) {
      return new Vector2(
        this.max(min.x, this.min(value.x, max.x)),
        this.max(min.y, this.min(value.y, max.y))
      );
    }
    throw new Error("Invalid clamp arguments: all arguments must be either numbers or Vector2 objects");
  }
  static lerp(a, b, t) {
    if (typeof a === "number" && typeof b === "number") {
      return a + (b - a) * t;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x + (b.x - a.x) * t,
        a.y + (b.y - a.y) * t
      );
    }
    throw new Error("Invalid lerp arguments: a and b must be either both numbers or both Vector2 objects");
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
      },
      style: "transform-origin: ".concat(options.size.x * options.columns / 2, "px ").concat(options.size.y * options.rows / 2, "px;")
    }, options));
    this.max = options.columns * options.rows;
    this.options = options;
    this.value = options.value || 0;
  }
  getSize() {
    return new Vector2(this.options.size.x * this.options.columns, this.options.size.y * this.options.rows);
  }
  set value(value) {
    this._value = Math.floor(value % this.max);
    let column = this._value % this.options.columns;
    let row = Math.floor(this._value / this.options.columns);
    this.style("background-position-x: -".concat(this.options.size.x * column, "px; background-position-y: -").concat(this.options.size.y * row, "px;"));
  }
  set factor(factor) {
    this.value = MathUtil.clamp(factor, 0, 1) * (this.max - 1);
  }
};

// ts/main/scene/plane.ts
var Plane = class extends Div {
  constructor(scale = 1, parent) {
    super({
      classNames: ["plane"],
      size: new Vector2(350, 150),
      style: "transform-origin: 175px 75px; scale(".concat(scale, "); pointer-events: none;")
    });
    this.scale = scale;
    this.parent = parent;
    this.speed = 30;
    this.maxScreenSpeed = 2;
    this.target = new Vector2(0, 0);
    this.position = new Vector2(0, 0);
    this.positions = [];
    this.random = 0;
    this.rotation = 0;
    this.crashed = false;
    this.crashTime = 0;
    this.realPosition = new Vector2(0, 0);
    this.random = Math.random() * 120;
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
  get height() {
    return this.position.y;
  }
  setPosition(v) {
    if (!this.visible)
      return;
    this.position = v;
    this.realPosition = v.clone().add(new Vector2(
      Math.sin(($.frame + this.random) / 120) * 20,
      Math.sin(($.frame + this.random) / 140) * 20
    ));
    if (this.scale !== 1) {
      this.realPosition.y = this.realPosition.y + (this.realPosition.y - 450) * 0.8 * (this.scale - 1);
      this.realPosition.x = this.realPosition.x + (this.realPosition.x - 700) * 0.8 * (this.scale - 1);
    }
    this.style("transform: translate(".concat(this.realPosition.x, "px, ").concat(this.realPosition.y, "px) scale(").concat(this.scale, ", ").concat(this.scale, ") rotate(").concat(this.rotation, "deg);"));
    this.positions.push(v);
    if (!this.crashed) {
      this.sprite.value = 6 - Math.floor(MathUtil.clamp(this.height / 1e3 * 6, 0, 6));
    } else {
      if (this.scale < 1) {
        this.sprite.value = 6;
        this.scale = MathUtil.max(this.scale - 5e-4, 0.2);
      }
      if (this.scale > 1) {
        this.sprite.value = 0;
        this.scale = MathUtil.min(this.scale + 2e-3, 2);
      }
    }
    while (this.positions.length < 20) {
      this.positions.push(v);
    }
    while (this.positions.length > 20) {
      this.positions.shift();
    }
  }
  getFollowPosition(n, max) {
    return this.positions[Math.min(Math.floor(n / max * 20), 19)].add(new Vector2(175, 75));
  }
  setTarget(v) {
    this.target = v;
  }
  crash() {
    if (this.crashed)
      return;
    this.crashed = true;
    this.crashTime = $.time;
    this.style("filter: brightness(0.7);");
  }
  impact() {
    if (!this.crashed)
      return;
    if (!this.visible)
      return;
    this.parent.explodeGround(this);
    this.visible = false;
  }
  tick() {
    super.tick();
    if (!this.visible && this.scale !== 1)
      return;
    this.exhaustHigh.value = Math.floor($.time / 100);
    this.exhaustLow.value = Math.floor($.time / 100);
    const lastPosition = this.position.clone();
    if (this.crashed) {
      this.setPosition(new Vector2(this.position.x - ($.time - this.crashTime) * 4e-3, this.position.y + ($.time - this.crashTime) * 4e-3));
      this.rotation = Math.min(this.rotation + ($.time - this.crashTime) * 5e-5 * $.intervalMultiplier, 10);
      this.speed = MathUtil.max(this.speed - ($.time - this.crashTime) * 1e-4, 0);
      if (this.scale !== 1 && this.realPosition.y > 1e3) {
        this.impact();
      }
      if (this.scale === 1 && this.position.y > 800 / this.scale) {
        this.impact();
      }
    } else {
      this.setPosition(this.position.moveTowards(this.target.subtract(new Vector2(175, 75)), this.maxScreenSpeed * $.intervalMultiplier));
    }
    const delta = this.position.subtract(lastPosition).x + this.speed;
    if (!this.crashed && delta > 31) {
      this.exhaustHigh.visible = true;
      this.exhaustLow.visible = false;
    } else if (!this.crash && delta > 28) {
      this.exhaustHigh.visible = false;
      this.exhaustLow.visible = true;
    } else {
      this.exhaustHigh.visible = false;
      this.exhaustLow.visible = false;
    }
  }
};

// ts/util/game/particles/particle.ts
var Particle = class extends Div {
  constructor(parent, asset, position, duration, scale = 1, offsetStart = 0) {
    super({
      scale: new Vector2(scale, scale),
      position,
      anchor: new Vector2(0.5, 0.5)
    });
    this.parent = parent;
    this.asset = asset;
    this.duration = duration;
    this.offsetStart = offsetStart;
    this.append(this.asset);
    this.start = $.time - offsetStart;
    parent.append(this);
  }
  tick() {
    super.tick();
    const progress = ($.time - this.start) / this.duration;
    this.asset.factor = progress;
    if (progress >= 1) {
      this.remove();
    }
  }
  remove() {
    this.parent.removeChild(this);
  }
};

// ts/util/game/particles/explosion/explosionHit.ts
var ExplosionHit = class extends Particle {
  constructor(parent, position, duration = 400, scale = 1, offsetStart = 0) {
    super(parent, new Sprite({
      image: "dist/images/explosion/hit.png",
      size: new Vector2(48, 48),
      columns: 7,
      rows: 1
    }), position, duration, scale, offsetStart);
  }
};

// ts/util/game/particles/explosion/explosionGround.ts
var ExplosionGround = class extends Particle {
  constructor(parent, position, duration = 400, scale = 1, offsetStart = 0) {
    super(parent, new Sprite({
      image: "dist/images/explosion/down.png",
      size: new Vector2(128, 128),
      columns: 12,
      rows: 1
    }), position, duration, scale, offsetStart);
  }
};

// ts/main/scene/flight.ts
var Flight = class extends Div {
  constructor(parent, bg) {
    super({
      classNames: ["roi"],
      style: "display: flex; justify-content: center; align-items: center;"
    });
    this.parent = parent;
    this.pointerDown = false;
    this.lives = 5;
    this.explosions = [];
    this.append(this.content = new Div({
      classNames: ["content"],
      size: ["1920px", "1080px"],
      style: "transform-origin: top left; position: absolute; left: 0; top: 0;"
    }));
    this.content.append(this.bg = bg);
    this.bg.style("z-index: 10;");
    this.content.append(this.follow1 = new Plane(0.7, this));
    this.follow1.style("z-index: 11;");
    this.content.append(this.follow2 = new Plane(0.85, this));
    this.follow2.style("z-index: 12;");
    this.content.append(this.plane = new Plane(1, this));
    this.plane.style("z-index: 13;");
    this.content.append(this.follow3 = new Plane(1.15, this));
    this.follow3.style("z-index: 14;");
    this.content.append(this.bg.foregroundLayer);
    this.bg.foregroundLayer.style("z-index: 15;");
    this.content.append(this.follow4 = new Plane(1.4, this));
    this.follow4.style("z-index: 16;");
    this.follow1.setPosition(this.plane.position.add(new Vector2(-4500, 120)));
    this.follow2.setPosition(this.plane.position.add(new Vector2(-3e3, 120)));
    this.follow3.setPosition(this.plane.position.add(new Vector2(-3e3, 120)));
    this.follow4.setPosition(this.plane.position.add(new Vector2(-4500, 120)));
    this.plane.style("filter: hue-rotate(72deg);");
    this.follow1.style("filter: hue-rotate(144deg);");
    this.follow2.style("filter: hue-rotate(216deg);");
    this.follow3.style("filter: hue-rotate(288deg);");
    this.follow4.style("filter: hue-rotate(360deg);");
    const i = this.content.append(new Div({
      size: ["1920px", "1080px"],
      style: "position: absolute; left: 0; top: 0; z-index: 100;"
    }));
    i.dom.addEventListener("pointerdown", (e) => {
      if (e.button == 1) {
        this.hit();
      } else if (e.button == 0) {
        this.pointerDown = true;
        this.plane.setTarget(new Vector2(e.offsetX, e.offsetY));
      }
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
  hit() {
    if (this.plane.crashed)
      return;
    this.lives--;
    if (this.lives <= 0) {
      this.plane.crash();
      this.gameOver();
      this.explode(this.plane.realPosition, this.plane.dom.style.zIndex);
    } else {
      const plane = [this.follow1, this.follow2, this.follow3, this.follow4].filter((plane2) => !plane2.crashed).sort((a, b) => Math.random() - 0.5)[0];
      plane.crash();
      this.explode(plane.realPosition, plane.dom.style.zIndex);
    }
  }
  explode(v, zIndex) {
    for (let i = 0; i < Math.random() * 20 + 5; i++) {
      const explosion = new ExplosionHit(this.content, v.add(new Vector2(Math.random() * 200, Math.random() * 100)), 700, Math.random() * 2 + 2, Math.random() * 100 + i * 250);
      explosion.style("z-index: ".concat(zIndex, ";"));
    }
  }
  explodeGround(plane) {
    const explosion = new ExplosionGround(this.content, plane.realPosition.add(new Vector2(-80, -180)), 1e3, 4 * plane.scale, 0);
    explosion.style("z-index: ".concat(plane.dom.style.zIndex, ";"));
    this.explosions.push(explosion);
  }
  gameOver() {
    $.transitions.trigger({
      from: this,
      to: this.parent.gameover,
      inTransition: $.transitions.IN.FADE,
      inSettings: { color: "black", duration: 5e3 },
      outTransition: $.transitions.OUT.FADE,
      outSettings: { color: "black", duration: 500 }
    });
  }
  set visible(value) {
    super.visible = value;
    if (!value) {
      this.pointerDown = false;
    }
  }
  get visible() {
    return super.visible;
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
    this.follow2.setTarget(this.plane.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
    this.follow3.setTarget(this.plane.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));
    if (this.follow2.crashed) {
      this.follow1.setTarget(this.plane.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
    } else {
      this.follow1.setTarget(this.follow2.getFollowPosition(2, 4).subtract(new Vector2(100, 40)));
    }
    if (this.follow3.crashed) {
      this.follow4.setTarget(this.plane.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));
    } else {
      this.follow4.setTarget(this.follow3.getFollowPosition(3, 4).subtract(new Vector2(100, -40)));
    }
    this.explosions.forEach((explosion) => {
      explosion.transform.move(new Vector2(-this.plane.speed / $.intervalMultiplier * 0.5, 0));
    });
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
      layer.element.style("margin-top: ".concat(MathUtil.clamp(height, -2e3, 500) * -layer.speed + 100, "px;"));
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

// ts/main/flightGame.ts
var FlightGame = class extends Main {
  constructor(container) {
    super(container);
    this.style("display: flex; justify-content: center; align-items: center;");
    this.append(this.forestScene = new Flight(this, new ForestBackground()));
    this.append(this.gameover = new Gameover());
    this.forestScene.visible = false;
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
