// In App.js
import React, { useState, useEffect } from 'react';
import ListComponent from './components/ListComponent';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCharacters(data.results.slice(0, 10)); // First 10 characters
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    return (
    <div>
      <h1>Rick and Morty Characters</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ListComponent
          items={characters}
          renderItem={(character) => (
            <div>
              <img src={character.image} alt={character.name} width="50" />
              <p>{character.name} ({character.species})</p>
            </div>
          )}
          emptyMessage="No characters found"
        />
      )}
    </div>
  );
};

export default App;

