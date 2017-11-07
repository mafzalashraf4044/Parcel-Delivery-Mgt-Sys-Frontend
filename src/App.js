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

  logout = () => {
    this.setState(prevState => ({
      user: null,
      isLoggedIn: false,
    }));
  }

  getDrawer = () => {
    return this.state.user.isAdmin ? <AdminDrawer user={this.state.user} logout={this.logout} /> : <UserDrawer user={this.state.user} logout={this.logout} />;
  }

  setIsLoggedIn = (isLoggedIn, user) => {
    this.setState({
      user,
      isLoggedIn,
    })
  }
  
  closeSnackbar = () => {
    this.props.setResponseMsg(null);
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
          {
            this.props.loader &&
            <div className="loader">
              <img src="https://www.willitmaketheboatgofaster.com/wp-content/themes/wimtbgf/images/loading.gif" alt="loader"/>
            </div>
          }
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