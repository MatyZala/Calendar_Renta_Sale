import './App.css';
import Modal from 'react-modal'
import Calendar from './components/Calendar';

Modal.setAppElement('#root')

function App() {
  return (
    <Calendar />
  );
}

export default App;
