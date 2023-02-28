import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviewers = `/api/interviewers`;
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
    setState((prev) => ({ ...prev, day }));
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

    const getSpots = (day) => {
      const num = day.appointments.length;
      let count = 0;
      for (const appId of day.appointments) {
        if (appointments[appId].interview) {
          count++;
        }
      }
      return num - count;
    };

    const days = state.days.map((day) => {
      return day.appointments.includes(id)
        ? { ...day, spots: getSpots(day) }
        : day;
    });

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
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

    const getSpots = (day) => {
      const num = day.appointments.length;
      let count = 0;
      for (const appId of day.appointments) {
        if (appointments[appId].interview) {
          count++;
        }
      }
      return num - count;
    };

    const days = state.days.map((day) => {
      return day.appointments.includes(id)
        ? { ...day, spots: getSpots(day) }
        : day;
    });

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error("Could not cancel appointment");
      });
  }

  return { cancelInterview, bookInterview, setDay, state };
}
