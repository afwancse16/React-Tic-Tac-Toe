import { useState } from "react";

export default function Player({ name, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditing() {
    setIsEditing((edit) => !edit);

    if(isEditing) {
        onNameChange(symbol, playerName);
    }
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
