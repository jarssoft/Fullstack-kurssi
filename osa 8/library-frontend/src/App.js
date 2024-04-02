import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries.js";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      alert("Uusi kirja on juuri lisätty luetteloon.");
    },
  });

  const login = (token) => {
    setToken(token);
    localStorage.setItem("phonenumbers-user-token", token);
    //client.resetStore();
    setPage("books");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("books");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} logged={token} />
      <Books show={page === "books"} />
      <Recommend show={page === "recommend"} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setToken={login} />
    </div>
  );
};

export default App;
