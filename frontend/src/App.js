import './App.css';
import Main from './components/Main';
import Dashboard from './components/Dashboard/Dashboard';
import {createMuiTheme} from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//To Change Default Material UI Theme
const theme=createMuiTheme({
	palette:{
		primary:{
			500:"rgb(7, 54, 64);"
		}
	}
});



function App() {
  return (
    <ThemeProvider theme={theme}>
    	<CssBaseline />
    <div className="App">
      <Dashboard/>{/* Testing */}
    </div>
    </ThemeProvider>
  );
}

export default App;
