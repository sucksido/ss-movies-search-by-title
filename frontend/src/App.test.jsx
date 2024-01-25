const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const fetchMock = require('jest-fetch-mock');
const App = require('./App');

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('performs a search and displays results', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      Search: [{ imdbID: '1', Title: 'Movie 1', Year: '2022' }],
    }));

    const { getByText, getByRole, getByPlaceholderText } = render(<App />);

    const searchInput = getByPlaceholderText('Search');
    const searchButton = getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'Movie' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByText('Movie 1 - 2022')).toBeInTheDocument();
    });
  });
});