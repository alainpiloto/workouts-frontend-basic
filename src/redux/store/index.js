import { configureStore } from "@reduxjs/toolkit";

import editionMode from "../reducers/editionMode";
import workouts from "../reducers/workouts";
import workoutToUpdateId from "../reducers/workoutToUpdateId";

export const Store = configureStore({
    reducer: {
        workouts,
        editionMode,
        workoutToUpdateId
    },
    devTools : true
})