import {configureStore} from '@reduxjs/toolkit';
import genreReducer from './reducers/genre';
import playerReducer from './reducers/player';
import homeReducer from './reducers/home';
import demandReducer from './reducers/demand';
import cinemaReducer from './reducers/cinema';
import packagesReducer from './reducers/packages';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    player: playerReducer,
    home: homeReducer,
    demand: demandReducer,
    cinema: cinemaReducer,
    packages: packagesReducer,
  },
});
