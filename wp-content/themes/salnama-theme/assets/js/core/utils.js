/**
 * Utility Functions for Salnama Theme.
 */

/**
 * Checks if the current viewport width is considered desktop (min-width: 1024px).
 * @returns {boolean} True if desktop, false otherwise.
 */
export const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
