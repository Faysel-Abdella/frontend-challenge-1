
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Silence React 18 Strict Mode double mount console warnings in tests
const originalError = console.error;
console.error = (...args: any[]) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: The current testing environment/.test(args[0]) ||
    /Warning: ReactDOM.render has not been supported/.test(args[0])
  ) {
    return;
  }
  originalError(...args);
};

// Mock window.matchMedia which is not available in Jest environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
