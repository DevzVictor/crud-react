import { useState, useEffect } from "react";
import { Header } from "../../header/header";
import { Card } from "../../components/card/card";
import { api } from "../../utils/api/api";
import { CgClose } from "react-icons/cg";
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

export function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uniqueAnime, setUniqueAnime] = useState({});
  const [editAnime, setEditAnime] = useState(false);

  async function getAnimes() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

  function deleteAnime(animeId) {
    api.deleteAnime(animeId);
    const newAnimeList = animeList;
    newAnimeList.map((anime, index) => {
      if (anime.id === animeId) {
        newAnimeList.splice(index, 1);
        setAnimeList(newAnimeList);
        handleModal();
      }
    });
  }

  function changeAnime(event, animeId) {
    event.preventDefault();

    const updatedAnime = {
      id: uniqueAnime.id,
      title: event.target.title.value,
      protagonist: event.target.protagonist.value,
      gender: event.target.gender.value,
      year: event.target.year.value,
      characters: [],
    };

    const newAnimeList = animeList;
    newAnimeList.map((item, index) => {
      if (item.id === updatedAnime.id) {
        newAnimeList.splice(index, 1, updatedAnime);
        setAnimeList(newAnimeList);
        handleModal();
      }
    });
    setEditAnime(false);
    api.updateAnime(updatedAnime);
  }

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  // executa novamente toda vez que um state for alterado
  // useEffect(() => {
  //   getAnimes();
  // });

  // executa somente quando o componente for renderizado pois n??o h?? nada no array de depend??ncias
  useEffect(() => {
    getAnimes();
  }, []);

  // executa somente quando a(s) depend??ncia(s) do array tiverem alguma muta????o
  //   useEffect(() => {
  //     getAnimes();
  //   }, [animeList]);

  return (
    <section className="home-page">
      <Header getAll={getAnimes} />
      <div className="card-list">
        {animeList.map((item, index) => {
          return (
            <button
              className="button-card"
              onClick={() => {
                setUniqueAnime(item);
                handleModal();
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
        {editAnime ? (
          <>
            <div className="form">
              <form onSubmit={changeAnime} className="form-inputs">
                <section>
                  <span>Title:</span>
                  <input
                    type="text"
                    name="title"
                    defaultValue={uniqueAnime.title}
                  ></input>
                </section>
                <section>
                  <span>Protagonist</span>
                  <input
                    type="text"
                    name="protagonist"
                    defaultValue={uniqueAnime.protagonist}
                  ></input>
                </section>
                <section>
                  <span>Gender:</span>
                  <input
                    type="text"
                    name="gender"
                    defaultValue={uniqueAnime.gender}
                  ></input>
                </section>
                <section>
                  <span>Year:</span>
                  <input
                    type="number"
                    name="year"
                    defaultValue={uniqueAnime.year}
                  ></input>
                </section>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <section>
              <section
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={handleModal}
                >
                  <CgClose size={28} color="red" />
                </button>
              </section>
              <h2>{uniqueAnime.title}</h2>
              <h3>{uniqueAnime.gender}</h3>
              <h3>{uniqueAnime.protagonist}</h3>
              <h3>{uniqueAnime.year}</h3>
            </section>
            <button
              onClick={() => {
                setEditAnime(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteAnime(uniqueAnime.id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </Modal>
    </section>
  );
}
