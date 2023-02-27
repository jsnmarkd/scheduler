import React from "react";
import "components/Appointment/index.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
          <Header time={props.time} />
          {mode === CONFIRM && (
            <Confirm
              message="Are you sure you would like to delete?"
              onCancel={back}
              onConfirm={deleteInterview}
            />
          )}
          {mode === DELETING && <Status message="Deleting" />}
          {mode === EDIT && (
            <Form
              student={props.interview.student}
              interviewer={props.interview.interviewer.id}
              interviewers={props.interviewers}
              onCancel={back}
              onSave={save}
            />
          )}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              onEdit={() => transition(EDIT)}
              onDelete={() => transition(CONFIRM)}
            />
          )}
           {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
           {mode === SAVING && <Status message="Saving" />}
           {mode === CREATE && (
             <Form
               student={""}
               interviewers={props.interviewers}
               onCancel={back}
               onSave={save}
             />
           )}
    </article>
  );
}
