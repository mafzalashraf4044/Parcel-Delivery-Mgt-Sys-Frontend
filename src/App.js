import React from "react"

//  custom compnents
import LoginForm from './components/LoginForm';
import AdminDrawer from './components/AdminDrawer';
import UserDrawer from './components/UserDrawer';
import GoogleMapContainer from './components/GoogleMapContainer';

//  third party components
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//  redux
import { connect } from 'react-redux';
import * as Actions from './actions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoggedIn: false,
    };
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary2Color: '#7487d4',
        pickerHeaderColor: '#7487d4',
      },
    });


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app-container">

        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  markersLimit: state.markersLimit,
  markers: state.markers,
  directions: state.directions,
  loader: state.loader,
  responseMsg: state.responseMsg,
});

const mapDispatchToProps = (dispatch) => ({
  saveMarkers: markers => dispatch(Actions.saveMarkers(markers)),
  setResponseMsg: responseMsg => dispatch(Actions.setResponseMsg(responseMsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);