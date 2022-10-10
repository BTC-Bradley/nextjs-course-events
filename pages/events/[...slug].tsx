import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import { IEvent } from "../../interfaces/Event";

interface IFilteredEventsPageProps {
  hasError?: boolean;
  events?: IEvent[];
  dateData?: {
    month: number;
    year: number;
  };
}

const FilteredEventsPage = (props: IFilteredEventsPageProps) => {
  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const { events, dateData } = props;

  const date = dateData
    ? new Date(dateData.year, dateData.month - 1)
    : new Date();

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          Event Search Results {dateData?.month}/{dateData?.year}
        </title>
        <meta
          name="description"
          content={`Events in ${dateData?.month}/${dateData?.year}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (params && params.slug) {
    const filteredData = params.slug;

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const year = +filteredYear;
    const month = +filteredMonth;

    if (
      isNaN(year) ||
      isNaN(month) ||
      year > 2030 ||
      year < 2021 ||
      month > 12 ||
      month < 1
    ) {
      return {
        props: {
          hasError: true,
        },
      };
    }

    const events = await getFilteredEvents({
      year,
      month,
    });

    return {
      props: {
        events,
        dateData: {
          month,
          year,
        },
      },
    };
  } else {
    return {
      props: {
        hasError: true,
      },
    };
  }
};

export default FilteredEventsPage;
