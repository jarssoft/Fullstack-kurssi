import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS);
  const meresult = useQuery(ME);

  if (result.loading || meresult.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;
  const genre = meresult.data.me.favoriteGenre;

  return (
    <div>
      <h2>recommend</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(genre))
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

export default Recommend;
