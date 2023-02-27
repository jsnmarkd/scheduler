import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  useEffect(() => {
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppointments = `http://localhost:8001/api/appointments`;
    const urlInterviewers = `http://localhost:8001/api/interviewers`;
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviewers),
    ]).then((all) => {
      const setDays = all[0].data;
      const setAppointments = all[1].data;
      const setInterviewers = all[2].data;
      setState((prev) => ({
        ...prev,
        days: setDays,
        appointments: setAppointments,
        interviewers: setInterviewers,
      }));
    });
  }, []);
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = (day) => {
    setState({ ...state, day });
  };
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error("Could not save appointment");
      });
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error("Could not cancel appointment");
      });
  }
  
  return { cancelInterview, bookInterview, setDay, state }
}
