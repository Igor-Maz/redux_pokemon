import {combineReducers} from 'redux';
import pokemonListReducer from './pokemonListReducer';

const rootReducer = combineReducers({
    pokemonList: pokemonListReducer
})

export default rootReducer;

// const reducer = (state = [], action) => {
//     return state
// }

// export default combineReducers({
//     reducer
// })
