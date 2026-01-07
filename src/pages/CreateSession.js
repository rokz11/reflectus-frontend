import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function CreateSession() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("unspecified");
  const [language, setLanguage] = useState("en");
  const [code, setCode] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [t, setT] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setT(v => v + 0.040);
    }, 16);
    return () => clearInterval(id);
  }, []);

  const wavePath = `
    M0 ${170 + Math.sin(t) * 6}
    C 240 ${190 + Math.sin(t + 1) * 13},
      480 ${200 + Math.sin(t + 2) * 5},
      720 ${180 + Math.sin(t + 3) * 6}
    C 960 ${160 + Math.sin(t + 4) * 5},
      1200 ${180 + Math.sin(t + 5) * 6},
      1440 ${170 + Math.sin(t + 6) * 4}
    L1440 320 L0 320 Z
  `;

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
    <div style={{ position: "relative", zIndex: 1 }} className="fade-in">

      {/* BACKGROUND WAVE – UNDER HEADER, ABOVE BUTTONS */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "fixed",
          top: "250px",      // 👈 pod headerjem
          left: 0,
          width: "100%",
          height: "160px",   // 👈 pas
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <path
          d={wavePath}
          fill="rgba(170,170,165,0.22)"
        />
      </svg>

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
















