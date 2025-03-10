import AppRoutes from "./routes/AppRoutes.jsx";
import "./styles/reset.css";
import "./styles/global.css";

import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
