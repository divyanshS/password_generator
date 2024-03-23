import React, { useState } from "react";
import "./App.css"; // Import your CSS file

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}<>?",
  };

  const generatePassword = () => {
    let charPool = "";

    if (includeUppercase) charPool += characters.uppercase;
    if (includeLowercase) charPool += characters.lowercase;
    if (includeNumbers) charPool += characters.numbers;
    if (includeSymbols) charPool += characters.symbols;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charPool.charAt(
        Math.floor(Math.random() * charPool.length)
      );
    }

    setPassword(newPassword);
  };

  const handleLengthChange = (e) => {
    const newVal = e.target.value;
    if (newVal < 8 || newVal > 32) {
      // setPasswordLength(8)
      return;
    }
    setPasswordLength(newVal);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy password:", err);
        alert("Failed to copy password. Please try again.");
      });
  };

  const allowGenerate =
    includeLowercase || includeUppercase || includeNumbers || includeSymbols;
  return (
    <div className="App">
      <h1>Random Password Generator</h1>

      <div className="options-container">
        <div className="row">
          <label htmlFor="passwordLength">
            Generate a password of length [1-32]:
          </label>
          <input
            type="number"
            id="passwordLength"
            min="8"
            max="32"
            value={passwordLength}
            onChange={handleLengthChange}
          />
        </div>
        <div className="row">
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label htmlFor="includeUppercase">Include Uppercase Letters</label>
        </div>

        <div className="row">
          <input
            type="checkbox"
            id="includeLowercase"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <label htmlFor="includeLowercase">Include Lowercase Letters</label>
        </div>

        <div className="row">
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label htmlFor="includeNumbers">Include Numbers</label>
        </div>

        <div className="row">
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label htmlFor="includeSymbols">
            Include Special-Characters/Symbols
          </label>
        </div>
      </div>

      {allowGenerate ? (
        <button onClick={generatePassword}>Generate Password</button>
      ) : (
        <p className="error">Select atleast one option to generate a password</p>
      )}

      {password ? (
        <div className="password-container">
          <input type="text" value={password} readOnly disabled />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      ) : null}

      <hr />
      <div className="tips">
        # Tips:
        <ul>
          <li>
            Use a longer password (at least 12 characters) for better security.
          </li>
          <li>
            Combine uppercase and lowercase letters, numbers, and symbols.
          </li>
          <li>Do not use the same password for multiple accounts.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
