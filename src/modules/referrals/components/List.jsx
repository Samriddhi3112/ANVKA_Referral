import React, { useState } from "react";
import ListRow from "./ListRow";
import DetailsModal from "./DetailsModal";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useConsultationsStore } from "../../referralConsultation/store/consultations.store";

const List = ({ serviceType, page = 1, setPage }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    consultations,
    total,
    limit,
    loading,
  } = useConsultationsStore();

  const totalPages = Math.ceil(total / limit);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <>
      <div className="row gy-4">
        {consultations?.length > 0 ? (
          consultations.map((item) => (
            <div className="col-lg-4" key={item._id}>
              <ListRow
                data={item}
                onClick={() => handleOpen(item)}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                background: "#fff",
                borderRadius: "12px",
                border: "1px dashed #d9d9d9",
              }}
            >
              <h5 style={{ marginBottom: "10px" }}>
                No Records Found
              </h5>

              {/* <p
                style={{
                  color: "#777",
                  marginBottom: 0,
                }}
              >
                No consultation records available for the selected filters.
              </p> */}
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="Paginations">
          <label>&nbsp;</label>

          <ul>
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNo) => (
              <li key={pageNo}>
                <a
                  className={page === pageNo ? "active" : ""}
                  onClick={() => setPage(pageNo)}
                  style={{ cursor: "pointer" }}
                >
                  {pageNo}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nextBtn"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next <MdKeyboardArrowRight />
          </button>
        </div>
      )}

      <DetailsModal
        show={open}
        onClose={() => setOpen(false)}
        serviceType={serviceType}
        data={selectedItem}
      />
    </>
  );
};

export default List;