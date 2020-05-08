import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import {connect } from 'redux';
import {getItems} from '../actions/ItemActions';

import PropTypes from 'prop-types';



class ShoppingList extends Component {
	// state = {
	// 	items: [
  //     {id: uuidv4(), name: "Item 1"},
  //     {id: uuidv4(), name: "Item 2"},
  //     {id: uuidv4(), name: "Item 3"},
  //     {id: uuidv4(), name: "Item 4"},
  //   ]
	// }

	render() {
    const { items } = this.state;
		return (
			<Container>
        <Button color="dark"
        className="mb-3"
        onClick={ () => {
          const name = prompt('Enter Item');
          this.setState(state => ({
            items: [...state.items, {id: uuidv4(), name: name}]
          }))
        }}
        >
          Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            { items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    this.setState({
                      items: this.state.items.filter(item => item.id !== id)
                    })
                  }}
                  >
                    &times;
                  </Button>
                  { name }
                </ListGroupItem>
              </CSSTransition>
            )) }
          </TransitionGroup>
        </ListGroup>

      </Container>
		)
	}
}

const mapStateToProps = (state) =>({
  item: state.item
})

export default connect(mapStateToProps, {getItems} )(ShoppingList)