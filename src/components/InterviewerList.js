import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

/**
 * PROPS NEEDED
 *
 * interviewers: array - an array of objects as seen above
 * setInterviewer: function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
 * interviewer: number - a number that represents the id of the currently selected interviewer
 * @param {*} props
 * @returns
 */

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <ul>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{parsedInterviewers}</ul>
      </section>
    </ul>
  );
}
