export function getAppointmentsForDay(state, day) {
  // find the day object with the given name
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) {
    // return an empty array if the day does not exist
    return [];
  }

  // map over the appointment IDs for this day and return the appointment objects
  const appointments = dayObj.appointments.map((id) => state.appointments[id]);

  return appointments;
}
