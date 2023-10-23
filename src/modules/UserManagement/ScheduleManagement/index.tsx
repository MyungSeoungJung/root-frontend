import { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./ScheduleManagement.css";
import axios from "axios";
import { getCookie } from "@/utils/cookie";

interface CalendarOptions {
  defaultView: string;
  plugins: any[];
  events?: any[];
  dateClick?: (info: any) => void;
  eventClick?: (info: any) => void;
}

interface Event {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface ScheduleManagementState {
  events: any[];
  showModal: boolean;
  modalType: "ADD" | "EDIT";
  selectedEvent: any | null;
  selectedDate: Date | null;
  titleInput: string;
  colorInput: string;
}

class ScheduleManagement extends Component<{}, ScheduleManagementState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      modalType: "ADD",
      selectedEvent: null,
      selectedDate: null,
      titleInput: "",
      colorInput: "#FFFFFF",
    };
  }

  componentDidMount(): void {
    this.fetchEvents();
  }

  fetchEvents = () => {
    const token = getCookie("token");
    axios
      .get("http://localhost:5500/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedEvents = response.data.map((event) => ({
          // Solution #2: Map through the events and format the dates properly.
          ...event,
          start: event.startDate,
          end: event.endDate,
        }));
        this.setState({ events: fetchedEvents });
      })
      .catch((error) => {
        console.error("이벤트를 가져오는중 에러발생:", error);
      });
  };

  handleDateClick = (info: any) => {
    this.setState({
      showModal: true,
      modalType: "ADD",
      selectedDate: info.date,
    });
  };

  handleEventClick = (info: any) => {
    this.setState({
      showModal: true,
      modalType: "EDIT",
      selectedEvent: info.event,
      titleInput: info.event.title,
      colorInput: info.event.color,
    });
  };

  handleAddEventClick = () => {
    this.setState({
      showModal: true,
      modalType: "ADD",
      selectedDate: new Date(),
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as any);
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedDate: null,
      selectedEvent: null,
    });
  };

  addEvent = () => {
    const newEvent: Event = {
      title: this.state.titleInput,
      startDate: this.state.selectedDate!.toISOString(),
      endDate: this.state.selectedDate!.toISOString(),
      color: this.state.colorInput,
    };
    const token = getCookie("token");
    console.log(token);
    axios
      .post("http://localhost:5500/events", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.fetchEvents(); // Solution #3: Fetch events again after adding a new event.
      })
      .catch((error) => {
        console.error("이벤트를 추가하는 중 에러 발생:", error);
      });
  };

  editEvent = () => {
    const updatedEvent: Event = {
      id: this.state.selectedEvent!.id,
      title: this.state.titleInput,
      startDate: this.state.selectedEvent!.start,
      endDate: this.state.selectedEvent!.end,
      color: this.state.colorInput,
    };
    const token = getCookie("token");
    axios
      .put(`http://localhost:5500/events/${updatedEvent.id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedEvent = response.data;
        this.setState((prevState) => ({
          events: prevState.events.map((e) =>
            e.id === updatedEvent.id ? updatedEvent : e
          ),
          showModal: false,
          titleInput: "",
          colorInput: "#FFFFFF",
        }));
      })
      .catch((error) => {
        console.error("이벤트를 편집하는 중 에러 발생:", error);
      });
  };

  deleteEvent = () => {
    const eventId = this.state.selectedEvent!.id;
    const token = getCookie("token");
    axios
      .delete(`http://localhost:5500/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        this.setState((prevState) => ({
          events: prevState.events.filter((e) => e.id !== eventId),
          showModal: false,
        }));
      })
      .catch((error) => {
        console.error("이벤트를 삭제하는 중 에러 발생:", error);
      });
  };

  render() {
    const calendarOptions: CalendarOptions = {
      defaultView: "dayGridMonth",
      plugins: [dayGridPlugin],
      events: this.state.events,
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
    };

    return (
      <div className="App">
        <button onClick={this.handleAddEventClick}>일정추가</button>
        <FullCalendar {...calendarOptions} />
        {this.state.showModal && (
          <div className="modal">
            <div>
              <label>Title: </label>
              <input
                type="text"
                name="titleInput"
                value={this.state.titleInput}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Color: </label>
              <input
                type="color"
                name="colorInput"
                value={this.state.colorInput}
                onChange={this.handleInputChange}
              />
            </div>
            {this.state.modalType === "ADD" && (
              <>
                <h3>Add Event</h3>
                <p>Select date: {this.state.selectedDate?.toString()}</p>
                <button onClick={this.addEvent}>Add</button>
              </>
            )}
            {this.state.modalType === "EDIT" && this.state.selectedEvent && (
              <>
                <h3>Edit/Delete Event</h3>
                <p>Event: {this.state.selectedEvent.title}</p>
                <p>Date: {this.state.selectedEvent.start}</p>
                <button onClick={this.editEvent}>Edit</button>
                <button onClick={this.deleteEvent}>Delete</button>
              </>
            )}
            <button onClick={this.closeModal}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default ScheduleManagement;
