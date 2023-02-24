import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace) => {
    setHistory((prev) => {
      if (!replace) {
        return [...prev, newMode];
      } else {
        return [...prev.slice(0, prev.length - 1), newMode];
      }
    });
    return setMode(newMode);
  };

  const back = () => {
    if (history.length === 1) {
      return setMode(history[0]);
    } else {
      history.pop();
      setHistory([...history]);
      return setMode(history[history.length - 1]);
    }
  };

  return { mode, history, transition, back };
}
