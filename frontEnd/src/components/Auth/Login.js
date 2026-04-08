import API from "../../services/api";

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    // 🔥 store JWT
    localStorage.setItem("token", res.data.token);

    alert("Login successful");
    window.location.href = "/dashboard";

  } catch (err) {
    alert("Invalid credentials");
  }
};