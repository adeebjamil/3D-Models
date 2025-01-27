import React from "react";
import CarScene from "../components/CarScene";


function Car() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
      padding: "2rem"
    }}>
      <div style={{ 
        width: "90vw", 
        height: "90vh",
        borderRadius: "30px",
        overflow: "hidden",
        backgroundColor: "#101010",
        boxShadow: "0 0 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s ease-in-out",
        position: "relative"
      }}>  
        <CarScene />
      </div>
    </div>
  );
}

export default Car;