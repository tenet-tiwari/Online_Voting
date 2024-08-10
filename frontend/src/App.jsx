


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import RegisteredVotersPage from './pages/RegisteredVotersPage';
import CandidatePage from './pages/CandidatesPage';
import ViewElections from './pages/ViewElections';
import ElectionDetails from './pages/ElectionDetails';
import AddElectionPage from './pages/AddElectionPage';
import AddCandidatePage from './pages/AddCandidatePage';
import UserDashboard from './pages/UserDashboard';
import UpcomingElectionsPage from './pages/UpcomingElectionsPage';
import VotePage from './pages/VotePage';
import EditProfilePage from './pages/EditProfilePage';
import HowToVote from './pages/HowToVote';
import QueryPage from './pages/QueryPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-to-vote" element={<HowToVote />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} role="admin" />} />
          <Route path="/admin/view-voters" element={<ProtectedRoute element={RegisteredVotersPage} role="admin" />} />
          <Route path="/admin/view-candidates" element={<ProtectedRoute element={CandidatePage} role="admin" />} />
          <Route path="/admin/view-elections" element={<ProtectedRoute element={ViewElections} role="admin" />} />
          <Route path="/admin/election/:id" element={<ProtectedRoute element={ElectionDetails} role="admin" />} />
          <Route path="/admin/add-elections" element={<ProtectedRoute element={AddElectionPage} role="admin" />} />
          <Route path="/admin/add-candidates" element={<ProtectedRoute element={AddCandidatePage} role="admin" />} />
          <Route path="/admin/query" element={<ProtectedRoute element={QueryPage} role="admin" />} />
          {/* User Routes */}
          <Route path="/users" element={<ProtectedRoute element={UserDashboard} role="user" />} />
          <Route path="/users/upcoming-elections" element={<ProtectedRoute element={UpcomingElectionsPage} role="user" />} />
          <Route path="/users/vote/:id" element={<ProtectedRoute element={VotePage} role="user" />} />
          <Route path="/users/edit-profile" element={<ProtectedRoute element={EditProfilePage} role="user" />} />
          
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
