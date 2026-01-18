import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app component', () => {
  render(<App />);
  expect(document.querySelector('.app-root')).toBeInTheDocument();
});
