import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducers/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        // Ajouter d'autres réducteurs ici si nécessaire
    }
});

export default store;