import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Toolbar,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import { News } from "../components/News";
import NewsCard from "../components/NewsCard";
import { apiGet } from "../misc/custom-hooks";
import SearchIcon from "@material-ui/icons/Search";

type HomeProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  starred: any;
  setStarred: (starred: any) => void;
};

const Home: React.FC<HomeProps> = ({
  loggedIn,
  setLoggedIn,
  starred,
  setStarred,
}) => {
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [results, setResults] = useState<News[]>([]);
  const [newsLength, setNewsLength] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("publishedAt");
  const location = useLocation();

  const onInputChange = useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(input, page, sortBy).then((result) => {
      setResults(result.articles);
      setNewsLength(result.totalResults);
    });
  };
  useEffect(() => {
    onSearch();
  }, [page, sortBy]);

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onPageChange = useCallback((event: any, value: number) => {
    setPage(value);
    console.log(value);
  }, []);

  const handleChange = (event: any) => setSortBy(event.target.value);

  return (
    <div style={{ margin: "0 15%", fontFamily: "Oxygen" }}>
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
              <IconButton onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div style={{ marginBottom: "1em" }}>
        <FormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleChange} label="Sort By">
            <MenuItem value={"publishedAt"}>Most Recent</MenuItem>
            <MenuItem value={"popularity"}>Popularity</MenuItem>
            <MenuItem value={"relevancy"}>Relevance</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {results && newsLength > 0 ? (
          results.map((news) => (
            <NewsCard
              key={news.url + news.publishedAt}
              news={news}
              starred={starred}
              setStarred={setStarred}
              loggedIn={loggedIn}
            ></NewsCard>
          ))
        ) : (
          <div style={{ textAlign: "center", margin: "2em 0" }}>
            News Not Found
          </div>
        )}
      </div>
      <div style={{ margin: "5em 0 3em" }}>
        <Pagination
          count={newsLength > 100 ? 5 : Math.ceil(newsLength / 20)}
          page={page}
          onChange={onPageChange}
          color="primary"
          variant="outlined"
          size="large"
        />
      </div>
    </div>
  );
};

export default Home;
