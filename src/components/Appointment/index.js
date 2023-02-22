import React, { Fragment } from "react";
import "components/Appointment/index.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.interview ? (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        </>
      ) : (
        <>
          <Header time={props.time} />
          <Empty />
        </>
      )}
    </article>
  );
}
