import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {
  const events = getFeaturedEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;
