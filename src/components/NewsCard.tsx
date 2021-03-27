import { IconButton } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React, { useCallback } from "react";
import { News } from "./News";

const NewsCard = (props: { news: News }) => {
  const { news } = props;
  const fulldate = new Date(news.publishedAt);
  const date = fulldate.toString().split(" ");

  // const [starred, dispatchStarred] = useNews()
  // const isStarred = starred.includes(news.url)
  // const onStarClick = useCallback(() => if (isStarred) {
  //   dispatchStarred({type: 'REMOVE', id: news.url})
  // } else {
  //   dispatchStarred({type: 'ADD', id: news.url})
  // }, [isStarred, news.url])

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
            {/* <div>
              <IconButton onClick={onStarClick}>
                <Star style={isStarred && { color: "yellow" }} />
              </IconButton>
            </div> */}
          </>
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
