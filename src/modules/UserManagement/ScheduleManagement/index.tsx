import { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./ScheduleManagement.css";

interface CalendarOptions {
  defaultView: string;
  plugins: any[];
}

class ScheduleManagement extends Component {
  render() {
    const calendarOptions: CalendarOptions = {
      defaultView: "dayGridMonth",
      plugins: [dayGridPlugin],
    };

    return (
      <div className="App">
        <FullCalendar {...calendarOptions} />
      </div>
    );
  }
}

export default ScheduleManagement;
