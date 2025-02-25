import AppRoutes from "./routes/AppRoutes.jsx";
import "./styles/reset.css";
import "./App.css";

import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
