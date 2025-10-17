import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPolicies: 0,
    activeBookings: 0,
    totalCoverage: 0,
  });

  const [policies, setPolicies] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeBookings, setActiveBookings] = useState([]);


  // Fetch policies
  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:8080/public/policies", { withCredentials: true });
      setPolicies(res.data);
      setStats(prev => ({ ...prev, totalPolicies: res.data.length }));
    } catch (err) {
      console.error("Error fetching policies:", err);
    }
  };

  // Fetch agents
  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/public/agent", { withCredentials: true });
      console.log(res.data);
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  // Fetch user stats / bookings
  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/public/${user.email}`, { withCredentials: true });
      console.log(res.data);
      setActiveBookings(res.data);
      console.log(res.data);
      setStats(prev => ({
        ...prev,
        activeBookings: res.data.length,
        //totalCoverage: res.data.reduce((sum, b) => sum + b.policy.coverage, 0),
      }));
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    }
  };



  useEffect(() => {
    fetchPolicies();
    fetchAgents();
    if (user) fetchUserStats();
  }, [user]);

  // Book appointment
  const bookAppointment = async () => {
    if (!selectedPolicy || !selectedAgent || !selectedDate || !selectedTime) {
      alert("Please select policy, agent, date, and time!");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/booking/book?userEmail=${user.email}&agentId=${selectedAgent.id}&date=${selectedDate}&time=${selectedTime}`,
        {},
        { withCredentials: true }
      );
      
      alert("Booking successful!");
      fetchUserStats(); // update stats
    } catch (err) {
      
      console.error("Error booking appointment:", err);
      alert("Booking failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your insurance today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Available Policies</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalPolicies}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Active Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium">Total Coverage</p>
            <p className="text-3xl font-bold text-gray-900">
              ${stats.totalCoverage?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {/* Policies + Booking */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Policies Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Purchase Policies</h2>
            <div className="space-y-4">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className={`p-4 border rounded-xl cursor-pointer ${
                    selectedPolicy?.id === policy.id ? "border-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedPolicy(policy)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{policy.name}</h3>
                      <p className="text-gray-600 text-sm">{policy.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">${policy.premium}</p>
                      <p className="text-gray-600 text-sm">Coverage: ${policy.coverage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Select Agent */}
            {selectedPolicy && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Select an Agent</h3>
                <select
                  className="border p-2 rounded"
                  value={selectedAgent?.id || ""}
                  onChange={(e) =>
                    setSelectedAgent(agents.find((a) => a.id === parseInt(e.target.value)))
                  }
                >
                  <option value="">-- Select Agent --</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} ({agent.email})
                    </option>
                  ))}
                </select>

                {/* Date + Time */}
                {selectedAgent && (
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="date"
                      className="border p-2 rounded"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="border p-2 rounded"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <button
                      onClick={bookAppointment}
                      className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                    >
                      Book
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

{/* Sidebar */}
<div className="space-y-6">
  {/* Active Bookings */}
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-xl font-bold mb-4">Active Bookings</h3>
    {activeBookings.length === 0 ? (
      <p className="text-gray-600 text-sm">No active bookings</p>
    ) : (
      <div className="space-y-3">
        {activeBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {booking.policy?.type || "Booking"} with {"Agent "+ booking.agent?.name || "Agent"}
              </p>
              <p className="text-xs text-gray-600">
                {booking.date} • {booking.time}
              </p>
            </div>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Upcoming
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
