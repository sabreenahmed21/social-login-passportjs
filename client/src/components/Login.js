import {
  GoogleLoginButton,
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
        onClick={() => login(`${process.env.REACT_APP_BASE_URL}/auth/google`)}
      />
      <TwitterLoginButton
        text=""
        onClick={() => login(`${process.env.REACT_APP_BASE_URL}/auth/twitter`)}
      />
    </div>
  );
}
