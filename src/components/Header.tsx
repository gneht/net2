import { OPTIONS } from "../types";

const Header = (props: {
  options: OPTIONS;
  setOptions: (options: OPTIONS) => any;
}) => {
  const { options, setOptions } = props;

  return (
    <div className="h-1/3 flex items-end">
      <h1 className="text-xl ml-8">
        Net{" "}
        <span role="img" aria-label="goal-net">
          🥅
        </span>
      </h1>
      <div>
        <h4>Markdown mode</h4>
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
        <h4>Open On Launch</h4>
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
      </div>
    </div>
  );
};

export default Header;
