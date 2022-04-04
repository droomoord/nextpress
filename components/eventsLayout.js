const EventsLayout = ({ events }) => {
  return (
    <main>
      <h1 className="np-page-title">Events</h1>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <div className="np-main-content">
              <div dangerouslySetInnerHTML={{ __html: event.title }}></div>
              <div
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></div>
              <hr />
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default EventsLayout;
