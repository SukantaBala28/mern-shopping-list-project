import React, { Component } from 'react';
import {connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
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
        <Button color="dark" onClick={this.toggle} className="mb-3"> 
          Add Item
        </Button>
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
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal)