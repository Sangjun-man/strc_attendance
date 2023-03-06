import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AttendancePage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
