// src/hooks/useClickOutside.js
import { useEffect } from "react";

/**
 * A custom hook that triggers a callback when a click is detected outside of the referenced element.
 * @param {React.RefObject} ref - The ref of the element to monitor.
 * @param {Function} handler - The function to call when a click outside is detected.
 */
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if the click is inside the ref's element or its descendants
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup function to remove the event listeners
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Re-run effect only if ref or handler changes
};

export default useClickOutside;
