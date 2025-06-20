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
import Image from "next/image";

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

// Custom Event Component to display task name, member's image, and project's image
const CustomEvent = ({ event }: { event: CalendarEvent }) => {
  const { title, resource } = event;
  const { assignee, projectImageUrl } = resource;

  return (
    <div className="flex flex-col items-start">
      <span className="text-sm font-medium">{title}</span>
      <div className="flex items-center mt-1">
        {assignee?.image && (
          <Image
            src={assignee.image}
            alt={assignee.name || "Assignee"}
            width={16}
            height={16}
            className="rounded-full"
          />
        )}
        <span className="mx-1 text-gray-500">•</span>
        {projectImageUrl && (
          <Image
            src={projectImageUrl}
            alt={resource.projectName || "Project"}
            width={16}
            height={16}
            className="rounded"
          />
        )}
      </div>
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

  // Style events with status-based left border color and uniform other borders
  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource.status;
    let statusColor;

    switch (status) {
      case "Backlog":
        statusColor = "#d4d4d8"; // Gray
        break;
      case "Todo":
        statusColor = "#f87171"; // Red
        break;
      case "In Progress":
        statusColor = "#fcd34d"; // Yellow
        break;
      case "In Review":
        statusColor = "#60a5fa"; // Blue
        break;
      case "Done":
        statusColor = "#34d399"; // Green
        break;
      default:
        statusColor = "#e5e7eb"; // Default gray
    }

    return {
      style: {
        borderLeft: `4px solid ${statusColor}`, // Status color for left border
        borderTop: "1px solid #e5e7eb", // Uniform gray for other borders
        borderRight: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "transparent",
        color: "#000",
        padding: "2px 4px", // Padding to space content from borders
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
          event: CustomEvent, // Use the custom event component
        }}
      />
    </div>
  );
};

export default CalendarView;