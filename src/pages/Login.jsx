import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 15v2m-5.5-5V9a5.5 5.5 0 0 1 11 0v3M6 12h12v9H6v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="auth-title">Кайра кош келиңиз!</h1>
          <p className="auth-subtitle">Аккаунтуңузга кирүү үчүн маалыматыңызды жазыңыз.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-label">Email</span>
            <input
              className="form-input"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="form-field">
            <span className="form-label">Сырсөз</span>
            <input
              className="form-input"
              type="password"
              placeholder="Сырсөзүңүздү жазыңыз"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary form-submit" type="submit">Кирүү</button>
          <div className="auth-divider">же</div>
          <GoogleButton />
        </form>

        <p className="auth-switch">
          Аккаунтуңуз жокпу? <Link to="/register">Катталуу</Link>
        </p>
      </div>
    </section>
  );
}
