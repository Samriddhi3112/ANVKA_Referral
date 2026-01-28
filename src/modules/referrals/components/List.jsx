import React, { useState } from "react";
import ListRow from "./ListRow";
import DetailsModal from "./DetailsModal";
import { MdKeyboardArrowRight } from "react-icons/md";

const List = ({ serviceType }) => {
  const [open, setOpen] = useState(false);

  const data = Array.from({ length: 12 });

  return (
    <>
      <div className="row gy-4">
        {data.map((_, index) => (
          <div className="col-lg-4" key={index}>
            <ListRow onClick={() => setOpen(true)} />
          </div>
        ))}
      </div>

      <div className="Paginations">
        <label>&nbsp;</label>
        <ul>
          <li><a className="active">1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
        </ul>
        <button className="nextBtn">
          Next <MdKeyboardArrowRight />
        </button>
      </div>

      <DetailsModal
        show={open}
        onClose={() => setOpen(false)}
        serviceType={serviceType}
      />
    </>
  );
};

export default List;
