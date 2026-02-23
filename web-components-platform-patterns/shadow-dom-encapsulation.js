/**
 * Shadow DOM for style encapsulation that actually encapsulates.
 *
 * Styles defined inside the shadow root affect only this component — they don't
 * leak out, and global styles don't leak in. Use simple, semantic class names
 * without worrying about collisions. Refactor styles without breaking anything elsewhere.
 *
 * This is what CSS Modules, CSS-in-JS, BEM, and scoped styles have all tried to achieve —
 * built directly into the browser platform.
 *
 * `<slot name="title">` — named slot for projected content.
 * `<slot>`              — default slot for all other projected children.
 */

class StyledCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .card { padding: 1rem; border-radius: 8px; background: #f5f5f5; }
        h3 { margin: 0 0 0.5rem 0; color: #333; }
      </style>
      <div class="card">
        <h3><slot name="title"></slot></h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('styled-card', StyledCard);

// Usage in HTML:
// <styled-card>
//   <span slot="title">My Card Title</span>
//   <p>Card body content projected via default slot.</p>
// </styled-card>
