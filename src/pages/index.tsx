import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [length, setLength] = useState(8); // Default length for better UX
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState([]);

  const generatePassword = () => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+[]{}|;:,.<>?";

    const passwordsArray = [];

    for (let i = 0; i < 5; i++) {
      let password = "";
      for (let j = 0; j < length; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      passwordsArray.push(password);
    }

    setPasswords(passwordsArray);
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    toast("Password copied to clipboard");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Password Generator
        </h1>
        <input
          type="number"
          placeholder="Length"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded mb-6 text-lg"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="mr-2"
          />
          <label className="text-lg">Include Numbers</label>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="mr-2"
          />
          <label className="text-lg">Include Symbols</label>
        </div>
        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 text-lg"
        >
          Generate
        </button>
        <div className="mt-6">
          {passwords.map((password, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2"
            >
              <span className="text-lg">{password}</span>
              <button
                onClick={() => copyToClipboard(password)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
