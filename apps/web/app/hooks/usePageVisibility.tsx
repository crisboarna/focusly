import { useState, useEffect } from 'react';

const getProperties = () => {
  let hidden = "hidden";
  let visibilityChange = "visibilitychange";
  // @ts-ignore
  if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    // @ts-ignore
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  return { hidden, visibilityChange };
};

const usePageVisibility = () => {
  const [hidden, setHidden] = useState(false);
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    const { hidden, visibilityChange } = getProperties();
    const propertyName = hidden;
    const eventName = visibilityChange;

    const onVisibilityChange = () => {
      // @ts-ignore
      const hidden = document[propertyName];
      setHidden(hidden);
      setFocus(document.hasFocus());
    };

    const onFocus = () => {
      setFocus(true);
    };

    const onBlur = () => {
      setFocus(false);
    };

    window.addEventListener(eventName, onVisibilityChange);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener(eventName, onVisibilityChange);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const visible = focus && !hidden;

  return { visible, focus, hidden };
};

export default usePageVisibility;
