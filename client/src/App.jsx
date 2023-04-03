import { useState } from "react";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import Weather from "./pages/Weather";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

function App() {
  const [isHidden, setIsHidden] = useState(false);
  const { token, userId, login, logout } = useAuth();

  function hideContentHandler() {
    setIsHidden(!isHidden);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Layout hideWelcome={isHidden}>
        <MainPage isHidden={isHidden} onHideContent={hideContentHandler} />
      </Layout>
      <Weather isHidden={isHidden} />
    </AuthContext.Provider>
  );
}

export default App;
