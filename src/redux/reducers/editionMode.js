import { createSlice } from "@reduxjs/toolkit";

const editionMode = createSlice({
    name : "editionMode",
    initialState : false,
    reducers : {
        setEditionMode(state, action) {
            const payload = action.payload
            return payload
        }
    }

})

export const {setEditionMode} = editionMode.actions

export default editionMode.reducer