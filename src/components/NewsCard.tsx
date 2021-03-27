import {
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import React, { useCallback, useState } from "react";
import { News } from "./News";

type NewsCardProps = {
  news: News;
  starred: any;
  setStarred: (starred: any) => void;
  loggedIn: boolean;
};

const NewsCard: React.FC<NewsCardProps> = ({
  news,
  starred,
  setStarred,
  loggedIn,
}) => {
  const fulldate = new Date(news.publishedAt);
  const date = fulldate.toString().split(" ");

  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(news.description);
  const [title, setTitle] = useState<string>(news.title);
  const [author, setAuthor] = useState<string>(news.author);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isStarred: boolean = starred.includes(news);

  const tempArticle = starred.filter((star: any) => star !== news);
  const currentContent = news;

  const onEditClick = () => {
    currentContent.description = content;
    currentContent.title = title;
    currentContent.author = author;
    tempArticle.push(currentContent);
    setStarred(tempArticle);
    localStorage.setItem("article", JSON.stringify(starred));
    handleClose();
  };

  const onStarClick = useCallback(() => {
    if (isStarred) {
      setStarred(starred.filter((star: any) => star !== news));
      localStorage.setItem("article", JSON.stringify(starred));
    } else {
      setStarred([news, ...starred]);
      localStorage.setItem("article", JSON.stringify(starred));
    }
  }, [news, starred]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        boxShadow:
          "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        padding: "2em 0",
        marginBottom: "25px",
        borderRadius: "5px",
      }}
    >
      <div style={{ paddingLeft: "1.5em" }}>
        <img
          alt={news.title}
          src={
            news.urlToImage
              ? news.urlToImage
              : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
          }
          style={{ objectFit: "cover", width: "320px", height: "268px" }}
        />
      </div>
      <div
        style={{
          padding: "0 1.5em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: "22px", lineHeight: "27px" }}>
            {news.title}
          </span>
          <br />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 300,
              lineHeight: "22px",
              color: "#808290",
            }}
          >
            <a href={news.url} target="__blank">
              <b>short </b>
            </a>
            <span style={{ fontWeight: 100 }}>
              by {news.author ? news.author : "unknown"} / on {date[0]}{" "}
              {date[1]} {date[2]}, {date[3]}
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "10px 0",
          }}
        >
          <div
            style={{ fontSize: "16px", lineHeight: "22px", color: "#44444d" }}
          >
            {news.description}
          </div>
          <>
            <div>
              {loggedIn && (
                <IconButton onClick={onStarClick}>
                  <Star
                    style={isStarred ? { color: "yellow" } : { color: "gray" }}
                  />
                </IconButton>
              )}
              {isStarred && loggedIn && (
                <Tooltip title="Click to edit the content">
                  <IconButton onClick={handleOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </>
          <Modal
            style={{
              display: "flex",
              padding: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            <div
              style={{
                position: "absolute",
                width: 400,
                backgroundColor: "white",
                border: "1px solid black",
                padding: "2em 3em",
              }}
            >
              <h2>Edit your favorite article</h2>
              <div style={{ marginTop: "2em" }}>
                <TextField
                  name="title"
                  label="title"
                  variant="outlined"
                  value={title}
                  fullWidth
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  required
                  error={title === "" ? true : false}
                  helperText="please enter the title"
                />
              </div>
              <div style={{ margin: "1em 0 2em" }}>
                <TextField
                  name="content"
                  label="content"
                  variant="outlined"
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  fullWidth
                  required
                  error={content === "" ? true : false}
                  helperText="please enter the content"
                />
              </div>
              <div style={{ margin: "1em 0 2em" }}>
                <TextField
                  name="author"
                  label="author"
                  variant="outlined"
                  value={author}
                  onChange={(event) => {
                    setAuthor(event.target.value);
                  }}
                  fullWidth
                  required
                  error={author === "" ? true : false}
                  helperText="please enter the author"
                />
              </div>
              <div>
                <Button fullWidth onClick={onEditClick}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
          <span
            style={{ fontSize: "12px", fontWeight: 400, paddingTop: "10px" }}
          >
            read more at{" "}
            <a
              href={news.url}
              target="__blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <b>{news.source.name}</b>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
