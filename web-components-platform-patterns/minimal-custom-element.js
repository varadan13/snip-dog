/**
 * The most minimal viable custom element — a starting point, not production code.
 *
 * Demonstrates how accessible the Web Components entry point is: define a class,
 * implement connectedCallback, register it. No build step, no framework, no dependencies.
 *
 * Missing from this version (intentionally): reactivity, shadow DOM encapsulation,
 * proper lifecycle handling. Iterate from here.
 */

class TaskCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="task">
        <h3>${this.getAttribute('title')}</h3>
        <p>${this.getAttribute('description')}</p>
      </div>
    `;
  }
}

customElements.define('task-card', TaskCard);

// Usage in HTML:
// <task-card title="Fix login bug" description="Users can't sign in on mobile"></task-card>
