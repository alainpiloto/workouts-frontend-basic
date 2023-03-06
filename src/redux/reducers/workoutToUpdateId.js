import { createSlice } from "@reduxjs/toolkit";

const workoutToUpdateId = createSlice({
    name: "workoutToUpdateId",
    initialState : null,
    reducers: {
        setWorkoutToUpdateId(state, action) {
            const payload = action.payload
            return payload
        }
    }
})

export const { setWorkoutToUpdateId} = workoutToUpdateId.actions

export default workoutToUpdateId.reducer