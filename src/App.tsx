import ScheduleTemplate from "./components/templates/schedule/ScheduleTemplate";
import { EventProvider } from "./context/EventProvider";

const App = () => {

  return (
    <div>
      <EventProvider>
        <ScheduleTemplate />
      </EventProvider>
    </div>
  )
}

export default App