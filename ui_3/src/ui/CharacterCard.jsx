// src/components/CharacterCard.jsx
import React from "react";
import { useThemeContext } from "../context/ThemeContext";

export default function CharacterCard({ character, onSelect }) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const baseClasses = isDark
    ? "bg-gray-900 border-gray-700 text-gray-100"
    : "bg-gray-100 border-gray-300 text-gray-900";

  return (
    <div
      onClick={() => onSelect?.(character)}
      className={`
        ${baseClasses}
        border rounded-xl p-4 cursor-pointer transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl hover:opacity-95
        flex flex-col gap-2
      `}
    >
      {character.image && (
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <h3 className="font-bold text-lg">{character.name}</h3>

      {character.role && (
        <p className="text-sm opacity-70">{character.role}</p>
      )}

      {character.description && (
        <p className="text-xs opacity-80">
          {character.description.slice(0, 120)}…
        </p>
      )}
    </div>
  );
}
