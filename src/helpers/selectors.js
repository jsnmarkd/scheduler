/**
 * Selectors for given day
 * @param {object} state
 * @param {string} day
 * @returns {array} of appointment objects
 */

export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find((res) => res.name === day);

  if (!dayObj) {
    return [];
  }

  const appointments = dayObj.appointments.map((id) => state.appointments[id]);

  return appointments;
}

/**
 * Selectors for given day
 * @param {object} state
 * @param {string} day
 * @returns {array} of interviewer objects
 */

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find((res) => res.name === day);

  if (!dayObj) {
    return [];
  }

  const interviewers = Object.values(dayObj.appointments).map(
    (id) => state.interviewers[id]
  );

  return interviewers;
}

/**
 * Selector for given interview
 * @param {object} state
 * @param {object} interview data with interviewer id
 * @returns {object} interview data with interviewer data
 */

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}
