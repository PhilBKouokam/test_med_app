import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import DoctorCardIC from "../DoctorCardIC/DoctorCardIC";

const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 
  'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    setSelectedSpeciality(speciality);
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
              onBlur={() => setDoctorResultHidden(true)}
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

        {selectedSpeciality && (
          <DoctorCardIC
            name="Jiao Yang"
            speciality={selectedSpeciality}
            experience={9}
            ratings={5}
            profilePic={process.env.PUBLIC_URL + 'https://cdn.pixabay.com/photo/2025/05/27/17/13/female-9625677_1280.png'}
          />
        )}
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;