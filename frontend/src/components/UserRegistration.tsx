import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setUserId } from '../store/userSlice';
import axios from 'axios';
import styles from './UserRegistration.module.css';
import { RootState } from '../store';

const UserRegistration: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users', { username });
      dispatch(setUserId(res.data._id));
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Enter Username:</h2>
      <input
        className={styles.input}
        value={username}
        onChange={(e) => dispatch(setUsername(e.target.value))}
        placeholder="Enter your username"
      />
      <button className={styles.button} onClick={handleRegister}>Join</button>
    </div>
  );
};

export default UserRegistration;
