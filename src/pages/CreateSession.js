import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function CreateSession() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("unspecified");
  const [language, setLanguage] = useState("en");
  const [code, setCode] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();

  async function create() {
    if (!name) return alert("Please enter your name.");

    try {
      const res = await fetch(`${API_BASE}/create_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator_name: name,
          gender: gender,
          language: language
        })
      });

      const data = await res.json();
      if (data.session_id) setCode(data.session_id);
      else alert("Error creating session");
    } catch {
      alert("Could not reach backend");
    }
  }

  function copyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    alert("Code copied");
  }

  return (
    <div className="fade-in">

      {/* BACKGROUND WAVE */}
      <div className="breathing-bg">
        <svg
