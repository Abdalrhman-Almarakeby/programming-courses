import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Account() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <section className="container flex-grow py-8">
      {user && (
        <>
          <h1>{user.name}</h1>
          <div>
            <p>Hello {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </>
      )}
    </section>
  );
}
