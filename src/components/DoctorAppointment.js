import React, { useState } from "react";

export default function DoctorAppointment({ onBack }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      hospital: "Apollo Hospital",
      date: "2024-02-15",
      time: "10:00 AM",
      status: "confirmed",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma",
      specialty: "General Physician",
      hospital: "Fortis Hospital",
      date: "2024-02-20",
      time: "02:30 PM",
      status: "pending",
      type: "Consultation"
    }
  ]);

  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    reason: ""
  });

  const specialties = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedist",
    "Gynecologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist"
  ];

  const doctors = {
    "General Physician": [
      { name: "Dr. Sanjay Mishra", hospital: "City Clinic", fee: "₹500" },
      { name: "Dr. Anjali Mehta", hospital: "MediCare Center", fee: "₹600" },
      { name: "Dr. Vikram Singh", hospital: "Health First", fee: "₹450" }
    ],
    "Cardiologist": [
      { name: "Dr. Rajesh Kumar", hospital: "Apollo Hospital", fee: "₹800" },
      { name: "Dr. Anjali Mehta", hospital: "Fortis Hospital", fee: "₹750" }
    ],
    "Dermatologist": [
      { name: "Dr. Pooja Verma", hospital: "Skin Care Clinic", fee: "₹600" },
      { name: "Dr. Rahul Joshi", hospital: "Derma Plus", fee: "₹550" }
    ],
    "Neurologist": [
      { name: "Dr. Arun Kumar", hospital: "Neuro Care Center", fee: "₹900" },
      { name: "Dr. Shreya Menon", hospital: "Brain Health", fee: "₹850" }
    ]
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const getSpecialtyDoctors = () => {
    if (doctors[bookingForm.specialty]) {
      return doctors[bookingForm.specialty];
    }
    return [];
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      doctor: bookingForm.doctor,
      specialty: bookingForm.specialty,
      hospital: doctors[bookingForm.specialty]?.find(d => d.name === bookingForm.doctor)?.hospital || "Hospital",
      date: bookingForm.date,
      time: bookingForm.time,
      status: "pending",
      type: bookingForm.reason || "Consultation"
    };
    setAppointments([...appointments, newAppointment]);
    setShowBooking(false);
    setBookingForm({
      specialty: "",
      doctor: "",
      date: "",
      time: "",
      reason: ""
    });
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "#28a745";
      case "pending": return "#ffc107";
      case "cancelled": return "#dc3545";
      default: return "#6c757d";
    }
  };

  return (
    <div className="doctor-appointment">
      {/* Header Section */}
      <div className="appointment-header">
        <div className="header-content">
          <h2>🏥 Doctor Appointments</h2>
          <p>Manage your medical appointments and book new consultations</p>
        </div>
        <button className="btn-primary" onClick={() => setShowBooking(true)}>
          + Book Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="appointment-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-value">{appointments.length}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-value">{appointments.filter(a => a.status === "confirmed").length}</span>
            <span className="stat-label">Confirmed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <span className="stat-value">{appointments.filter(a => a.status === "pending").length}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="appointments-section">
        <h3>📆 Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map(apt => (
              <div key={apt.id} className="appointment-card fade-in">
                <div className="appointment-header-info">
                  <div className="doctor-avatar">
                    {apt.doctor.split(" ").slice(1).map(n => n[0]).join("")}
                  </div>
                  <div className="doctor-details">
                    <h4>{apt.doctor}</h4>
                    <p className="specialty">{apt.specialty}</p>
                    <p className="hospital">🏥 {apt.hospital}</p>
                  </div>
                  <div className="appointment-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(apt.status) }}
                    >
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="appointment-time-info">
                  <div className="time-slot">
                    <span className="time-icon">📅</span>
                    <span>{new Date(apt.date).toLocaleDateString("en-IN", { 
                      weekday: "short", 
                      year: "numeric", 
                      month: "short", 
                      day: "numeric" 
                    })}</span>
                  </div>
                  <div className="time-slot">
                    <span className="time-icon">🕐</span>
                    <span>{apt.time}</span>
                  </div>
                  <div className="time-slot">
                    <span className="time-icon">📋</span>
                    <span>{apt.type}</span>
                  </div>
                </div>
                <div className="appointment-actions">
                  <button className="btn-secondary btn-small">
                    Reschedule
                  </button>
                  <button 
                    className="btn-danger btn-small"
                    onClick={() => cancelAppointment(apt.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <span className="no-icon">📭</span>
            <p>No upcoming appointments</p>
            <button className="btn-primary" onClick={() => setShowBooking(true)}>
              Book Your First Appointment
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="modal-overlay fade-in">
          <div className="booking-modal">
            <div className="modal-header">
              <h3>📅 Book New Appointment</h3>
              <button 
                className="close-button"
                onClick={() => setShowBooking(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleBookAppointment} className="booking-form">
              <div className="form-group">
                <label>Select Specialty *</label>
                <select
                  value={bookingForm.specialty}
                  onChange={(e) => setBookingForm({ 
                    ...bookingForm, 
                    specialty: e.target.value,
                    doctor: "" 
                  })}
                  required
                >
                  <option value="">Choose Specialty</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {bookingForm.specialty && (
                <div className="form-group">
                  <label>Select Doctor *</label>
                  <select
                    value={bookingForm.doctor}
                    onChange={(e) => setBookingForm({ 
                      ...bookingForm, 
                      doctor: e.target.value 
                    })}
                    required
                  >
                    <option value="">Choose Doctor</option>
                    {getSpecialtyDoctors().map(doc => (
                      <option key={doc.name} value={doc.name}>
                        {doc.name} - {doc.hospital} (₹{doc.fee})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Select Date *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ 
                      ...bookingForm, 
                      date: e.target.value 
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Select Time *</label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ 
                      ...bookingForm, 
                      time: e.target.value 
                    })}
                    required
                  >
                    <option value="">Choose Time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Reason for Visit</label>
                <select
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({ 
                    ...bookingForm, 
                    reason: e.target.value 
                  })}
                >
                  <option value="">Select Reason</option>
                  <option value="Consultation">General Consultation</option>
                  <option value="Follow-up">Follow-up Visit</option>
                  <option value="Check-up">Regular Check-up</option>
                  <option value="Emergency">Urgent Care</option>
                  <option value="Second Opinion">Second Opinion</option>
                </select>
              </div>

              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-details">
                  {bookingForm.specialty && (
                    <p><strong>Specialty:</strong> {bookingForm.specialty}</p>
                  )}
                  {bookingForm.doctor && (
                    <p><strong>Doctor:</strong> {bookingForm.doctor}</p>
                  )}
                  {bookingForm.date && (
                    <p><strong>Date:</strong> {new Date(bookingForm.date).toLocaleDateString()}</p>
                  )}
                  {bookingForm.time && (
                    <p><strong>Time:</strong> {bookingForm.time}</p>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={!bookingForm.specialty || !bookingForm.doctor || !bookingForm.date || !bookingForm.time}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="button-row">
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
