import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Material from './components/Material';
import Course from './components/Course';
import {createMuiTheme} from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter } from 'react-router-dom';
import CodingProblem from './components/Content/Tutorial/CodingProblem';
import MCQ from './components/Content/Tutorial/MCQ';
import CodeEditor from './components/Content/Tutorial/CodeEditor';
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
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    	<CssBaseline />
    <div className="App">
      {/* <Course/> */}
      {/* <Material/> */}
     {/* <Main/> */}
<<<<<<< HEAD
       <Login/>  
     {/* <CodeEditor/> */}
=======
      <Login/> 
      {/*<CodingProblem/> */}
>>>>>>> 6a76a383b9aa6c88c9891208aaaaac83eba4cba2
{/* <MCQ />*/}
      {/*<Dashboard/>*/}
    </div>
    </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
