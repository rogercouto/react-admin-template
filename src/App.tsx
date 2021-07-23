import { ThemeProvider } from '@material-ui/core';

import Template from './components/template';
import Routes from './routes';

import myTheme from './theme';

import ToastContextProvider from './providers/toastContextProvider';

const App: React.FC = ( props : any) => {
  
    return (
      <ToastContextProvider>
        <ThemeProvider theme={myTheme}>
          <Template>
            <Routes></Routes>
          </Template>
        </ThemeProvider>
      </ToastContextProvider>
    );
};

export default App;
