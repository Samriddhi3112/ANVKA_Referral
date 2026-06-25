import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { GrFormClose } from 'react-icons/gr';
import { useProfileCompletionStore } from "../store/profileCompletion.store";

const ProfileCompletionModal = ({ show, onHide }) => {
    const { patientDetail, loading, error } = useProfileCompletionStore();

    const patient = patientDetail?.patient;
    const steps   = patientDetail?.steps || [];

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <a onClick={onHide} className="closeModal"><GrFormClose /></a>

                {loading && !patientDetail && (
                    <p className="text-center py-4">Loading details...</p>
                )}
                {error && (
                    <p className="text-center text-danger py-4">{error}</p>
                )}

                {!loading && !error && patientDetail && (
                    <div className="ModalArea">

                        {/* ── Patient Header ── */}
                        <div className="userBox">
                            <figure>
                                <img
                                    src={patient?.profileImage}
                                    alt={patient?.fullName}
                                    onError={(e) => { e.target.src = '/fallback-avatar.png'; }}
                                />
                            </figure>
                            <figcaption>
                                <p>{patient?.uhid}</p>
                                <h5>{patient?.fullName}</h5>
                            </figcaption>
                        </div>

                        {/* ── Steps Table ── */}
                        <div className="doctorInformation">
                            <table>
                                <tbody>
                                    {steps.map((step) => (
                                        <tr key={step.key}>
                                            <td>{step.label}</td>
                                            <td>
                                                <a className={step.completed ? 'completedBtn' : 'partialBtn'}>
                                                    {step.completed ? 'Completed' : 'Pending'}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ProfileCompletionModal;