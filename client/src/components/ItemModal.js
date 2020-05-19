import React, { Component } from 'react';
import {connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }
    this.props.addItem(newItem);
    this.toggle();
  }

  onChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? <Button color="dark" onClick={this.toggle} className="mb-3 ml-3">
          Add Item
        </Button>:<h4 className="mb-3 ml-3">Please login to manage items.</h4>
        }
        
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
          <ModalHeader
          toggle = {this.toggle}
          >
            Add To Shoping List
          </ModalHeader>

          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input type="text" name="name" id="item" 
                placeholder="Add Shopping Item" onChange={this.onChange}></Input>
              </FormGroup>
              <Button className="w-100" color="dark">Add item</Button>
            </Form>
          </ModalBody>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal)