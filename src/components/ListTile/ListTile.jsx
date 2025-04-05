import React, {useState} from 'react';
import './listtile.scss';

function ListTile({launch, itemHeight}) {
  const [view, setView] = useState(false);
  const status = launch.upcoming ? 'upcoming' : launch.launch_success ? 'success' : 'failed';
  return (
    <li key={launch.flight_number} >
      <h2>
        {launch.mission_name}({launch.launch_year})
        <span class='status'
          style={{
            backgroundColor: status === 'success' ? 'green' : 'red',
          }}
        >
          {status}
        </span>
      </h2>
      {view && (
        <div style={{ marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'gray' }}>
            {new Date(launch.launch_date_utc).toLocaleString()}
            {launch.links.article_link && (
              <>
                {' | '}
                <a
                  href={launch.links.article_link}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: 'blue', textDecoration: 'none' }}
                >
                  Article
                </a>
              </>
            )}
            {launch.links.wikipedia && (
              <>
                {' | '}
                <a
                  href={launch.links.wikipedia}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: 'blue', textDecoration: 'none' }}
                >
                  Wiki
                </a>
              </>
            )}
            {launch.links.video_link && (
              <>
                {' | '}
                <a
                  href={launch.links.video_link}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: 'blue', textDecoration: 'none' }}
                >
                  Video
                </a>
              </>
            )}
          </p>
          <div class='description'>
          {launch.links.mission_patch && (
            <img
              src={launch.links.mission_patch}
              alt='Mission Patch'
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                  marginRight: '1rem'
              }}
            />
          )}
          <p style={{fontSize: '0.9rem', color: '#333333' }}>{launch.details || 'No details available.'}</p>
          </div>
        </div>
      )}
      <button onClick={() => setView(!view)}>
        {view ? 'HIDE' : 'VIEW'}
      </button>
    </li>
  );
}

export default ListTile;
