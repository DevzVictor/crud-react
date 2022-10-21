import { useState, useEffect } from "react";
import { Card } from "../../components/card/card";

import { api } from "../../utils/api/api";

import "./home.css";

export function Home() {
  const [animeList, setAnimeList] = useState([]);

  async function getAnimes() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

  useEffect(() => {
    getAnimes();
  });

  return (
    <>
      <div className="card-list">
        {animeList.map((item, index) => {
          return <Card key={index} />;
        })}
      </div>
    </>
  );
}
