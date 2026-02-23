/**
 * Native CustomEvent as a component communication mechanism — data down, events up.
 *
 * A component deep in the UI hierarchy dispatches a bubbling event. Any ancestor
 * can listen without the emitter needing to know who's listening. No global store,
 * no prop drilling, no context providers — the DOM itself is the event bus.
 *
 * `bubbles: true`  — event travels up the DOM tree automatically.
 * `composed: true` — event crosses shadow DOM boundaries (required for web components).
 */

// Inside a child component — dispatches when user selects an item
this.dispatchEvent(new CustomEvent('item-selected', {
  detail: { itemId: this.selectedId, metadata: this.itemData },
  bubbles: true,
  composed: true
}));

// Inside a parent/ancestor component — listens without tight coupling
this.addEventListener('item-selected', (e) => {
  console.log('Selected item:', e.detail.itemId);
});
