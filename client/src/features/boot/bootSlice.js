import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bootProgress: 0,
  bootMessages: [
    { text: 'BIOS v3.14 — Biswajit Systems Inc.', delay: 500 },
    { text: 'Checking RAM.......... 640KB OK', delay: 800 },
    { text: 'Detecting drives......', delay: 600 },
    { text: 'C:\ — 500GB SSD [HEALTHY]', delay: 700 },
    { text: 'D:\ — Portfolio Archive [MOUNTED]', delay: 700 },
    { text: 'Loading PY-OS Kernel......', delay: 1000 },
    { text: 'Initializing network interfaces... OK', delay: 800 },
    { text: 'Starting display driver... CRT_MODE ACTIVE', delay: 600 },
    { text: 'Loading modules: [React] [Next.js] [MERN] [Redux]', delay: 900 },
    { text: 'Loading AI subsystems: [LangChain] [OpenAI] [RAG]', delay: 1000 },
    { text: 'PY-OS v5.0 - All Systems Operational', delay: 800 },
    { text: 'Launching desktop environment...', delay: 1200 },
  ],
  currentMessageIndex: 0,
  bootComplete: false,
};

export const bootSlice = createSlice({
  name: 'boot',
  initialState,
  reducers: {
    incrementProgress: (state) => {
      state.bootProgress += 1;
    },
    setProgress: (state, action) => {
      state.bootProgress = action.payload;
    },
    nextMessage: (state) => {
      if (state.currentMessageIndex < state.bootMessages.length - 1) {
        state.currentMessageIndex += 1;
      } else {
        state.bootComplete = true;
      }
    },
    resetBoot: (state) => {
      state.bootProgress = 0;
      state.currentMessageIndex = 0;
      state.bootComplete = false;
    },
  },
});

export const { incrementProgress, setProgress, nextMessage, resetBoot } = bootSlice.actions;
export default bootSlice.reducer;