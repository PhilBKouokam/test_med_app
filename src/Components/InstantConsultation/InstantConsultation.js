import React, { useEffect, useState, useCallback } from "react";
import "./InstantConsultation.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";
import Notification from "../Notification/Notification";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();

  const getDoctorsDetails = useCallback(() => {
    setLoading(true);
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        const speciality = searchParams.get("speciality");

        if (speciality) {
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err))
      .finally(() => setLoading(false));
  });

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [searchParams]);

  return (
    <div className="instant-container">
      <FindDoctorSearchIC onSearch={handleSearch} />

      {loading ? (
        <p className="instant-loading">Loading doctors...</p>
      ) : (
        <div className="search-results-container">
          {isSearched ? (
            <>
              <h2>
                {filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 && "s"} available{" "}
                {searchParams.get("location") || ""}
              </h2>
              <h3>
                Book appointments with minimal wait-time & verified doctors
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                  />
                ))
              ) : (
                <p className="no-results">No doctors found.</p>
              )}
            </>
          ) : (
            <p className="instant-placeholder">
              Search by speciality to find available doctors instantly.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InstantConsultation;