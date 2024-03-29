import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS, EDIT_BIRTH } from "../queries";
import { useMutation } from "@apollo/client";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(1900);

  const result = useQuery(ALL_PERSONS);
  const [editBirth] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("set birth...");
    editBirth({ variables: { name, born } });
    //createPerson({ variables: { title, author, published, genres } });

    //setName("");
    setBorn(1900);
  };

  const handleChange = async (event) => {
    setName(event.target.value);
    //this.setState({ value: event.target.value });
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.logged ? (
        <>
          <h2>Set birth</h2>

          <form onSubmit={submit}>
            <div>
              name
              <select value={name} onChange={handleChange}>
                {authors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">set</button>
          </form>
        </>
      ) : (
        <>
          <p>Please login to set birth.</p>
        </>
      )}
    </div>
  );
};

export default Authors;
