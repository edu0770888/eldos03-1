import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  const displayName = user.displayName || "Колдонуучу";
  const creationTime = user.metadata.creationTime;

  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          ) : (
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <span className="eyebrow">Жеке профиль</span>
        <h1 className="profile-title">{displayName}</h1>
        <p className="profile-email">{user.email}</p>
        <div className="profile-details">
          <span>Катталган күнү</span>
          <strong>{creationTime ? new Date(creationTime).toLocaleDateString() : "—"}</strong>
        </div>
        <button className="button button-primary profile-logout" type="button" onClick={handleLogout}>
          Аккаунттан чыгуу
        </button>
      </div>
    </section>
  );
}
