import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="home-page">
      <div className="hero-card">
        <div className="hero-content">
          <span className="eyebrow">Сиз үчүн жаңы мүмкүнчүлүктөр</span>
          <h1 className="hero-title">
            Кош келиңиз{user?.displayName ? `, ${user.displayName}` : ""}!
          </h1>
          <p className="hero-description">
            Жеке мейкиндигиңизге кошулуп, өзүңүзгө керектүү нерселердин баарын бир жерден баштаңыз.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link className="button button-light" to="/profile">Профилге өтүү <span aria-hidden="true">→</span></Link>
            ) : (
              <>
                <Link className="button button-light" to="/register">Аккаунт түзүү <span aria-hidden="true">→</span></Link>
                <Link className="button button-ghost" to="/login">Кирүү</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}