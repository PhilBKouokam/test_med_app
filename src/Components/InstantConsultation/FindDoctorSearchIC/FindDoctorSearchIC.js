import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import DoctorCardIC from "../DoctorCardIC/DoctorCardIC";

const doctorsData = [
  {
    id: 1,
    name: "Jiao Yang",
    speciality: "Dentist",
    experience: 9,
    ratings: 5,
    profilePic: "https://cdn.pixabay.com/photo/2025/05/27/17/13/female-9625677_1280.png",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    speciality: "Dentist",
    experience: 7,
    ratings: 4,
    profilePic: "https://cdn.pixabay.com/photo/2024/08/13/11/42/ai-generated-8965801_1280.png",
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    speciality: "Dermatologist",
    experience: 10,
    ratings: 5,
    profilePic: "https://cdn.pixabay.com/photo/2023/07/22/01/21/ai-generated-8142548_1280.png",
  },
  {
    id: 4,
    name: "Daniel Kim",
    speciality: "General Physician",
    experience: 6,
    ratings: 4,
    profilePic: "https://cdn.pixabay.com/photo/2024/08/18/04/44/ai-generated-8976950_1280.png",
  },
];

const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 
  'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);
  const [selectedDoctors, setSelectedDoctors] = useState(doctorsData);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    const filtered = doctorsData.filter(
      (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
    setSelectedDoctors(filtered);
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div><i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i></div>

        <div className="home-search-container">
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 150)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            <div className="findiconimg">
              <img
                className="findIcon"
                src={process.env.PUBLIC_URL + '/images/search.svg'}
                alt=""
              />
            </div>

            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities.map(speciality => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + '/images/search.svg'}
                      alt=""
                      style={{ height: "10px", width: "10px" }}
                    />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedDoctors.length > 0 && (
          <div className="search-results-container">
            <h2>{selectedDoctors.length} doctors available</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Book appointments with minimum wait-time & verified doctor details
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {selectedDoctors.map((doc) => (
                <DoctorCardIC
                  key={doc.id}
                  name={doc.name}
                  speciality={doc.speciality}
                  experience={doc.experience}
                  ratings={doc.ratings}
                  profilePic={doc.profilePic}
                />
              ))}
            </div>
          </div>
        )}
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;