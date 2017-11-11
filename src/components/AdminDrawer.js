import React from 'react';

//  third party libraries
import PropTypes from 'prop-types';

//  third party components
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

//  custom components
import AddEditMember from './AddEditMember';
import AssignTask from './AssignTask';
import MemberListItem from './MemberListItem';
import ViewAllTasks from './ViewAllTasks';

//  styles
import './AdminDrawer.css';

//  redux
import { connect } from 'react-redux';
import * as Actions from '../actions';

class AdminDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: true,
            memberIndexForAssignTask: -1,
            memberIndexForViewAllTasks: -1,
            selectedMemberIndex: -1,
            memberToBeCreated: null,
            members: [],
        };
    }

    componentDidMount() {
        this.props.setLoader(true);
        
        this.props.getMembers().then((res) => {
            if (res.status === 200) {
                this.setState({
                    members: res.data.data.members,
                }, () => {
                    this.props.setLoader(false);
                });
            }
        }).catch((err) => {
            this.props.setLoader(false);
            this.props.setResponseMsg(err.response.data.msg);
        });
    }

    toggleDrawer = () => {
        this.setState(prevState => ({
            isDrawerOpen: !prevState.isDrawerOpen,
        }));
    }

    render() {
        return (
            <div className="drawer-container">
                <div className="main-drawer">
                    <Drawer width="25%" open={this.state.isDrawerOpen}>
                        <div className="header">
                            <div className="user-info">
                                <div className="avatar">
                                    <Avatar src="https://www.aber.ac.uk/staff-profile-assets/img/noimg.png" />
                                </div>
                                <div className="user-name">{this.props.user.name}</div>
                            </div>

                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon color="#ffffff"/></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Add Member" onClick={this.openAddMember}/>
                                <MenuItem primaryText="Sign out" onClick={this.props.logout} />
                            </IconMenu>
                        </div>

                        <div>
                            <List>
                                <Subheader>Team Members</Subheader>
                                {
                                    this.state.members.map((member, index) => 
                                        <MemberListItem
                                            key={index}
                                            index={index}
                                            member={member}
                                            openAssignTask={this.openAssignTask}
                                            openEditMember={this.openEditMember}
                                            deleteMember={this.deleteMember}
                                            toggleViewAllTasks={this.toggleViewAllTasks}
                                        />
                                    )
                                }
                            </List>
                            <Divider />
                        </div>

                    </Drawer>
                    <div
                        className={`toggle-drawer-btn ${this.state.isDrawerOpen && 'drawer-open'}`}
                        onClick={this.toggleDrawer}>
                        <FontIcon className="zmdi zmdi-caret-right"/>
                    </div>
                </div>

            </div>
        );
    }
}

AdminDrawer.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    saveMarkers: markers => dispatch(Actions.saveMarkers(markers)),
    getMembers: () => dispatch(Actions.getMembers()),
    addMember: member => dispatch(Actions.addMember(member)),
    editMember: member => dispatch(Actions.editMember(member)),
    deleteMember: memberId => dispatch(Actions.deleteMember(memberId)),
    addTask: task => dispatch(Actions.addTask(task)),
    setLoader: loader => dispatch(Actions.setLoader(loader)),
    setResponseMsg: responseMsg => dispatch(Actions.setResponseMsg(responseMsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDrawer);