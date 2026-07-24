const API_BASE = "/api/mod";

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const loginBtn = document.getElementById("loginBtn");

// If already logged in, skip straight to the editor.
(async function checkExistingSession() {
  try {
    const res = await fetch(`${API_BASE}/session`, { credentials: "include" });
    const data = await res.json();
    if (data.loggedIn) {
      window.location.href = "/mod/editor";
    }
  } catch (err) {
    // ignore — just show the login form
  }
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.classList.remove("show");
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      window.location.href = "/mod/editor";
    } else {
      errorMsg.textContent = data.message || "Invalid username or password.";
      errorMsg.classList.add("show");
    }
  } catch (err) {
    errorMsg.textContent = "Could not reach the server. Try again.";
    errorMsg.classList.add("show");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Log In";
  }
});
