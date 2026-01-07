import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function CreateSession() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("unspecified");
  const [language, setLanguage] = useState("en");
  const [code, setCode] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // ✅ ADDED – wave animation state
  const [wavePhase, setWavePhase] = useState(0);

  const navigate = useNavigate();

  // ✅ ADDED – JS-driven breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(p => (p + 1) % 360);
    }, 40); // speed (lower = faster)

    return () => clearInterval(interval);
  }, []);

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

      {/* BACKGROUND WAVE – JS ANIMATED */}
      <div className="breathing-bg">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave"
          style={{
            transform: `
              translateY(${Math.sin(wavePhase * Math.PI / 180) * 10}px)
              scaleY(${1 + Math.sin(wavePhase * Math.PI / 180) * 0.03})
            `
          }}
        >
          <path
            fill="rgba(180,180,180,0.35)"
            d="M0,160 C120,190 240,210 360,205 C480,200 600,170 720,160 C840,150 960,160 1080,175 C1200,190 1320,200 1440,190 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* HERO */}
      <div className="intro-block" style={{ marginBottom: 36 }}>
        <p className="session-invitation">
          Take a quiet moment to reflect on your relationship together with your partner.
        </p>

        <p className="intro-subtitle">
          A private space to pause, reflect, and be seen.
        </p>
      </div>

      {/* FORM */}
      <div className="card form">
        <input
          className="input"
          placeholder="Your display name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          className="input"
        >
          <option value="unspecified">Prefer not to say</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="input"
          style={{ marginTop: 14 }}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="sl">Slovenščina</option>
          <option value="hr">Hrvatski</option>
          <option value="sr">Srpski</option>
        </select>

        <p className="intro-footnote" style={{ marginTop: 8 }}>
          You are encouraged to answer in your native language for greater clarity and depth.
          The shared reflection will be written in the selected language.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button className="btn btn-primary" onClick={create}>
            Create session
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => setShowInstructions(s => !s)}
          >
            {showInstructions ? "Hide instructions" : "Instructions"}
          </button>
        </div>

        {showInstructions && (
          <div style={{ marginTop: 20 }}>
            <ul className="intro-steps">
              <li>Create a private session</li>
              <li>Share the code with your partner</li>
              <li>Reflect separately and privately</li>
              <li>Receive a shared reflection</li>
            </ul>

            <p className="intro-footnote">
              First use is free.
            </p>
          </div>
        )}

        {code && (
          <div style={{ marginTop: 22 }}>
            <div className="code-box">{code}</div>

            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button className="btn btn-ghost" onClick={copyCode}>
                Copy code
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/onboarding/${code}/A`)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
