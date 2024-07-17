import { useEffect, useState, ReactElement } from "react";
import { Droppable, DroppableProps, DroppableProvided } from "react-beautiful-dnd";

interface StrictModeDroppableProps extends Omit<DroppableProps, 'children'> {
  children: (provided: DroppableProvided) => ReactElement;
}

const StrictModeDroppable = ({ children, ...props }: StrictModeDroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
