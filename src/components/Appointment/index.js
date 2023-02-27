import React from "react";
import "components/Appointment/index.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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

  return (
    <article className="appointment">
      {props.interview ? (
        <>
          <Header time={props.time} />
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer.name}
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
