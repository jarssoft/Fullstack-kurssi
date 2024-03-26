import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import styles from "./book.css";

const Books = (props) => {
  const [genre, setGenre] = useState();
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  //console.log(result);
  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  if (!result.data) {
    return null;
  }

  //console.log(genre);

  const books = result.data.allBooks;

  let counts = {};
  const allgenres = books.map((book) => book.genres).flat(1);
  allgenres.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  const strings = Object.keys(counts);

  console.log(counts);

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          In genre {genre}. <button onClick={() => setGenre()}>Show all</button>
          .
        </p>
      ) : (
        <p>
          {Object.keys(counts).map((key, index) => (
            <button
              key={key}
              className={key === genre ? "bigblue" : ""}
              onClick={() => setGenre(key)}
            >
              {key + " (" + counts[key] + ")"}
            </button>
          ))}
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => !genre || book.genres.includes(genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
