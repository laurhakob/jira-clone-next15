"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Task } from "@/types";

// Define the shape of calendar events
interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: Task;
}

// Set up the localizer with moment
const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  tasks: Task[];
}

const CalendarView = ({ tasks }: CalendarViewProps) => {
  // Map tasks to calendar events, filtering out those without dueDate
  const events: CalendarEvent[] = tasks
    .filter((task) => task.dueDate) // Only include tasks with a dueDate
    .map((task) => ({
      title: task.name,
      start: new Date(task.dueDate!), // Convert timestamp to Date
      end: new Date(task.dueDate!),   // Use same date for all-day events
      resource: task,
    }));

  // Style events based on task status
  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource.status;
    let borderColor;

    switch (status) {
      case "Backlog":
        borderColor = "#d4d4d8"; // Gray
        break;
      case "Todo":
        borderColor = "#f87171"; // Red
        break;
      case "In Progress":
        borderColor = "#fcd34d"; // Yellow
        break;
      case "In Review":
        borderColor = "#60a5fa"; // Blue
        break;
      case "Done":
        borderColor = "#34d399"; // Green
        break;
      default:
        borderColor = "#e5e7eb"; // Default gray
    }

    return {
      style: {
        borderColor,
        borderWidth: "2px",
        borderStyle: "solid",
        backgroundColor: "transparent", // Clear background to emphasize border
        color: "#000", // Readable text
      },
    };
  };

  return (
    <div className="w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }} // Responsive height
        eventPropGetter={eventStyleGetter}
        defaultView="month" // Default to month view
        views={["month", "week", "day"]} // Allow view switching
        onSelectEvent={(event: CalendarEvent) =>
          console.log(`Task ID: ${event.resource._id}`)
        } // Log task ID for now
      />
    </div>
  );
};

export default CalendarView;