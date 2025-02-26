import { useState } from "react";

export default function SearchFlight() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const response = await fetch(``);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Flight"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button onClick={handleSearch}>Search</button>

      <div>
        {result.map((flight) => (
          <div key={flight.id}>
            <h3>{flight.flight_name}</h3>
            <p>Destination: {flight.destination}</p>
            <p>Price: ${flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
