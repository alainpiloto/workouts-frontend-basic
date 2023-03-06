import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditionMode,
  setWorkoutToUpdateId,
  setWorkouts,
} from "../../redux/reducers";

function Workouts(props) {
  const workouts = useSelector((state) => state.workouts);
  const workoutToUpdateId = useSelector((state) => state.workoutToUpdateId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loadDataToUpdate = (workoutId) => {
    dispatch(setEditionMode(true));
    dispatch(setWorkoutToUpdateId(workoutId));
    navigate("/");
  };

  const deleteWorkout = async (id) => {
    try {
      axios
        .delete(`http://localhost:3000/api/v1/workouts/${id}`)
        .then((response) => {
          const workoutsFiltered = workouts.filter(
            (workout) => workout.id !== id
          );
          dispatch(setWorkouts(workoutsFiltered));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/workouts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data), dispatch(setWorkouts(data.data));
      })
      .catch((err) => console.error(err));
  }, []);

  console.log({ workouts });

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts?.map((workout) => (
          <li key={workout.id}>
            <h2>{workout.name}</h2>
            <p>
              <strong>Mode: </strong> {workout.mode}
            </p>
            <p>
              <strong>Equipment: </strong> {workout.equipment.join(", ")}
            </p>
            <p>
              <strong>Exercises:</strong>
            </p>
            <ul>
              {workout.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
            <p>
              <strong>Created at:</strong> {workout.createdAt}
            </p>
            <p>
              <strong>Updated at:</strong> {workout.updatedAt}
            </p>
            <p>
              <strong>Trainer tips:</strong>
            </p>
            <ul>
              {workout.trainerTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <button
              onClick={() => deleteWorkout(workout.id)}
              className="delete_button">
              Delete
            </button>
            <button
              onClick={() => loadDataToUpdate(workout.id)}
              className="update_button">
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
