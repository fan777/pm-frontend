import { readableTime } from "../helpers/formatter";

const News = ({ news }) => {

  return (
    <>
      <h4>NEWS</h4>
      {news
        ? news.map(article => (
          <p key={article.uuid}><a href={`${article.link}`}>{article.title}</a> <br />
            published by {article.publisher} @ {readableTime(article.providerPublishTime)}
          </p>))
        : <p>No news found...</p>
      }
    </>
  )
}

export default News
