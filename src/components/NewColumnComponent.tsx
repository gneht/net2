import { useState } from "react";
import { OPTIONS } from "../types";

import "./NewColumnComponent.css";

function NewColumnComponent(props: {
  options: OPTIONS;
  createColumnHandler: (title: string, imports: string) => any;
}) {
  const { options, createColumnHandler } = props;
  const [title, setTitle] = useState("");
  const [imports, setImports] = useState("");

  const [showImports, setShowImports] = useState<boolean>(false);

  return (
    <div className="add-column w-80 flex-none m-4 rounded-md shadow-md ring-1 ring-black ring-opacity-5 bg-white">
      <div className="p-4 add-column-heading text-gray-600 font-medium">
        + Add Column
      </div>
      <div className="add-column-dropdown">
        <form
          className="p-4"
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
            className="p-1 w-full border-b-2 focus:outline-none focus:border-gray-500"
            placeholder="Column Title"
          ></input>
          <div className="flex flex-col items-end mt-2">
            <button
              type="button"
              className="text-sm text-gray-500 rounded-md px-2 py-1 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => setShowImports(!showImports)}
            >
              Import{" "}
              <div className="inline-flex transition-all duration-150">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            {showImports ? (
              <div className="mt-2 w-full">
                <textarea
                  value={imports}
                  onChange={(e) => setImports(e.target.value)}
                  className="p-1 h-16 w-full border-2 rounded-md focus:outline-none focus:border-gray-500"
                  style={{ resize: "none" }}
                  placeholder={`${
                    options.markdownLinks
                      ? "[Google](https://www.google.com/)\n[Yale](https://www.yale.edu/)"
                      : "https://www.google.com/\nhttps://www.yale.edu"
                  }`}
                ></textarea>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewColumnComponent;
