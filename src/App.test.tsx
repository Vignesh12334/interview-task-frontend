import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders B2B Frontend heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/B2B Frontend/i);
  expect(headingElement).toBeInTheDocument();
});
