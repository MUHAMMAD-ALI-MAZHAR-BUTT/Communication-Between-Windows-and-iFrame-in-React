import { useEffect, useState, useRef } from "react";
import "./../style/component/IframeParent.css";

function IframeParent() {
  const iframeRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [iframeReceivedMessage, setIframeReceivedMessage] = useState("");

  const handleInputField = (e) => {
    setInputMessage(e.target.value);
  };

  // Message event listener in the parent window for handling send message to iFrame
  const handleSendMessage = () => {
    const iframeWindow = iframeRef.current.contentWindow;
    iframeWindow.postMessage(inputMessage, "http://localhost:5174");
  };

  // Message event listener in the parent window for handling receive message from iFrame
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
      <div className="parent-component-container">
        <h1 className="parent-component-heading">Parent Component</h1>
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
          <p>
            {typeof iframeReceivedMessage === "object"
              ? JSON.stringify(iframeReceivedMessage)
              : iframeReceivedMessage}
          </p>
        </div>
      </div>
      <div className="child-component-container">
        <iframe
          ref={iframeRef}
          src="/iframe-child/"
          width="600"
          height="400"
          title="Child Iframe"
        />
      </div>
    </>
  );
}

export default IframeParent;
