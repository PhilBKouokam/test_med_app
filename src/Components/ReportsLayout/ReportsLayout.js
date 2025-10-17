import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // ✅ Load appointments from localStorage (same source as ReviewForm)
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
    const doctorDataList = JSON.parse(localStorage.getItem("doctorDataList")) || {};

    // ✅ Combine data sources
    const flattened = Object.keys(allAppointments).map((doctorName, index) => ({
      serial: index + 1,
      doctorName,
      speciality:
        doctorDataList[doctorName]?.speciality ||
        allAppointments[doctorName]?.doctorSpeciality ||
        "N/A",
    }));

    setAppointments(flattened);
  }, []);

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      {appointments.length === 0 ? (
        <p className="no-reports">
          No booked consultations yet. Reports will appear once you’ve had a consultation.
        </p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.serial}>
                <td>{index + 1}</td>
                <td>{`Dr. ${appt.doctorName}`}</td>
                <td>{appt.speciality}</td>
                <td>
                  {/* ✅ View report in new tab */}
                  <a
                    href="/patient_report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-view"
                  >
                    View Report
                  </a>
                </td>
                <td>
                  {/* ✅ Download report */}
                  <a
                    href="/patient_report.pdf"
                    download
                    className="btn-download"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsLayout;