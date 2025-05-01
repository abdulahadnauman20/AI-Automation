// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout/Layout';
import DashboardPage from './routes/Dashaboard';
import Calendar from './routes/calender';
import Analytics from './routes/Analytics';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Pipelines from './routes/Pipelines';
import WebsiteVisitor from './routes/WebsiteVisitor';
import MultiBox from './routes/Multibox';
import EmailAccounts from './routes/EmailAccounts';
import AILeadScouts from './routes/AILeadScouts';
import Crm from './routes/Crm';
import Campaigns from './routes/Campaigns';
import Settings from './routes/Settings';
import Support from './routes/Support';
import CompaignTarget from './routes/CompaignTarget';
import Forgotpass from './routes/ForgotPass';
import ResetPass from './routes/ResetPass';
import Otp from './routes/Otp';
import { Toaster } from 'react-hot-toast';
import InvittionRoutes from './routes/InvittionRoutes';
import { OAuthCallback } from './routes/EmailAccounts';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgotpass />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path='/otp' element={<Otp />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path='/crm' element={<Crm />} />
          <Route path='/campaigns' element={<Campaigns />} />
          <Route path='/campaigns/target/:campaignId' element={<CompaignTarget />} />
          <Route path="/calender" element={<Calendar />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/website-visitor" element={<WebsiteVisitor />} />
          <Route path="/multi-box" element={<MultiBox />} />
          <Route path="/email-accounts" element={<EmailAccounts />} />
          <Route path="/ai-lead-scouts" element={<AILeadScouts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path='/invitationAccept/:wkid/:usid' element={<InvittionRoutes />} />
          <Route path='/oauth/callback' element={<OAuthCallback />} />
        </Route>
      </>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  )
}

export default App;