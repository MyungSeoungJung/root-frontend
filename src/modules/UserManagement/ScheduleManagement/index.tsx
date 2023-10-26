import { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./ScheduleManagement.css";
import axios from "axios";
import { getCookie } from "@/utils/cookie";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarOptions {
  initialView: string;
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
  currentTime: string;
  startDate: string;
  endDate: string;
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
      currentTime: this.formatCurrentTime(new Date()),
      startDate: null,
      endDate: null,
    };
  }

  formatCurrentTime(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  }

  componentDidMount(): void {
    this.fetchEvents();

    setInterval(() => {
      this.setState({
        currentTime: this.formatCurrentTime(new Date()),
      });
    }, 1000);
  }

  getApiHeaders = () => {
    const token = getCookie("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  fetchEvents = () => {
    axios
      .get("http://192.168.100.152:5500/events", this.getApiHeaders())
      .then((response) => {
        console.log("API response:", response.data);
        const fetchedEvents = response.data.map((event) => ({
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

  handleDateClick = (info) => {
    console.log("Date clicked:", info.dateStr);
    this.handleAddEventClick();
  };

  handleEventClick = (info: any) => {
    console.log("Event clicked:", info);
    const startDate = info.event.start
      ? info.event.start.toISOString().split("T")[0]
      : null;
    const endDate = info.event.end
      ? info.event.end.toISOString().split("T")[0]
      : null;
    this.setState({
      showModal: true,
      modalType: "EDIT",
      selectedEvent: {
        title: info.event.title,
        start: startDate,
        end: endDate,
        color: info.event.backgroundColor,
        id: info.event.id,
      },
      titleInput: info.event.title,
      colorInput: info.event.backgroundColor,
    });
    console.log("selectedEvent : ", JSON.stringify(info.event));
  };

  handleAddEventClick = () => {
    const currentDate = new Date();
    this.setState(
      {
        showModal: true,
        modalType: "ADD",
        selectedDate: new Date(),
        startDate: this.formatDate(currentDate),
        endDate: this.formatDate(currentDate),
      },
      () => {
        console.log("~~~ :", this.state);
      }
    );
  };

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "titleInput") {
      this.setState({ titleInput: value });
    } else if (name === "colorInput") {
      this.setState({ colorInput: value });
    } else if (name === "startDate") {
      this.setState({ startDate: value });
    } else if (name === "endDate") {
      this.setState({ endDate: value });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedDate: null,
      selectedEvent: null,
    });
  };

  addEvent = () => {
    console.log("Adding event...");
    let endDate = new Date(this.state.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const newEvent: Event = {
      title: this.state.titleInput,
      startDate: this.state.startDate,
      endDate: endDate.toISOString().split("T")[0],
      color: this.state.colorInput,
    };
    axios
      .post(
        "http://192.168.100.152:5500/events",
        newEvent,
        this.getApiHeaders()
      )
      .then((response) => {
        this.fetchEvents();
      })
      .catch((error) => {
        console.error("이벤트를 추가하는 중 에러 발생:", error);
      });

    this.closeModal();
  };

  editEvent = () => {
    let endDate = new Date(this.state.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const updatedEvent: Event = {
      id: this.state.selectedEvent!.id,
      title: this.state.titleInput,
      startDate: this.state.startDate,
      endDate: endDate.toISOString().split("T")[0],
      color: this.state.colorInput,
    };
    axios
      .put(
        `http://192.168.100.152:5500/events/${updatedEvent.id}`,
        updatedEvent,
        this.getApiHeaders()
      )
      .then((response) => {
        this.fetchEvents();
      })
      .catch((error) => {
        console.error("이벤트를 편집하는 중 에러 발생:", error);
      });

    this.closeModal();
  };

  deleteEvent = () => {
    const eventId = this.state.selectedEvent!.id;
    const token = getCookie("token");
    axios
      .delete(
        `http://192.168.100.152:5500/events/${eventId}`,
        this.getApiHeaders()
      )
      .then(() => {
        this.fetchEvents();
      })
      .catch((error) => {
        console.error("이벤트를 삭제하는 중 에러 발생:", error);
      });

    this.closeModal();
  };

  render() {
    const calendarOptions: CalendarOptions = {
      initialView: "dayGridMonth",
      plugins: [dayGridPlugin, interactionPlugin],
      events: this.state.events,
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
    };

    return (
      <div className="App">
        <div className="current-time">{this.state.currentTime}</div>
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
                <div>
                  <label>Start Date: </label>
                  <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <label>End Date: </label>
                  <input
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <button onClick={this.addEvent}>Add</button>
              </>
            )}
            {this.state.modalType === "EDIT" && this.state.selectedEvent && (
              <>
                <h3>Edit/Delete Event</h3>
                <div>
                  <label>Start Date: </label>
                  <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <label>End Date: </label>
                  <input
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                  />
                </div>
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
