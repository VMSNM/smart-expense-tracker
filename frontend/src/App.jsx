import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/userQuery";
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
  const { loading, data } = useQuery(GET_AUTH_USER);

  if (loading) return <LoadingSpinner />

  return (
    <>
    { data?.authUser && <Header /> } 
    <Routes>
      <Route path="/" element={data?.authUser ? <Homepage data={data} /> : <Navigate to='/login' />} />
      <Route path='/login' element={!data?.authUser ? <LoginPage /> : <Navigate to='/' />} />
      <Route path="/signup" element={!data?.authUser ? <SignupPage /> : <Navigate to="/" />} />
      <Route path="/transaction/:id" element={data?.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App;
