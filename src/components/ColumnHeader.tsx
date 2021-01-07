import { useState, useRef } from "react";

function ColumnHeader(props: {
  column: { id: string; title: string };
  removeColumnHandler: (columnId: string) => any;
  clipboardHandler: (columnId: string) => any;
  updateColumnHandler: (title: string) => any;
  openAllCardsHandler: (columnId: string) => any;
  collapse: boolean;
  setCollapse: (collapse: boolean) => any;
  dragHandleProps: any;
}) {
  const {
    column,
    removeColumnHandler,
    clipboardHandler,
    updateColumnHandler,
    openAllCardsHandler,
    collapse,
    setCollapse,
    dragHandleProps,
  } = props;

  const [title, setTitle] = useState(column.title);
  const [showTarget, setShowTarget] = useState(true);

  // Consider resizeInputs
  const input = useRef<any>(null);

  const onTargetClick = (e: any) => {
    if (e.target === e.currentTarget) {
      input.current.focus();
      input.current.select();
    }
    setShowTarget(false);
  };

  const handleKeydown = (e: any) => {
    if (e.which === 13 || e.which === 27) {
      input.current.blur();
    }
  };

  const onBlur = () => {
    if (title !== column.title) {
      updateColumnHandler(title);
    }
    setShowTarget(true);
  };

  return (
    <div className="m-1 flex justify-between" {...dragHandleProps}>
      <div className="relative">
        {showTarget && (
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={onTargetClick}
          ></div>
        )}
        <input
          ref={input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onBlur={onBlur}
          onKeyDown={handleKeydown}
          className=""
          placeholder="Untitled"
        ></input>
      </div>

      <div className="flex">
        {collapse ? (
          <button onClick={() => setCollapse(false)}>F</button>
        ) : (
          <button onClick={() => setCollapse(true)}>T</button>
        )}
        <button onClick={() => openAllCardsHandler(column.id)}>O</button>
        <button onClick={() => clipboardHandler(column.id)}>C</button>
        <button onClick={() => removeColumnHandler(column.id)}>X</button>
      </div>
    </div>
  );
}

export default ColumnHeader;
