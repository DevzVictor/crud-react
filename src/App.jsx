import "./App.css";
import { Home } from "./home";
import { Form } from "./components/form/form";
import { Card } from "./components/card/card";

export function App() {
  return (
    <>
      <div className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div>
        <Home />
        <Form />
      </div>
    </>
  );
}
