import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the production gesture handlers without loading character lore or artwork.
const source = readFileSync(new URL('../character.js', import.meta.url), 'utf8');
const handlers = source.slice(source.indexOf('    let gesture = null;'), source.indexOf('    previous.hidden = next.hidden'));
function target() {
  const listeners = new Map();
  const captures = new Set();
  return {
    getBoundingClientRect() { return { left: 0, width: 300 }; },
    classList: { add() {}, remove() {} },
    addEventListener(type, fn) { listeners.set(type, fn); },
    setPointerCapture(id) { captures.add(id); },
    hasPointerCapture(id) { return captures.has(id); },
    releasePointerCapture(id) { captures.delete(id); },
    fire(type, properties = {}) {
      const event = { type, pointerId: 1, isPrimary: true, button: 0, clientX: 150, clientY: 100,
        detail: 1, prevented: false, stopped: false,
        preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; }, ...properties };
      listeners.get(type)?.(event);
      return event;
    }
  };
}
const stage = target(), previous = target(), next = target();
const changes = [];
const context = vm.createContext({ stage, previous, next, artworks: [1, 2, 3, 4], selectedIndex: 1,
  show(index) { changes.push(index); context.selectedIndex = (index + 4) % 4; } });
vm.runInContext(handlers, context);
function click(button, detail = 1) {
  if (!stage.fire('click', { detail }).stopped) button.fire('click', { detail });
}
stage.fire('pointerdown'); stage.fire('pointerup'); click(next);
assert.deepEqual(changes, [2], 'A tap advances exactly once');
stage.fire('pointerdown');
stage.fire('pointermove', { clientX: 70 });
stage.fire('pointerup', { clientX: 70 }); click(next);
assert.deepEqual(changes, [2, 3], 'A left drag advances once without a duplicate click');
stage.fire('pointerdown');
stage.fire('pointermove', { clientX: 240 });
stage.fire('pointerup', { clientX: 240 }); click(previous);
assert.equal(changes.at(-1), 2, 'A right swipe selects the previous image');
const before = changes.length;
stage.fire('pointerdown');
assert.equal(stage.fire('pointermove', { clientY: 180 }).prevented, false, 'Vertical scrolling is not prevented');
stage.fire('pointerup', { clientY: 180 }); click(next);
assert.equal(changes.length, before, 'Vertical movement does not select an image');
stage.fire('pointerdown'); stage.fire('pointermove', { clientX: 130 });
stage.fire('pointerup', { clientX: 130 }); click(next);
assert.equal(changes.length, before, 'A short drag does not accidentally select an image');
stage.fire('pointerdown'); stage.fire('pointermove', { clientX: 70 });
stage.fire('pointercancel'); click(next);
assert.equal(changes.length, before, 'A cancelled gesture does not select an image');
click(next, 0);
assert.equal(changes.length, before + 1, 'Keyboard activation works after a cancelled gesture');
stage.fire('keydown', { key: 'ArrowLeft' });
assert.equal(changes.at(-1), 2, 'Arrow keys remain available');
console.log('Portrait tap, drag, swipe, cancellation, vertical-scroll intent, and keyboard checks passed.');
const finger = (clientX, clientY = 100) => ({ clientX, clientY });
function touch(type, x, y = 100) {
  return stage.fire(type, { touches: type === 'touchend' ? [] : [finger(x, y)], changedTouches: [finger(x, y)], cancelable: true });
}
let total = changes.length;
touch('touchstart', 240); touch('touchend', 240); click(next);
assert.equal(changes.length, total + 1, 'Touch tap works without a synthesized click, and ignores a duplicate');
assert.equal(changes.at(-1), 3);
touch('touchstart', 40); touch('touchend', 40);
assert.equal(changes.at(-1), 2, 'Left-half touch goes backward');
touch('touchstart', 240);
assert.equal(touch('touchmove', 90).prevented, true);
touch('touchend', 90); click(next);
assert.equal(changes.at(-1), 3, 'Touch swipe advances exactly once');
total = changes.length;
touch('touchstart', 100); assert.equal(touch('touchmove', 100, 200).prevented, false);
touch('touchend', 100, 210); click(next);
assert.equal(changes.length, total, 'Touch vertical scrolling does not navigate');
touch('touchstart', 100);
stage.fire('touchstart', { touches: [finger(100), finger(200)] });
touch('touchend', 200);
assert.equal(changes.length, total, 'Pinching does not navigate');
touch('touchstart', 240); stage.fire('touchcancel'); touch('touchend', 80);
assert.equal(changes.length, total, 'Cancelled touch does not navigate');
console.log('Direct touch taps, swipes, duplicate clicks, vertical scrolling, pinch, and cancellation checks passed.');
