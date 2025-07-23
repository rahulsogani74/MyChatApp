import React from 'react';
import styles from './UserRegistration.module.css';

export default function UserRegistration({ username, setUsername, register }) {
  return (
    <div className={styles.container}>
      <h2>Enter Username:</h2>
      <input
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button className={styles.button} onClick={register}>Join</button>
    </div>
  );
}
