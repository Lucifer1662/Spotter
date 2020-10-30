import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';


export default function Header() {
    let history = useHistory();
    return <AppBar style={{ position:'unset'}}>
        <Toolbar>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <div style={{ display: 'inline' }}>
                    <Typography style={{ flex: 1, display: 'inline' }} variant="h6" >
                        Spotter
                    </Typography>

                    <Button color="inherit" style={{ flex: 1, marginLeft: '15px', marginRight: '15px' }} onClick={() => { history.push("/CountReps") }} >
                        Count Reps
                    </Button>

                    <Button color="inherit" style={{ flex: 1, marginLeft: '15px', marginRight: '15px' }} onClick={() => { history.push("/CreateRep") }} >
                        Create Rep
                    </Button>

                    <Button color="inherit" style={{ flex: 1, marginLeft: '15px', marginRight: '15px' }} onClick={() => { history.push("/TrainModel") }} >
                        Train Model
                    </Button>
            </div>

            </div>
        </Toolbar>
    </AppBar >
}