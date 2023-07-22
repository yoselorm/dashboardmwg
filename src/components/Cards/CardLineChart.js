import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "FIrebase/Firebase";
import { AuthContext } from "Context/AuthContext";

export default function CardLineChart() {
  const [staff, setStaff] = useState();
  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getData = async () => {

      try {
        const q = query(collection(db, "Staff"));
        onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            console.log(doc)
            // if (doc.id !== currentUser.uid) {
            //   users.push(doc.data());
            // }
            users.push(doc.data());
          });

          setStaff(users)

          //console.log(users.length)
          //console.log("Current cities in CA: ", cities.join(", "));
          //dispatch(addUser(users));
          console.log(staff?.length)
        });
      } catch (error) {

      }
    }
    getData();
  }, [db, currentUser?.email])


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-row flex-grow flex-1 ">

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
              <h2 className="text-white text-xl font-semibold">Staff</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            {/* <canvas id="line-chart"></canvas> */}
            <div className="flex flex-row justify-between text-white font-semibold mb-4">
              <h3 className="px-2">Name</h3>
              <h3 className="px-2">Designation</h3>
              <h3 className="px-2">Email</h3>
              <h3 className="px-2">Start date</h3>
            </div>
            {staff?.filter(student => student.name.toLowerCase().includes(search)).map((item) => {
              return (
                <div key={item.id} className="flex flex-col mx-8 mb-2">

                  <div className="flex flex-row justify-between py-4 text-white ">
                    <h2 className="text-white text-sm px-2">{item.name}</h2>
                    <h2 className="text-white text-sm px-2">{item.designation}</h2>
                    <h2 className="text-white text-sm px-2">{item.email}</h2>
                    <h2 className="text-white text-sm px-2">16 May</h2>
                  </div>
                  <hr />

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}
