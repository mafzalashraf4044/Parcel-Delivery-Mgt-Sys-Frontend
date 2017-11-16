import React from 'react';

//  third party libraries
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

//  third party components
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

//  styles
import './ViewTask.css';

//  redux
import { connect } from 'react-redux';
import * as Actions from '../actions';

//  constants
import { LOCATION_LABELS } from '../constants';

class ViewTask extends React.Component {
    constructor(props) {
        super(props);

        this.geocoder = new window.google.maps.Geocoder();
        
        this.state = {
          showMarkersData: false,
          viewPath: false,
          task: this.props.task,
          yourAddress: '',
        };
    }

    render() {
        return (
            <div className={`view-task-container paper-container ${this.state.viewPath > 0 && 'view-path'}`}>
                <Paper className="view-task-paper paper" zDepth={2}>
                    <div className="header">
                        Task
                    </div>

                    <div className="actions">
                        <div className="actions-left">
                          {
                            this.state.task.markers[0].label === 'A' &&
                            <FlatButton label="View Path" primary onClick={this.calculatePath} />
                          }
                          {
                            (this.state.task.markers[0].label === 'A' && this.state.task.markers.length > 0) &&
                            <IconButton
                              className="next-prev"
                              onClick={this.toggleMarkersData}
                              iconClassName={`zmdi zmdi-chevron-${this.state.showMarkersData ? 'left' : 'right'}`}
                            />
                          }
                        </div>
                        <div className="action-right">
                          <FlatButton label="Close" labelStyle={{ color: 'red' }} onClick={this.props.close} />
                        </div>
                    </div>
                    {
                      this.state.viewPath > 0 &&
                      <div
                          className="toggle-view-path-btn"
                          onClick={this.toggleViewPath}>
                          <FontIcon className="zmdi zmdi-caret-left"/>
                      </div>
                    }
                </Paper>
            </div>
        );
    }
}

ViewTask.propTypes = {
  task: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  markersLimit: state.markersLimit,
  markers: state.markers,
  directions: state.directions,
});

const mapDispatchToProps = (dispatch) => ({
  setMarkersLimit: markersLimit => dispatch(Actions.setMarkersLimit(markersLimit)),
  saveMarkers: markers => dispatch(Actions.saveMarkers(markers)),
  setDirections: directions => dispatch(Actions.setDirections(directions)),
  getMinDistance: markers => dispatch(Actions.getMinDistance(markers)),
  setLoader: loader => dispatch(Actions.setLoader(loader)),
  setResponseMsg: responseMsg => dispatch(Actions.setResponseMsg(responseMsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask);