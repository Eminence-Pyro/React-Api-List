import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [{ id: 1, name: "Rick", species: "Human", image: "" }] }),
    })
  );
});

test('renders loading state', () => {
  render(<App />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders character after loading', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText(/Rick/i)).toBeInTheDocument());
});

test('renders error message on failure', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

  render(<App />);
  await waitFor(() => expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument());
});
