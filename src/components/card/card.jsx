import "./card.css";

export function Card() {
  return (
    <div className="card-component">
      <h2>Anime Name</h2>
      <section className="card-infos">
        <span className="card-span">Protagonist: </span>
        <h3>Protagonist Name: </h3>
      </section>
      <section className="card-infos">
        <span className="card-span">Gender: </span>
        <h3>Whatever </h3>
      </section>
      <section className="card-infos">
        <span className="card-span">Year: </span>
        <h3>2005 </h3>
      </section>
    </div>
  );
}
