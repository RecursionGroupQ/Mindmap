import React, { useContext } from "react";
import { FaUndo, FaRedo } from "react-icons/fa";
import { RoomContext } from "../../../context/RoomContext";
import NodeColorPanel from "./ToolBoxPanelComponent/NodeColorPanel";
import NodeShapePanel from "./ToolBoxPanelComponent/NodeShapePanel";

const ToolBox = () => {
  const { setNodes, dark, history, historyIndex, setHistoryIndex } = useContext(RoomContext);
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex: number = historyIndex - 1;
      const newHistory = new Map(history[prevIndex]);
      setNodes(newHistory);
      setHistoryIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (history.length - 1 > historyIndex) {
      const frontIndex: number = historyIndex + 1;
      const newHistory = new Map(history[frontIndex]);
      setNodes(newHistory);
      setHistoryIndex(frontIndex);
    }
  };

  const darkOrLight = dark
    ? "my-10 px-5 py-3 w-4/12 h-full grid grid-cols-6 #6b7280 border-4 rounded-2xl border-indigo-600"
    : "my-10 px-5 py-3 w-4/12 h-full grid grid-cols-6 #f8fafc border-4 rounded-2xl border-indigo-600";

  const isUndo = historyIndex === 0 ? "opacity-25 w-full h-full" : "w-full h-full hover:bg-grey-300";

  const isRedo = historyIndex === history.length - 1 ? "opacity-25 w-full h-full" : "w-full h-full hover:bg-grey-300";
  return (
    <div className="flex justify-center">
      <div className={darkOrLight}>
        <div className="w-full h-full flex items-center hover:bg-grey-300">
          <NodeColorPanel value="fill" />
        </div>
        <div className="w-full h-full flex items-center hover:bg-grey-300">
          <NodeColorPanel value="stroke" />
        </div>
        <div className="w-full h-full flex items-center hover:bg-grey-300">
          <NodeColorPanel value="line" />
        </div>
        <div className="w-full h-full flex items-center hover:bg-grey-300">
          <NodeShapePanel />
        </div>
        <div className={isUndo}>
          <button
            className="h-full w-full flex justify-center items-center"
            type="button"
            onClick={() => handleUndo()}
            disabled={historyIndex === 0}
          >
            <FaUndo size={40} />
          </button>
        </div>
        <div className={isRedo}>
          <button
            className="h-full w-full flex justify-center items-center"
            type="button"
            onClick={() => handleRedo()}
            disabled={historyIndex === history.length - 1}
          >
            <FaRedo size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBox;