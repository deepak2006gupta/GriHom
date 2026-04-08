import API from "../../services/api";

const handleRegister = async () => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    // 🔥 store token
    localStorage.setItem("token", res.data.token);

    alert("Registered successfully");
    window.location.href = "/dashboard";

  } catch (err) {
    alert("Registration failed");
  }
};