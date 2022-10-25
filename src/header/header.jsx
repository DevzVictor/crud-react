import { useState } from "react";
import Modal from "react-modal";
import { GrFormAdd } from "react-icons/gr";
import { Form } from "../components/form/form";
import "./header.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40rem",
    height: "30rem",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "15px",
  },
  overlay: {
    background: "rgba(0,0,0, 0.4)",
  },
};

Modal.setAppElement("#root");

export function Header({getAll}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <header className="header-home">
        <section className="header-section">
          <img src="./shuriken.png" alt="logo" height="35" width="35" />
          <h2 style={{ paddingLeft: "15px" }}>AnimeFlix</h2>
        </section>
        <section>
          <button className="modal-button" onClick={handleModal}>
            <GrFormAdd size={24} /> Add Anime
          </button>
        </section>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Form Create"
      >
        <Form getAll={getAll} handleModal={handleModal}/>
      </Modal>
    </>
  );
}
