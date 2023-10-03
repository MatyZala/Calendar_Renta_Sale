import './App.css';
import Modal from 'react-modal'
import Calendar from './components/Calendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';


Modal.setAppElement('#root')

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00bcd4',
      },

    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
