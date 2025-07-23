import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/chat');
  };

  return (
    <div className="login-container">
      <h1>Welcome to MyChatApp</h1>
      <input type="text" placeholder="Enter your username" />
      <button onClick={handleLogin}>Enter Chat</button>
    </div>
  );
}