import TitleGame from "../Component/TitleGame";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Modal from "../Component/Modal";

const AddPlayer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="screenAddPlayer">
      <div>
        <TitleGame />
      </div>
      <div>
        <button
          className="buttonAddPlayer"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          AddPlayer
        </button>
        <ToastContainer />
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
    </div>
  );
};
export default AddPlayer;
