import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('expect sample-component to render children', () => {
  const C = () => <h1>Hello</h1>;

  render(<C />);
  expect(screen.getByRole('heading')).toHaveTextContent('Hello');
});
