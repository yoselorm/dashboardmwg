import { auth } from "FIrebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const navigate = useNavigate();
  const history = useHistory();
  const [err, setErr] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('signed in')
        // ...
        //navigate('/', { replace: true })
        history.push('/admin/dashboard')

      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErr(true)
      });
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

              <div className="rounded-t mb-0 px-6 py-6">
                <div className="mx-auto flex flex-row justify-center">
                  <p className="text-orange-300 text-xl font-semibold">Mobile Web GH</p>
                </div>


                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                  <div>

                  </div>

                  <div className="text-center mt-6">
                    <Link to="/admin/dashboard">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>

                    </Link>

                  </div>
                </form>
              </div>
            </div>


          </div>
        </div>
      </div >
    </>
  );
}
