// src/lib/utils.js

/**
 * Utility functions for class name concatenation
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
