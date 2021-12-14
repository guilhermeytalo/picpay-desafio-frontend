import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import GlobalStyles from './styles/global';
import defaultTheme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
