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
      {props.interview ? (
        <>
          <Header time={props.time} />
          {mode === CONFIRM && (
            <Confirm
              message="Are you sure you would like to delete?"
              onCancel={() => transition(SHOW)}
              onConfirm={deleteInterview}
            />
          )}
          {mode === DELETING && <Status message="Deleting" />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
              onDelete={() => transition(CONFIRM)}
            />
          )}
        </>
      ) : (
        <>
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SAVING && <Status message="Saving" />}
          {mode === CREATE && (
            <Form
              student={""}
              interviewers={props.interviewers}
              onCancel={() => back(EMPTY)}
              onSave={save}
            />
          )}
        </>
      )}
    </article>
  );
}
