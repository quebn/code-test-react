import React, {useEffect, useState, useCallback, useRef} from 'react';
import Spinner from './components/Spinner/index.js';
import ListTile from './components/ListTile/index.js';
import SearchBar from './components/SearchBar/index.js';
import './App.css';

function App() {
  const [launches, setLaunches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const [limit, setLimit] = useState(10);
  const itemHeight = 80;
  const containerHeight = itemHeight * limit;

  const fetchLaunches = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}?sort=launch_date_utc&order=desc`
      );
      const data = await response.json();
      if (data.length < limit) setHasMore(false);
      setLaunches(prev => [...prev, ...data]);
      setOffset(prev => prev + limit);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [offset, loading, hasMore]);

  useEffect(() => {
      fetchLaunches();
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;

    if (nearBottom) fetchLaunches();
  };

  const filteredLaunches = launches.filter(launch =>
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && initialLoad) {
    return <Spinner/>;
  }

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${containerHeight}px`,
          overflowY: 'auto',
          border: '1px solid #cccccc',
          padding: '1rem',
          borderRadius: '8px'
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredLaunches
            .map(launch => (
            <ListTile launch={launch} itemHeight={itemHeight} />
          ))}
        </ul>

        {loading && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Spinner/>
          </div>
        )}
        {!hasMore && filteredLaunches.length === launches.length && (
          <p style={{ textAlign: 'center', color: '#888888' }}>No more launches to load.</p>
        )}
      </div>
    </div>
  );}

export default App;
