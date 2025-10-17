import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  // Example static data; later this can come from an API
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Mocked data for display
    const sampleReports = [
      {
        id: 1,
        doctorName: "Dr. John Doe",
        speciality: "Cardiology",
      },
      {
        id: 2,
        doctorName: "Dr. Jane Smith",
        speciality: "Dermatology",
      },
    ];
    setReports(sampleReports);
  }, []);

  return (
    <div className="reports-container">
      <h1>Reports</h1>
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
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => alert(`Viewing report for ${report.doctorName}`)}
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="btn-download"
                  onClick={() => alert(`Downloading report for ${report.doctorName}`)}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;