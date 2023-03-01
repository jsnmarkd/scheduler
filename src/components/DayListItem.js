import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
/**
 * PROPS NEEDED
 *
 * name: String the name of the day
 * spots: Number the number of spots remaining
 * selected: Boolean true or false declaring that this day is selected
 * setDay: Function accepts the name of the day eg. "Monday", "Tuesday"
 */

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = (num) => {
    if (num > 1) {
      return <h3 className="text--light">{num} spots remaining</h3>;
    } else if (num === 1) {
      return <h3 className="text--light">{num} spot remaining</h3>;
    } else {
      return <h3 className="text--light">no spots remaining</h3>;
    }
  };

  return (
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      {formatSpots(spots)}
    </li>
  );
}
