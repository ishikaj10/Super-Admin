import {configureStore} from '@reduxjs/toolkit';
import appAuthSlice from './AppAuthSlice';

const store = configureStore ({
  reducer: {
    appAuth:appAuthSlice.reducer,
  },
});

export default store;
