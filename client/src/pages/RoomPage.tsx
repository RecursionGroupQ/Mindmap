import React, { useContext, useRef, useEffect } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import { Node, RoomContext, fills, CANVAS_WIDTH, CANVAS_HEIGHT } from "../context/RoomContext";
import Edge from "../components/RoomPage/Edge";
import Shape from "../components/RoomPage/Shape";

const RoomPage = () => {
  const { nodes, setNodes, shapeRefs } = useContext(RoomContext);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (shapeRefs) {
      transformerRef.current?.nodes(shapeRefs.map((ref) => ref.current as Konva.Group));
      transformerRef.current?.getLayer()?.batchDraw();
    }
  }, [shapeRefs]);

  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    let pointerPosition = null;
    if (stage) {
      pointerPosition = stage.getRelativePointerPosition();
      if (pointerPosition) {
        const newNode: Node = {
          id: nodes.length + 1,
          children: [],
          text: `node-${nodes.length + 1}`,
          x: pointerPosition.x,
          y: pointerPosition.y,
          fill: fills[Math.floor(Math.random() * fills.length)],
          isDragging: false,
        };
        setNodes((prevState) => [...prevState, newNode]);
      }
    }
  };

  return (
    <RoomContext.Consumer>
      {(value) => (
        <Stage
          className="-z-10 absolute top-0"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onDblClick={handleDoubleClick}
          draggable
        >
          <RoomContext.Provider value={value}>
            <Layer>
              {nodes.map((node) => (
                <Edge key={node.id} node={node} />
              ))}
              {nodes.map((node, ind) => (
                <Shape key={node.id} node={node} ind={ind} />
              ))}
              {shapeRefs && <Transformer ref={transformerRef} />}
            </Layer>
          </RoomContext.Provider>
        </Stage>
      )}
    </RoomContext.Consumer>
  );
};

export default RoomPage;