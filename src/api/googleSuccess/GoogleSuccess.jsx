import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      login(); // or login(userData) if your hook expects data
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [params, navigate, login]);

  return <p className="text-center mt-10">Logging you in with Google...</p>;
}
