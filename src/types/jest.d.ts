import 'jest-styled-components';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value: string, options?: { modifier?: string }): R;
    }
  }
} 