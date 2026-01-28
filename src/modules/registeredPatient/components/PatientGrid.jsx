import React from "react";
import PatientCard from "./PatientCard";
import { MdKeyboardArrowRight } from "react-icons/md";

const PatientGrid = () => {
  const patients = Array.from({ length: 9 });

  return (
    <>
      <div className="row gy-4">
        {patients.map((_, index) => (
          <div className="col-lg-4" key={index}>
            <PatientCard />
          </div>
        ))}
      </div>

      <div className="Paginations">
        <label>&nbsp;</label>
        <ul>
          <li><a className="active">1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a>5</a></li>
        </ul>

        <button className="nextBtn">
          Next <MdKeyboardArrowRight />
        </button>
      </div>
    </>
  );
};

export default PatientGrid;
