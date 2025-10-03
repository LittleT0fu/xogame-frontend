import React, { useState } from "react";
import { X, Circle } from "lucide-react";

function Cell({ value, onClick, winning, finish }) {
    const disabled = value ? true : false;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-24 h-24 border-2 border-gray-600 rounded-lg
        flex items-center justify-center text-4xl font-bold
        transition-all duration-200
        ${
            disabled || finish
                ? "cursor-not-allowed opacity-90"
                : "hover:bg-gray-700 cursor-pointer"
        }
        ${winning ? "bg-green-400 animate-pulse" : "bg-gray-800"}
        ${!value && !disabled ? "hover:border-blue-500" : ""}`}
        >
            {value === "X" && <X className="w-12 h-12 text-blue-500" />}
            {value === "O" && <Circle className="w-12 h-12 text-red-500" />}
        </button>
    );
}

export default Cell;
