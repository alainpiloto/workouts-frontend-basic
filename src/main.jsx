import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AllWorkoutsView from "./views/viewAllWorkouts"
import { Store } from './redux/store'
import { Provider } from "react-redux";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element:     <App />
    ,
  },
  {
    path: "/workouts",
    element : <AllWorkoutsView  />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
                <Provider store={Store}>

    <RouterProvider router={router} />
                </Provider>
  </React.StrictMode>,
)
