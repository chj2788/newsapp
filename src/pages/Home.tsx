import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import { News } from "../components/News";
import NewsCard from "../components/NewsCard";
import {
  apiGet,
  // useLastQuery
} from "../misc/custom-hooks";

type HomeProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

const Home: React.FC<HomeProps> = ({ loggedIn, setLoggedIn }) => {
  const [input, setInput] = useState<string>("");
  // const [page, setPage] = useState<number>(1);
  const [results, setResults] = useState<News[]>([]);
  const [newsLength, setNewsLength] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<number>(0);
  const location = useLocation();

  const onInputChange = useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(input).then((result) => {
      setResults(result.articles);
      setNewsLength(result.totalResults);
      console.log(result, result.articles);
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  // const onPageChange = useCallback((event: any, value: number) => {
  //   setPage(value);
  //   onSearch();
  //   console.log(value);
  // }, []);

  return (
    <div style={{ margin: "0 3em" }}>
      <Appbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Toolbar />
      {loggedIn ? (
        <div style={{ textAlign: "center", margin: "2em" }}>
          <Button
            variant="contained"
            color={"/" === location.pathname ? "primary" : "default"}
          >
            <NavLink
              style={{ textDecoration: "none", color: "gray" }}
              exact
              to="/"
            >
              Home
            </NavLink>
          </Button>
          <Button
            variant="contained"
            color={"/starred" === location.pathname ? "primary" : "default"}
          >
            <NavLink
              style={{ textDecoration: "none", color: "gray" }}
              exact
              to="/starred"
            >
              My favorites
            </NavLink>
          </Button>
        </div>
      ) : (
        // <Toolbar />
        <div
          style={{
            textAlign: "center",
            margin: "2em",
            fontWeight: 500,
            color: "red",
          }}
        >
          ↑↑↑ Please Log in to use Favorite feature ↑↑↑
        </div>
      )}
      <div style={{ marginBottom: "2em" }}>
        <OutlinedInput
          fullWidth
          placeholder="Search here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={onSearch}>search</Button>
            </InputAdornment>
          }
        />
      </div>
      <div>
        {results && results.length > 0 ? (
          results.map((news) => (
            <NewsCard key={news.author} news={news}></NewsCard>
          ))
        ) : (
          <div style={{ textAlign: "center", margin: "2em 0" }}>
            News Not Found
          </div>
        )}
      </div>
      {loadMore <= newsLength && (
        <>
          <hr />
          <Button onClick={() => setLoadMore(loadMore + 20)}>Load More</Button>
        </>
      )}
      {/* <Pagination
        count={Math.ceil(newsLength / 20)}
        page={page}
        onChange={onPageChange}
      /> */}
    </div>
  );
};

export default Home;
