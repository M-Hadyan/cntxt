import { createStore } from 'redux';
import reducer from './reducer';

// Create the Redux store using the reducer
const store = createStore(reducer);

export default store;
