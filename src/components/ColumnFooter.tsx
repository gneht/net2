import { useState } from "react";

import { OPTIONS } from "../types";

function ColumnFooter(props: {
  options: OPTIONS;
  createCardHandler: (text: string) => any;
}) {
  const { createCardHandler, options } = props;

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      {options.markdownLinks ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCardHandler(text);
            setText("");
          }}
          noValidate
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-1"
            placeholder={"'[text](url)' or 'url'"}
          ></input>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCardHandler(text);
            setText("");
          }}
          noValidate
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-1"
            placeholder={"text"}
          ></input>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-1"
            placeholder={"url"}
          ></input>
        </form>
      )}
    </div>
  );
}

export default ColumnFooter;
