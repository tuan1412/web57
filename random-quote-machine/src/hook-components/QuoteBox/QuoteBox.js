import React from "react";
import axios from "axios";

import "./QuoteBox.css";

function QuoteBox(props) {
  const [quoteBoxData, setQuoteBoxData] = React.useState({
    status: "idle",
    data: null,
  });
  const { activeTags, activeColor } = props;

  const fetchQuote = async (tags) => {
    try {
      setQuoteBoxData({ status: "loading" });

      const res = await axios.get("https://api.quotable.io/random", {
        params: {
          activeTags: tags.join(","),
        },
      });
      setQuoteBoxData({
        status: "success",
        data: {
          content: res.data.content,
          author: res.data.author,
        },
      });
    } catch (err) {
      setQuoteBoxData({ status: "error" });
    }
  };

  React.useEffect(() => {
    fetchQuote(activeTags);
  }, [activeTags]);

  const onRefreshQuote = async () => {
    fetchQuote();
  };

  const renderQuote = () => {
    const { status, data } = quoteBoxData;

    const isIdle = status === "idle";
    const isLoading = status === "loading";
    const isError = status === "error";
    const isSuccess = status === "success";

    if (isIdle || isLoading) {
      return <div>Loading...</div>;
    }

    if (isSuccess) {
      return (
        <>
          <div className="QuoteBox-content">{data.content}</div>
          <div className="QuoteBox-author">{data.author}</div>
        </>
      );
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }

    return null;
  };

  return (
    <div className="QuoteBox" style={{ color: activeColor }}>
      {renderQuote()}
      <div className="QuoteBox-refresh">
        <button
          style={{ background: activeColor }}
          className="QuoteBox-btn"
          onClick={onRefreshQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default QuoteBox;
