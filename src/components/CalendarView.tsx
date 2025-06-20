"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Task } from "@/types";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

// Custom Toolbar Component with adjusted styling
const CustomToolbar = ({
  date,
  onNavigate,
}: {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT") => void;
}) => {
  const goToPrevious = () => onNavigate("PREV");
  const goToNext = () => onNavigate("NEXT");
  const label = format(date, "MMMM yyyy"); // Formats date as "October 2024"

  return (
    <div className="flex items-center justify-center p-4 bg-white border-b">
      <button
        onClick={goToPrevious}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Previous Month"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <div className="flex items-center mx-2">
        <CalendarIcon className="h-5 w-5 text-gray-600 mr-1" />
        <span className="text-lg font-semibold text-gray-800">{label}</span>
      </div>
      <button
        onClick={goToNext}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Next Month"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};

const CalendarView = ({ tasks }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  // Map tasks to calendar events, filtering out those without dueDate
  const events: CalendarEvent[] = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      title: task.name,
      start: new Date(task.dueDate!),
      end: new Date(task.dueDate!),
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
        backgroundColor: "transparent",
        color: "#000",
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
        style={{ height: "70vh" }}
        eventPropGetter={eventStyleGetter}
        date={currentDate}
        onNavigate={handleNavigate}
        views={["month"]}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default CalendarView;
