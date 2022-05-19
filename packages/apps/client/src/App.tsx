import { Route, Routes } from 'react-router-dom';
import AuthGuard from './common/components/AuthGuard';
import CoreContainer from './pages/Core/CoreContainer';
import PaintBoardPage from './pages/Core/PaintBoardPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard redirectTo="login">
            <CoreContainer />
          </AuthGuard>
        }
      >
        <Route path="/" element={<PaintBoardPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
