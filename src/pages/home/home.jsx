import { useState, useEffect } from "react";
import { Card } from "../../components/card/card";
import { api } from "../../utils/api/api";
import Modal from "react-modal";
import "./home.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0,0,0, 0.4)",
  }
};

Modal.setAppElement("#root");

export function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getAnimes() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  // executa novamente toda vez que um state for alterado
  // useEffect(() => {
  //   getAnimes();
  // });

  // executa somente quando o componente for renderizado pois não há nada no array de dependências
  useEffect(() => {
    getAnimes();
  }, []);

  console.log(animeList);

  // executa somente quando a(s) dependência(s) do array tiverem alguma mutação
  //   useEffect(() => {
  //     getAnimes();
  //   }, [animeList]);

  return (
    <>
      <section className="home-page">
        <div className="card-list">
          {animeList.map((item, index) => {
            return (
              <button
                className="button-card"
                onClick={() => {
                  handleModal();
                  console.log(item);
                }}
                key={index}
              >
                <Card
                  title={item.title}
                  protagonist={item.protagonist}
                  gender={item.gender}
                  year={item.year}
                />
              </button>
            );
          })}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModal}
          style={customStyles}
          contentLabel="Card Details"
        >
          <section>
            <h2>{}</h2>
          </section>
        </Modal>
      </section>
    </>
  );
}
