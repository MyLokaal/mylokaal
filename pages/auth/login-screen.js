import * as React from "react";
import { useRealmApp } from "../../realm/realm-app";

const LoginScreen = () => {
  const app = useRealmApp();

  // Toggle between logging users in and registering new users
  const [mode, setMode] = React.useState("login");
  const toggleMode = () => {
    setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
  };

  // Keep track of form input state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // Whenever the mode changes, clear the form inputs
  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setError({});
  }, [mode]);
  // Keep track of input validation/errors
  const [error, setError] = React.useState({});

  function handleAuthenticationError(err) {
    console.error(err);
    const { status, message } = parseAuthenticationError(err);
    const errorType = message || status;
    switch (errorType) {
      case "invalid username":
        setError((prevErr) => ({
          ...prevErr,
          email: "Invalid email address.",
        }));
        break;
      case "invalid username/password":
      case "invalid password":
      case "401":
        setError((err) => ({ ...err, password: "Incorrect password." }));
        break;
      case "name already in use":
      case "409":
        setError((err) => ({ ...err, email: "Email is already registered." }));
        break;
      case "password must be between 6 and 128 characters":
      case "400":
        setError((err) => ({
          ...err,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
    }
  }

  const handleLogin = async () => {
    setError((e) => ({ ...e, password: undefined }));
    try {
      return await app.logIn(email, password);
    } catch (err) {
      handleAuthenticationError(err);
    }
  };

  const handleRegistrationAndLogin = async () => {
    const isValidEmailAddress = validator.isEmail(email);
    setError((e) => ({ ...e, password: undefined }));
    if (isValidEmailAddress) {
      try {
        await app.registerUser(email, password);
        return await handleLogin();
      } catch (err) {
        handleAuthenticationError(err);
      }
    } else {
      setError((err) => ({ ...err, email: "Email is invalid." }));
    }
  };

  return (
    <div>
      <div>
        <h1>{mode === "login" ? "Log In" : "Sign Up"}</h1>
      </div>
      <div>
        <input
          type="email"
          label="Email"
          placeholder="your.email@example.com"
          onChange={(e) => {
            setError((e) => ({ ...e, email: undefined }));
            setEmail(e.target.value);
          }}
          value={email}
          state={
            error.email ? "error" : validator.isEmail(email) ? "valid" : "none"
          }
          errorMessage={error.email}
        />
      </div>
      <div>
        <input
          type="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          state={error.password ? "error" : error.password ? "valid" : "none"}
          errorMessage={error.password}
        />
      </div>
      {mode === "login" ? (
        <button variant="primary" onClick={() => handleLogin()}>
          Log In
        </button>
      ) : (
        <button variant="primary" onClick={() => handleRegistrationAndLogin()}>
          Register
        </button>
      )}
      <div>
        <span>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleMode();
          }}
        >
          {mode === "login" ? "Register one now." : "Log in instead."}
        </button>
      </div>
    </div>
  );
};
export default LoginScreen;

function parseAuthenticationError(err) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}
