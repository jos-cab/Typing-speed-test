import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1 className="main-title">Typing test</h1>
        <div className="container">
          <button className="test-time-btn">15</button>
          <button className="test-time-btn">30</button>
          <button className="test-time-btn">60</button>
          <button className="test-time-btn">120</button>
        </div>
      </header>
      <main>
        <div className="stats container">
          <span className="time"></span>
          <span className="wpm"></span>
          <span className="accuracy"></span>
        </div>
        <textarea name="typing-area"></textarea>
      </main>
    </>
  );
}

export default App;
