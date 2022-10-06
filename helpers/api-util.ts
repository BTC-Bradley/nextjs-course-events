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
      ...data[key],
    });
  }
  return events;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();
  return events ? events.filter((event) => event.isFeatured) : [];
};

export const getEventById = async (id: string): Promise<IEvent | undefined> => {
  const events = await getAllEvents();

  return events.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<IEvent[]> => {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
