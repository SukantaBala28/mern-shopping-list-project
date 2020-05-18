import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidUpdate(prevProps) {
    const { error , isAuthenticated} = this.props;
    if( error != prevProps.error ) {
      //Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.message })
      } else {
        this.setState({ msg: null });
      }
    }

    //If Authenticated close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {name, email, password } = this.state;
    //Create newuser
    const newUser = {
      name: name,
      email: email,
      password: password
    }
    this.props.register(newUser);
    // this.toggle();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>

          <ModalBody>
            { this.state.msg? <Alert color="danger">{this.state.msg}</Alert> : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
              </FormGroup>
              <Button className="w-100" color="dark">
                Register
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
