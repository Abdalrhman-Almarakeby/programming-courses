import { useLocalStorage } from "../../hooks/useStorage";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

export default function Account() {
  const { value:token } = useLocalStorage("token", "");

  const {
    data: user,
    isPending,
    error,
  } = useFetch(
    "https://courses-api-isuk.onrender.com/account",
    {
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      method: "GET",
    },
    []
  );

  console.log(error);
  console.log(user);

  return (
    <section className="container flex-grow py-8">
      {isPending && <Loading />}
      {error && <p>{error}</p>}
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
