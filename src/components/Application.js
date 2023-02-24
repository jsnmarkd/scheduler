import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
 
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    const urlDays = `http://localhost:8001/api/days`;
    const urlAppointments = `http://localhost:8001/api/appointments`;
    // const urlInterviewers = `http://localhost:8001/api/interviewers`;
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
    ]).then((all) => {
      const setDays = all[0].data;
      const setAppointments = all[1].data;
      setState((prev) => ({ ...prev, days: setDays, appointments: setAppointments }));
    });
  }, []);

  const appointmentComponents = dailyAppointments.map(
    (appointment) => {
      return <Appointment key={appointment.id} {...appointment} />;
    }
  );

  const setDay = (day) => {setState({...state, day})};

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentComponents}</section>
    </main>
  );
}
