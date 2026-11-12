import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { getErrorMessage } from "../utils/authErrors";

export default function GoogleButton() {
  const navigate = useNavigate();

  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      alert(getErrorMessage(err.code));
    }
  }

  return (
    <button className="button google-button" type="button" onClick={handleGoogle}>
      <span className="google-mark" aria-hidden="true">G</span>
      Google менен улантуу
    </button>
  );
}
