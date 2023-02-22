import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

/**
 * PROPS NEEDED
 * 
 * id: number - the id of the interviewer
 * name: string - the name of the interviewer
 * avatar: url - a url to an image of the interviewer
 * selected: boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
 * setInterviewer: function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument.
 */

export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, setInterviewer} = props;

  const interviewersClass = classNames("interviewers__item",{
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewersClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}