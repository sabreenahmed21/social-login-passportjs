import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

export default function Login() {
  const login = async (url) => {
    try {
      window.open(url, "_self");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div>
      <h1>LOGIN</h1>
      <GoogleLoginButton
        text="Continue with Google"
        onClick={() => login("http://localhost:5001/auth/google")}
      />
      <GithubLoginButton
        onClick={() => login("http://localhost:5001/auth/github")}
      />
      <TwitterLoginButton
        text=""
        onClick={() => login("http://localhost:5001/auth/twitter")}
      />
    </div>
  );
}
