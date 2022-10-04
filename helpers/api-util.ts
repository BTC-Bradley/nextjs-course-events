import { IEvent } from "../interfaces/Event";

export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-events-9ade0-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events: IEvent[] = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    })
  }
  return events;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();
  return events ? events.filter((event) => event.isFeatured) : [];
};
