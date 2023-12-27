import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import './globals.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <main className=' flex h-screen'>
        <Routes>
            {/* public routes (before sign in)*/}
            <Route element={<AuthLayout/>}>
                <Route path='/sign-in' element={<SigninForm />} />
                <Route path='/sign-up' element={<SignupForm />} />
            </Route>
            
            {/* private routes (after sign in)*/}
            <Route element={<RootLayout/>}>
                <Route index element={<Home />} />   {/*starting page -- index*/}
            </Route>
        </Routes>
    </main>
  )
}

export default App