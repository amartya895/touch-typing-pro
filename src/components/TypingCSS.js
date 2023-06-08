import React from "react";

function TypingCSS() {
  return (
    <div
      className="maindiv"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display:'flex'
      }}
    >
      
        <div
          className="row-d1"
          style={{
            flexGrow: 1,
            backgroundColor: "#f00",
            margin: 20,
            display: "flex",
            borderRadius:10,
            flexDirection: "column",
            padding: 20,
            gap: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "yellow",
              padding: 20,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            popup restart
          </div>
          <div
            style={{
              backgroundColor: "yellow",
              padding: 20,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            view letter two display
          </div>
          <div
            style={{
              backgroundColor: "yellow",
              padding: 20,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Input box
          </div>
        </div>
        <div
          className="row-d2"
          style={{
            flexGrow: 0,
            backgroundColor: "pink",
            width: 300,
            margin: 20,
           
            padding: 20,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Div statics
        </div>
      </div>
    
  );
}

export default TypingCSS;
