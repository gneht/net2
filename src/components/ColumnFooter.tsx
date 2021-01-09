import { useState } from "react";

import { OPTIONS } from "../types";

function ColumnFooter(props: {
  options: OPTIONS;
  createCardHandler: (text: string) => any;
}) {
  const { createCardHandler, options } = props;

  const [text, setText] = useState("");

  return (
    <div>
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
          placeholder={options.markdownLinks ? "'[text](url)' or 'url'" : "url"}
        ></input>
      </form>
    </div>
  );
}

export default ColumnFooter;
