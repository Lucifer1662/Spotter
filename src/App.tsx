import React from 'react';
import './App.css';
import CreateRep from './CreateRep';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import CountReps from './CountReps';
import TrainModel from './TrainModel';
import { ThemeProvider, createMuiTheme, Box, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

console.log(theme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="">
            <Header />
            <Box my={4} className="App-header" color="background">
              <Route path="/CreateRep" exact>
                <CreateRep />
              </Route>
              <Route path="/CountReps" exact>
                <CountReps />
              </Route>
              <Route path="/TrainModel" exact>
                <TrainModel />
              </Route>
              <Route path='*' exact={true}>
                <Redirect to="/CountReps" />
              </Route>
            </Box>
          </Route>
        </Switch>

      </BrowserRouter>


    </ThemeProvider>
  );
}

export default App;
