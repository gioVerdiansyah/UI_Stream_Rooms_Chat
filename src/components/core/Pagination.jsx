export default function Pagination({ apiRoute, fetchingFunc, data }) {
  const url = {
    next_page: apiRoute + "?page=" + data.next_page,
    prev_page: apiRoute + "?page=" + data.prev_page,
  };
  let pageEarly = [];
  let pageEnd = [];
  if (data.last_page > 5) {
    if (data.current_page < 5) {
      pageEarly = [1, 2, 3, 4, 5];
    } else {
      pageEarly = [1, "...", data.current_page - 1];
      if (data.current_page <= data.last_page - 4) {
        pageEnd = [data.current_page + 1, "...", data.last_page];
      } else {
        if (data.current_page > data.last_page - 3) {
          pageEarly.pop(pageEarly.length - 1);
          for (let i = data.current_page - 1; i >= data.last_page - 4; i--) {
            if (i < data.last_page) {
              pageEarly.push(i);
            } else {
              break;
            }
          }
        }
        for (let i = data.current_page; i < data.last_page; i++) {
          pageEnd.push(i + 1);
        }
      }
    }
  } else {
    for (let i = 1; i <= data.last_page; i++) {
      pageEarly.push(i);
    }
  }

  return (
    <div className="flex flex-row justify-between items-center pt-10">
      <div className="font-sans font-medium">
        Showing {data.total_per_data} to {data.per_page} of {data.last_page}{" "}
        results
      </div>
      <div className="join">
        <button
          className={
            "join-item h-9 min-h-8 btn " +
            (data.prev_page == null ? "btn-disabled" : "")
          }
          onClick={() => fetchingFunc(url.prev_page)}
        >
          «
        </button>
        {pageEarly.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              item !== data.current_page &&
              typeof item === "number" &&
              fetchingFunc(`${apiRoute}?page=${item}`)
            }
            className={
              "join-item h-9 min-h-8 btn " +
              (item === data.current_page ? "!text-green-400 btn-disabled" : "")
            }
          >
            {item}
          </button>
        ))}
        {data.current_page >= 5 && (
          <p className="join-item h-9 min-h-8 btn !text-green-400 btn-disabled">
            {data.current_page}
          </p>
        )}
        {pageEnd.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              item !== data.current_page &&
              typeof item === "number" &&
              fetchingFunc(`${apiRoute}?page=${item}`)
            }
            className="join-item h-9 min-h-8 btn"
          >
            {item}
          </button>
        ))}
        <button
          className={
            "join-item h-9 min-h-8 btn " +
            (data.next_page == null ? "btn-disabled" : "")
          }
          onClick={() => fetchingFunc(url.next_page)}
        >
          »
        </button>
      </div>
    </div>
  );
}
