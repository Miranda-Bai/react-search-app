import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
          {
            headers: {
              "X-Api-Key": "xSj/4crTRkHqLw1/o3jT3g==4B6VG3HdyNBsrnjH",
            },
          }
        );
        const data = await res.json();
        setSearchResult(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    if (searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm]);
  return (
    <div className="App">
      <form>
        <label>Search for a celebrity networth:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
      </form>
      {isLoading ? (
        <p>One moment please.....</p>
      ) : (
        searchResult.map((result) => {
          return (
            <div key={nanoid()}>
              <h2>{result.name}</h2>
              <h3>Nepo baby net worth: {result.net_worth}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
