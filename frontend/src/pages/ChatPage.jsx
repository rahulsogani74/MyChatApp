import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import Navbar from '../components/Navbar';
import './ChatPage.css';

export default function ChatPage() {
  return (
    <div className="chat-page">
      <Navbar />
      <ChatBox />
      <ChatInput />
    </div>
  );
}