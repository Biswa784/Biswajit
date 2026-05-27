import { configureStore } from '@reduxjs/toolkit';
import bootReducer from '../features/boot/bootSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    boot: bootReducer,
    projects: projectReducer,
  },
});
