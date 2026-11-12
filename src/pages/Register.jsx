import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";
import GoogleButton from "../components/GoogleButton";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-3v6m-3-3h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="auth-title">Аккаунт түзүү</h1>
          <p className="auth-subtitle">Бир нече кадам менен катталып, баштаңыз.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-label">Атыңыз</span>
            <input
              className="form-input"
              type="text"
              placeholder="Атыңызды жазыңыз"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
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
              placeholder="Кеминде 6 белги"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary form-submit" type="submit">Катталуу</button>
          <div className="auth-divider">же</div>
          <GoogleButton />
        </form>

        <p className="auth-switch">
          Аккаунтуңуз барбы? <Link to="/login">Кирүү</Link>
        </p>
      </div>
    </section>
  );
}
