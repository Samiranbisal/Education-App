// src/App.jsx
import './App.css';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Courses from "./pages/Courses";
import Blog from './pages/Blog';
import Contact from "./pages/Contact";
import EventsPage from './pages/EventsPage';
import GroupHomeCall from "./pages/GroupHomeCall";
import GroupVideoCall from "./pages/GroupVideoCall";
// import RealtimeChat from "./pages/RealtimeChat";
// import RealtimeChatApp from './pages/RealtimeChatApp';
// import OnetoOneAndGroupChat from './pages/OnetoOneAndGroupChat';
import OnetoOneAndGroupChat from './components/OnetoOneAndGroupChat';

import HostHome from './components/HostHome'
import HostRoom from './components/HostRoom'
import HostJoin from './components/HostJoin';


function LayoutWrapper({ children }) {
  const location = useLocation();

  // Add paths where you want to HIDE header/footer
  const hideLayoutPaths = ["/login", "/logout", "/"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path="/group-video-call/:roomId" element={<GroupVideoCall />} />
          <Route path="/group-home-call" element={<GroupHomeCall />} />
          <Route path="/one-to-one-chat" element={<OnetoOneAndGroupChat />} />

          <Route path="/host-streaming" element={<HostJoin />} />
          <Route path="/live-streaming" element={<HostHome />} />
          <Route path='/room/:roomId' element={<HostRoom/>} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
