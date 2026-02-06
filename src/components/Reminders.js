import React, { useState, useEffect } from "react";

function Reminders({ onBack }) {
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const showNotification = (medicineName) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("💊 Medicine Reminder", {
        body: `Time to take your medicine: ${medicineName}`,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "medicine-reminder",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification(medicineName);
        }
      });
    }
  };

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Check for reminders that need to trigger
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
        if (reminderTime <= now && !reminder.notified) {
          showNotification(reminder.medicineName);
          setReminders((prev) =>
            prev.map((r) =>
              r.id === reminder.id ? { ...r, notified: true } : r
            )
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminders]);

  const handleSetReminder = () => {
    if (!medicineName || !date || !time) {
      alert("Please fill in all fields");
      return;
    }

    const newReminder = {
      id: Date.now(),
      medicineName,
      date,
      time,
      notified: false,
    };

    setReminders([...reminders, newReminder]);
    setMedicineName("");
    setDate("");
    setTime("");

    // Show confirmation
    alert(`Reminder set for ${medicineName} on ${date} at ${time}`);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="reminders-screen">
      <div className="card">
        <div className="reminders-header">
          <button onClick={onBack} className="back-button-header">← Back</button>
          <h2>📅 Medicine Reminders</h2>
        </div>

        <div className="reminder-form">
          <div className="form-group">
            <label htmlFor="medicine-name">Medicine Name</label>
            <input
              id="medicine-name"
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="e.g., Metformin 500mg"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reminder-date">Date</label>
              <input
                id="reminder-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reminder-time">Time</label>
              <input
                id="reminder-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button onClick={handleSetReminder} className="set-reminder-button">
            ⏰ Set Reminder
          </button>
        </div>

        {reminders.length > 0 && (
          <div className="reminders-list">
            <h3>Active Reminders</h3>
            {reminders.map((reminder) => (
              <div key={reminder.id} className="reminder-item">
                <div className="reminder-content">
                  <div className="reminder-medicine">💊 {reminder.medicineName}</div>
                  <div className="reminder-time">
                    {new Date(`${reminder.date}T${reminder.time}`).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="delete-reminder-button"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reminders;
