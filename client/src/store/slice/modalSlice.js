  import { createSlice } from "@reduxjs/toolkit";


  const modalSlice = createSlice({

    name: "modal",

    initialState: {
      type: "",
      isOpen: false
    },

    reducers: {
      openModal: (state, actions) => {
        state.type = actions.payload;
        state.isOpen = true;
      },
      closeModal: (state) => {
        state.type = "";
        state.isOpen = false;
      }
    },
  });

export const { openModal , closeModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice;
