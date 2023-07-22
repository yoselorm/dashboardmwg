import React, { useContext, useEffect, useState } from "react";
import { data } from "Data/Data";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "FIrebase/Firebase";
import { AuthContext } from "Context/AuthContext";
// components

export default function CardPageVisits() {
  console.log(data)
  const [student, setStudents] = useState()
  const [search, setSearch] = useState('')


  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {

      try {
        const q = query(collection(db, "Student"));
        onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            console.log(doc)
            // if (doc.id !== currentUser.uid) {
            //   users.push(doc.data());
            // }
            users.push(doc.data());
          });

          setStudents(users)
          console.log(users)
          console.log(student)
          //console.log("Current cities in CA: ", cities.join(", "));
          //dispatch(addUser(users));
        });

      } catch (error) {

      }
    }
    getData();
  }, [db, currentUser?.email])
  return (
    <>
      <div className="mb-4 ">
        <form className="md:flex flex-row flex-wrap items-center lg:ml-auto mr-3 w-full">
          <div className="relative flex w-full flex-wrap items-stretch">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
          </div>
        </form>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-3 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-3 max-w-full flex-grow flex-1">
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-base text-blueGray-700">
                  Students
                </h3>
                <h3 className="font-bold text-base text-blueGray-700">
                  Age
                </h3>
                <h3 className="font-bold text-base text-blueGray-700">
                  Course
                </h3>
                <h3 className="font-bold text-base text-blueGray-700">
                  Profile
                </h3>
              </div>

            </div>


          </div>
        </div>
        <div className="block w-full overflow-x-auto">

          {student?.filter(student => student.name.toLowerCase().includes(search)).map((item) => {
            return (
              <div key={item.id}>
                <div className='hover:bg-blueGray-300 flex flex-row justify-between px-6 py-3 font-semibold text-base text-blueGray-700 '>
                  <div>{item.name}</div>
                  <div>{item.age}</div>
                  <div>{item.course}</div>
                  <img src='https://images.unsplash.com/photo-1578489758854-f134a358f08b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60' alt={item.name} className='w-12 h-10 object-cover rounded-full' />
                </div>
                <hr />
              </div>

            )
          })}

        </div>
      </div>
    </>
  );
}
