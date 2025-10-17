import { useEffect, useState } from "react";
import { api } from "../services/api";
import AvailabilityForm from "./AvailabiltyForm";
import AppointmentList from "./AppointmentList";

export default function AgentDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/agent/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await api.get("/agent/availability");
      setAvailability(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchAvailability();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Agent Dashboard</h1>

        {/* Add Availability Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Availability</h2>
          <AvailabilityForm onAdded={fetchAvailability} />
        </div>

        {/* Grid for Appointments & Availability */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-600">No upcoming appointments.</p>
            ) : (
              <AppointmentList appointments={appointments} />
            )}
          </div>

          {/* Availability Slots */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Availability Slots</h2>
            {availability.length === 0 ? (
              <p className="text-gray-600">No availability slots added.</p>
            ) : (
              <ul className="space-y-3">
                {availability.map((slot) => (
                  <li
                    key={slot.id}
                    className="flex justify-between items-center p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow duration-200"
                  >
                    <span>
                      {slot.date} from {slot.startTime} to {slot.endTime}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slot.isBooked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {slot.isBooked ? "Booked" : "Free"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
