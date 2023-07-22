import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "FIrebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "FIrebase/Firebase";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'


export default function Register() {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('')
  const auth = getAuth(app);
  const [modal, setModal] = useState(false)

  const handleModal = (e) => {
    e.preventDefault();
    setModal(!modal)
  }


  const handleStaffSignUp = (e) => {
    e.preventDefault()
    setAge('');
    setDesignation('');
    setEmail('');
    setName('');
    setModal(!modal)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        const newStaff = {
          name: name,
          email: email,
          designation: designation,
          id: user.uid
        }
        try {
          await setDoc(doc(db, "Staff", user.uid), newStaff);
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
      });
  }
  const handleStudentSignUp = async (e) => {
    e.preventDefault()

    const newStudent = {
      name: name,
      email: email,
      age: age,
      course: course,
      id: uuidv4()
    }
    try {
      await setDoc(doc(db, "Student", newStudent.id), newStudent);
    } catch (error) {
      console.log(error)
    }
    setAge('');
    setCourse('');
    setEmail('');
    setName('');
    setModal(!modal)
  }

  const regToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle)
  }

  return (
    <>
      <div className={!modal ? 'flex' : 'hidden'}>
        {toggle ? <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 p-4">
                <Link to='/admin/dashboard' className=" font-bold text-xs p-6 m-6 hover:text-blue-500">
                  Back to Dashboard
                </Link>
                <div className="rounded-t mb-0 px-6 py-6 flex flex-col justify-between mx-auto">

                  <button onClick={regToggle} className="text-xs"><h5>GO TO STUDENT REGISTRATION</h5></button>
                  <div className="mx-auto"><h3>STAFF REGISTRATION</h3></div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-40 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name and Age
                      </label>
                      <div className="flex flex-row justify-between">
                        <input
                          type="name"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => { setName(e.target.value) }}
                        />
                        <input
                          type="name"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-20 ease-linear transition-all duration-150"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => { setAge(e.target.value) }}
                        />
                      </div>

                    </div>
                    <div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Designation
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Designation"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </div>
                    </div>

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



                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleStaffSignUp}
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 p-4">
                <Link to='/admin/dashboard' className=" font-bold text-xs p-6 m-6 hover:text-blue-500">
                  Back to Dashboard
                </Link>
                <div className="rounded-t mb-0 px-6 py-6 flex flex-col  justify-between mx-auto">
                  <button onClick={regToggle} className="text-xs"><h5>GO TO STAFF REGISTRATION</h5></button>
                  <div className="mx-auto"><h3>STUDENT REGISTRATION</h3></div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-40 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name  and Age
                      </label>
                      <div className="flex flex-row justify-between">
                        <input
                          type="name"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => { setName(e.target.value) }}
                        />
                        <input
                          type="name"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-20 ease-linear transition-all duration-150"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => { setAge(e.target.value) }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Course
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Course"
                          value={course}
                          onChange={(e) => { setCourse(e.target.value) }}
                        />
                      </div>
                    </div>

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
                        Start Date
                      </label>
                      <input
                        type="type"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Date"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                    </div>



                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleStudentSignUp}
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>


      <div className={!modal ? 'hidden' : 'flex'}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">

            <div className="w-[150vh] lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 p-4">

                <div className="rounded-t mb-0 px-6 py-6 flex flex-col justify-between mx-auto">



                </div>
                <div className="flex-auto mx-auto px-4 lg:px-6 py-20 pt-0">

                  <Link to='/admin/dashboard'>
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-[120vh] ease-linear transition-all duration-150"
                      type="button"

                    >
                      Done
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
