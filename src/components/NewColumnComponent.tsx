import { useState } from "react";
import { OPTIONS } from "../types";

function NewColumnComponent(props: {
  options: OPTIONS;
  createColumnHandler: (title: string, imports: string) => any;
}) {
  const { options, createColumnHandler } = props;
  const [title, setTitle] = useState("");
  const [imports, setImports] = useState("");

  return (
    <div className="w-80 flex-none m-1 border-solid border-4 border-gray-400 rounded-md">
      <h3 className="p-1">New Column</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createColumnHandler(title, imports); // , imports
          setTitle("");
          setImports("");
        }}
        noValidate
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-1"
          placeholder="Column Title"
        ></input>
        <textarea
          value={imports}
          onChange={(e) => setImports(e.target.value)}
          className="p-1 h-48 w-full"
          placeholder={`Paste to import\n––\n${
            options.markdownLinks
              ? "Ex.\n[Google](https://www.google.com/)\n[Yale](https://www.yale.edu/)"
              : "Ex.\nhttps://www.google.com/\nhttps://www.yale.edu"
          }`}
        ></textarea>
      </form>
    </div>
  );
}

export default NewColumnComponent;
