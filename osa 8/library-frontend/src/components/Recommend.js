import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  //const result = useQuery(ALL_BOOKS);
  //const [favgenre, setFavgenre] = useState();

  //const meresult = useQuery(ME);
  const meresult = useQuery(ME, {
    skip: !props.show,
  });

  const genre =
    meresult.data && meresult.data.me
      ? meresult.data.me.favoriteGenre
      : undefined;

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre || !props.show,
  });

  console.log(genre);
  console.log(result);
  console.log(meresult);

  if (!props.show) {
    return null;
  }

  if (result.loading || !result.data) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

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
