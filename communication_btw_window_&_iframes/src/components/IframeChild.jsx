import { useEffect, useState, useRef } from "react";
import "./../style/component/IframeChild.css";

function IframeChild() {
  const iframeRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [iframeReceivedMessage, setIframeReceivedMessage] = useState("");

  const handleInputField = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
     
    const iframeWindow = iframeRef.current.contentWindow;
    iframeWindow.postMessage(inputMessage, "http://localhost:5174");
  };

  const handleMessage = (event) => {
    if (event.origin !== "http://localhost:5174") {
      return; // Ignore messages from unknown origins
    }
    setIframeReceivedMessage(event.data);
    console.log("Message received from iFrame:", event.data);
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div className="child-component-container">
        <h1 className="child-component-heading">Child Component</h1>
        <input
          className="input-message"
          type="text"
          placeholder="Enter Input Message"
          onChange={handleInputField}
        />
        <button className="submit-button" onClick={handleSendMessage}>
          Send Message
        </button>
        <div className="received-message-container">
          <h4>Received Message:</h4>
          <p>{iframeReceivedMessage}</p>
        </div>
      </div>
    </>
  );
}

export default IframeChild;
