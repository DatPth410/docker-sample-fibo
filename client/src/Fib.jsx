import { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchValues();
    await fetchIndexes();
  };

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };

  const renderValues = () => {
    const entries = [];

    for (const key of Object.keys(values)) {
      entries.push(
        <div>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index,
    });
    setIndex("");
    fetchData();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}

      <h3>Calculated values:</h3>
      {renderValues()}
    </>
  );
};

export default Fib;
