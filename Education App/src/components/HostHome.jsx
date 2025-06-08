import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('host');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-generate room ID on first load
  useEffect(() => {
    const generateRoomId = () => 'room-' + Math.random().toString(36).substr(2, 6);
    setRoomId(generateRoomId());
  }, []);

  const handleJoin = () => {
    if (!roomId.trim() || !name.trim()) {
      setError('Room ID and Name are required.');
      return;
    }

    setError('');
    localStorage.setItem('username', name); // used in Room.jsx
    navigate(`/room/${roomId}?role=${role}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: 20 }}>🎥 Join Live Stream</h2>

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
        <option value="host">Host</option>
        <option value="cohost">Cohost</option>
        <option value="audience">Audience</option>
      </select>

      {/* Role-based preview UI */}
      {role === 'host' && (
        <div style={styles.previewBox}>
          <strong>Host Preview:</strong> Start the stream, control participants, and manage chat.
        </div>
      )}
      {role === 'cohost' && (
        <div style={styles.previewBox}>
          <strong>Cohost Preview:</strong> Share your mic/cam and help manage the session.
        </div>
      )}
      {role === 'audience' && (
        <div style={styles.previewBox}>
          <strong>Audience Preview:</strong> Watch live, send messages, no mic/cam access.
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleJoin} style={styles.button}>
        🚪 Join Room
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: 40,
    maxWidth: 400,
    margin: '80px auto',
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  input: {
    padding: 10,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  previewBox: {
    background: '#f9f9f9',
    padding: '12px',
    border: '1px dashed #ccc',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
    color: '#333',
  },
};

export default Home;
