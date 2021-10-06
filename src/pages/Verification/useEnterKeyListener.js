const { useEffect } = require("react");

const UseEnterKeyListener = ({ querySelectorToExecuteClick }) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handlePressEnter();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  const handlePressEnter = () => {
    const mouseClickEvents = ["mousedown", "click", "mouseup"];
    function simulateMouseClick(element) {
      if(element === null){}
      else{
        mouseClickEvents.forEach((mouseEventType) =>
        element.dispatchEvent(
          new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
          })
        )
      );
      }
    }
    var element = document.querySelector(querySelectorToExecuteClick);
    simulateMouseClick(element);
  };
  return null;
};

export default UseEnterKeyListener;