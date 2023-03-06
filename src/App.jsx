import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setEditionMode, setWorkoutToUpdateId } from "./redux/reducers";

export default function WorkoutForm(props) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [trainerTips, setTrainerTips] = useState([]);

  const workoutToUpdateId = useSelector((state) => state.workoutToUpdateId);
  const editionMode = useSelector((state) => state.editionMode);
  const workouts = useSelector((state) => state.workouts);

  const dispatch = useDispatch();

  const fillFormToUpdate = () => {
    const workoutToUpdate = workouts.filter(
      (workout) => workout.id === workoutToUpdateId
    )[0];
    setName(workoutToUpdate.name);
    setMode(workoutToUpdate.mode);
    setEquipment(workoutToUpdate.equipment.join(", "));
    setExercises(workoutToUpdate.exercises.join(", "));
    setTrainerTips(workoutToUpdate.trainerTips.join(", "));
  };

  useEffect(() => {
    if (workoutToUpdateId) {
      fillFormToUpdate();
    }
  }, [editionMode]);

  const clearForm = () => {
    setName("");
    setMode("");
    setEquipment([]);
    setExercises([]);
    setTrainerTips([]);
  };

  const createWorkout = (newWorkout) => {
    const { name, mode, equipment, exercises, trainerTips } = newWorkout;

    axios
      .post("http://localhost:3000/api/v1/workouts", {
        name,
        mode,
        equipment,
        exercises,
        trainerTips,
      })
      .then((response) => {
        console.log({ response });
        if (response.statusText === "OK") {
          // hacer algo si la respuesta es exitosa
          console.log("Datos enviados exitosamente");
        } else {
          // hacer algo si la respuesta no es exitosa
          console.error("Error al enviar los datos");
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  const updateWorkout = (updatedWorkout) => {
    const { name, mode, equipment, exercises, trainerTips } = updatedWorkout;

    axios
      .patch(`http://localhost:3000/api/v1/workouts/${workoutToUpdateId}`, {
        name,
        mode,
        equipment,
        exercises,
        trainerTips,
      })
      .then((response) => {
        console.log({ response });
        if (response.statusText === "OK") {
          // hacer algo si la respuesta es exitosa
          dispatch(setWorkoutToUpdateId(null));
          dispatch(setEditionMode(false));
          clearForm();
          console.log("Datos enviados exitosamente");
        } else {
          // hacer algo si la respuesta no es exitosa
          console.error("Error al enviar los datos");
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const WorkoutForm = {
      name: name,
      mode: mode,
      equipment: equipment.split(",").map((e) => e.trim()),
      exercises: exercises.split(",").map((e) => e.trim()),
      trainerTips: trainerTips.split(",").map((e) => e.trim()),
    };

    if (!editionMode) {
      createWorkout(WorkoutForm);
    } else {
      updateWorkout(WorkoutForm);
    }
  };

  return (
    <>
      <button className="viewWorkoutsButton">
        <a href="/workouts">View Workouts</a>
      </button>
      <form onSubmit={handleSubmit}>
        <label className="form-group">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-group">
          Mode:
          <input
            type="text"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />
        </label>
        <label className="form-group">
          Equipment (separate with commas):
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </label>
        <label className="form-group">
          Exercises (separate with commas):
          <input
            type="text"
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
          />
        </label>
        <label className="form-group">
          Trainer Tips:
          <textarea
            value={trainerTips}
            onChange={(e) => setTrainerTips(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">
          {editionMode ? "Update workout" : "Add Workout"}
        </button>
      </form>
    </>
  );
}
