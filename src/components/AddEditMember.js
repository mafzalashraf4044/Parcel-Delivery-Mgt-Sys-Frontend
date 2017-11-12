import React from 'react';

//  third party libraries
import PropTypes from 'prop-types';

//  third party components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

//  styles
import './AddEditMember.css';

class AddEditMember extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          member: this.props.member,
        };
    }

    componentWillReceiveProps(newProps) {
      this.setState({
        member: newProps.member,
      });
    }

    handleChange = (e) => {
      const member = this.state.member;
      member[e.target.getAttribute('data-key')] = e.target.value;
      
      this.setState({
        member,
      });
    }

    render() {
        const {member} = this.state;
        
        return (
            <div className="add-edit-member-container paper-container">
                <Paper className="add-edit-member-paper paper" zDepth={2}>
                    <div className="header">
                        Member
                    </div>

                    <div className="add-edit-member-form form">
                        <div className="name input-field">
                            <TextField
                              type="text"
                              fullWidth
                              floatingLabelText="Name"
                              data-key="name"
                              value={member.name}
                              onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <FlatButton label="Close" labelStyle={{ color: 'red' }} onClick={this.props.close} />
                        {
                            this.props.isAddMember ?
                            <FlatButton label="Add" primary={true} onClick={() => this.props.add(member)} /> :
                            <FlatButton label="Save" primary={true} onClick={() => this.props.edit(member)} />
                        }
                    </div>

                </Paper>
            </div>
        );
    }
}

AddEditMember.propTypes = {
  member: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  isAddMember: PropTypes.bool.isRequired,
};

export default AddEditMember;