import React from 'react';
import './App.css';
import CreateRep from './CreateRep';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import CountReps from './CountReps';
import TrainModel from './TrainModel';
import { ThemeProvider, createMuiTheme, Box, CssBaseline } from '@material-ui/core';
import DownloadLocalModels from './DownloadLocalModels';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/Spotter/">
            
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
              <Route path="/DownloadLocalModels" exact>
                <DownloadLocalModels />
              </Route>
              <Route path='*' exact={true}>
                <Redirect to="/Spotter/CountReps" />
              </Route>
            </Box>
          </Route>
        </Switch>

      </BrowserRouter>


    </ThemeProvider>
  );
}

export default App;
