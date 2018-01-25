import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// material-ui@next
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// JSS
import { create } from 'jss';
import preset from 'jss-preset-default';
import expand from 'jss-expand';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import Demo from './Demo';

// Configure JSS
const jss = create({ plugins: [...preset().plugins, expand()] });
jss.options.createGenerateClassName = createGenerateClassName;

const theme = createMuiTheme({
  palette: {
    type: 'light'
  },
  typography: {
    fontFamily: '"Roboto"'
  }
});

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <Demo />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
