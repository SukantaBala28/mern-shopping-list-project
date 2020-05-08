import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './actions/types'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    {id: uuidv4(), name: "Item 1"},
    {id: uuidv4(), name: "Item 2"},
    {id: uuidv4(), name: "Item 3"},
    {id: uuidv4(), name: "Item 4"},
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state
      }
    default:
      return state;
  }
}