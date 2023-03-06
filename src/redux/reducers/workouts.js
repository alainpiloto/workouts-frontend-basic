import { createSlice } from "@reduxjs/toolkit";

const workouts = createSlice({
    name : "workouts",
    initialState : [],
    reducers : {
        setWorkouts(state, action) {
            const payload = action.payload
            return payload
        }
    }

})

export const {setWorkouts} = workouts.actions

export default workouts.reducer