"use client"

import { Calendar } from "./ui/calendar"

export function AppointmentCalendar() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Appointment Calendar</h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          className="rounded-md border"
        />
      </div>
    </div>
  )
}
