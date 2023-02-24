import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main";
import VideoList from "./pages/VideoList";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Main />
          <Routes>
          <Route exact path="/videosection" element={<VideoList />}></Route>
          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
