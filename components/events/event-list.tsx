import { IEvent } from "../../interfaces/Event";
import EventItem from "./event-item";

import classes from "./event-list.module.css";

interface IEventListProps {
  items: IEvent[];
}

const EventList = (props: IEventListProps) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: IEvent) => {
        return (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        );
      })}
    </ul>
  );
};

export default EventList;
