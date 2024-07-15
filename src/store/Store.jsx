import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Ajouter d'autres réducteurs ici si nécessaire
    }
});

export default store;