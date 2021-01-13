import { useState } from "react";
import { useMain } from "../context/main";

import handleGenerateLink from "../handlers/handleGenerateLink";
import toastGenerateLink from "./toasts/toastGenerateLink";

const Header = (props: {
  selected: Array<string>;
  showSelection: boolean;
  setSelected: (selected: Array<string>) => any;
  setShowSelection: (showSelection: boolean) => any;
}) => {
  const { selected, showSelection, setSelected, setShowSelection } = props;

  const { cards, columns, columnOrder, options, setOptions } = useMain();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed h-1/5 flex items-end w-screen z-10 justify-center ">
      <div className="flex justify-between items-center w-4/5 md:w-3/5 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <h1 className="text-xl font-medium text-gray-600">
            Net{" "}
            <span
              role="img"
              aria-label="goal-net"
              style={{ filter: "grayscale(100%" }}
            >
              🥅
            </span>
          </h1>
        </div>

        <div className="-mr-2 -my-2 flex space-x-2 md:hidden">
          {columnOrder.length > 0 && (
            <div>
              {showSelection ? (
                <div className="flex space-x-3">
                  {selected.length !== 0 && (
                    <button
                      type="button"
                      className="bg-blue-100 rounded-md px-3 py-2 text-blue-500 inline-flex items-center text-base font-medium hover:text-blue-900 focus:outline-none ring-2 ring-offset-2 ring-gray-blue focus:ring-gray-blue"
                      onClick={async () => {
                        const link: string = await handleGenerateLink(
                          selected,
                          cards,
                          columns,
                          columnOrder
                        );
                        toastGenerateLink(link);
                        setShowSelection(false);
                        setSelected([]);
                      }}
                    >
                      Generate Link
                    </button>
                  )}
                  <button
                    type="button"
                    className="bg-white rounded-md px-2 py-2 text-yellow-500 inline-flex items-center text-base font-medium hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={() => {
                      setShowSelection(false);
                      setSelected([]);
                    }}
                  >
                    <div className="h-4 w-4">
                      {/* CANCEL ICON */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="bg-white rounded-md px-4 py-2 text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowSelection(true)}
                >
                  Select
                  <div className="w-6 h-6">
                    {/* SELECT ICON */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          )}

          {!showSelection && (
            <button
              type="button"
              className={`bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-${options.theme}-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500`}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <div className="h-6 w-6">
                {/* MENU ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          )}
        </div>

        <div className="hidden md:flex items-baseline justify-end md:flex-1 lg:w-0 space-x-4">
          {columnOrder.length > 0 && (
            <div>
              {showSelection ? (
                <div className="space-x-4">
                  {selected.length !== 0 && (
                    <button
                      type="button"
                      className="bg-blue-100 rounded-md px-4 py-2 text-blue-500 inline-flex items-center text-base font-medium hover:text-blue-900 focus:outline-none ring-2 ring-offset-2 ring-gray-blue focus:ring-gray-blue"
                      onClick={async () => {
                        const link: string = await handleGenerateLink(
                          selected,
                          cards,
                          columns,
                          columnOrder
                        );
                        toastGenerateLink(link);
                        setShowSelection(false);
                        setSelected([]);
                      }}
                    >
                      Generate Link
                    </button>
                  )}

                  <button
                    type="button"
                    className="bg-white rounded-md px-4 py-2 text-yellow-500 inline-flex items-center text-base font-medium hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={() => {
                      setShowSelection(false);
                      setSelected([]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="bg-white rounded-md px-4 py-2 text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowSelection(true)}
                >
                  Select
                  <div className="w-6 h-6">
                    {/* SELECT */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          )}

          {!showSelection && (
            <div className="dropdown-wrapper relative">
              <button
                type="button"
                className="group px-4 py-2 bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Options{" "}
                <div className="w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
              </button>
              <div className="flex flex-col dropdown-container transition-all duration-150 absolute  right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="block inline-flex space-x-2 items-baseline px-4 py-2 ">
                  <input
                    type="checkbox"
                    checked={options.markdownLinks || false}
                    onChange={() => {
                      setOptions({
                        ...options,
                        markdownLinks: !options.markdownLinks,
                      });
                    }}
                  ></input>
                  <label className="text-sm text-gray-700 whitespace-nowrap	">
                    Markdown Mode
                  </label>
                </div>
                <div className="block inline-flex space-x-2 items-baseline px-4 py-2 ">
                  <input
                    type="checkbox"
                    checked={options.openOnLaunch || false}
                    onChange={() => {
                      setOptions({
                        ...options,
                        openOnLaunch: !options.openOnLaunch,
                      });
                    }}
                  ></input>
                  <label className="text-sm text-gray-700 whitespace-nowrap	">
                    Open On Launch
                  </label>
                </div>
                <div className="block inline-flex space-x-2 items-baseline px-4 py-2">
                  <input
                    type="checkbox"
                    checked={options.showCollapsed || false}
                    onChange={() => {
                      setOptions({
                        ...options,
                        showCollapsed: !options.showCollapsed,
                      });
                    }}
                  ></input>
                  <label className="text-sm text-gray-700 whitespace-nowrap	">
                    Show Collapsed
                  </label>
                </div>
              </div>
            </div>
          )}

          {!showSelection && (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/"
              className="whitespace-nowrap group px-4 py-2 bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none ring-2 ring-offset-2 ring-gray-500 focus:ring-gray-900"
            >
              Log in{" "}
              <div className="h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </a>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full p-2 transition-all duration-150 transform origin-top-right ${
          menuOpen ? "visible opacity-100 mt-0" : "invisible opacity-0 mt-8"
        }`}
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-1 px-5">
            <div>
              <nav className="flex justify-between items-baseline gap-y-8">
                <span className="text-base font-medium text-gray-900">
                  Options
                </span>
                <button
                  type="button"
                  className={`bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-${options.theme}-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500`}
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <div className="h-6 w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="flex flex-col gap-y-4">
              <div className="block inline-flex items-baseline space-x-2">
                <input
                  type="checkbox"
                  checked={options.markdownLinks || false}
                  onChange={() => {
                    setOptions({
                      ...options,
                      markdownLinks: !options.markdownLinks,
                    });
                  }}
                ></input>
                <label>Markdown mode </label>
              </div>
              <div className="block inline-flex items-baseline space-x-2">
                <input
                  type="checkbox"
                  checked={options.openOnLaunch || false}
                  onChange={() => {
                    setOptions({
                      ...options,
                      openOnLaunch: !options.openOnLaunch,
                    });
                  }}
                ></input>
                <label>Open On Launch </label>
              </div>
              <div className="block inline-flex items-baseline space-x-2">
                <input
                  type="checkbox"
                  checked={options.showCollapsed || false}
                  onChange={() => {
                    setOptions({
                      ...options,
                      showCollapsed: !options.showCollapsed,
                    });
                  }}
                ></input>
                <label>Show Collapsed </label>
              </div>
            </div>

            <div>
              {/* <a
                href="https://www.google.com/"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-tr from-gray-500 to-gray-600 shadow"
              >
                Start making
              </a> */}
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.google.com/"
                  className="text-gray-600 hover:text-gray-500"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
