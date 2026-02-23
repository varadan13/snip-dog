/**
 * Event-driven architecture for loosely coupled dashboard panels — no framework needed.
 *
 * A FilterPanel dispatches a 'filters-changed' event when criteria change.
 * The dashboard shell listens and broadcasts to all filterable panels via a direct method call.
 * Panels don't know about each other. The filter doesn't know about the panels.
 * Adding a new panel = implement applyFilters(). Nothing else changes.
 *
 * Pattern: components can be developed, tested, and reused independently.
 * Scales proportionally — more panels don't add coordination complexity.
 */

// FilterPanel — dispatches when criteria change
this.dispatchEvent(new CustomEvent('filters-changed', {
  detail: { dateRange: this.selectedRange, categories: this.selectedCategories },
  bubbles: true
}));

// Dashboard shell — minimal coordinator, listens and fans out to children
document.addEventListener('filters-changed', (e) => {
  document.querySelectorAll('[data-filterable]').forEach(panel => {
    panel.applyFilters(e.detail);
  });
});

// Each panel implements its own applyFilters — isolated, independently testable
class MetricsPanel extends HTMLElement {
  applyFilters({ dateRange, categories }) {
    // re-fetch or re-render based on new filter criteria
  }
}
