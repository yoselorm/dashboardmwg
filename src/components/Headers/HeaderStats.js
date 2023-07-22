import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "FIrebase/Firebase";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [up, setUp] = useState('up')
  const [number, setNumber] = useState()
  const [studentNumber, setStudentnumber] = useState()
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
            setNumber(users.length)
          });

        });
      } catch (error) {

      }
    }
    getData();
  }, [db])

  useEffect(() => {
    const getData = async () => {

      try {
        const q = query(collection(db, "Student"));
        onSnapshot(q, (querySnapshot) => {
          const student = [];
          querySnapshot.forEach((doc) => {
            console.log(doc)
            // if (doc.id !== currentUser.uid) {
            //   users.push(doc.data());
            // }
            student.push(doc.data());
            setStudentnumber(student.length)
          });

        });
      } catch (error) {

      }
    }
    getData();
  }, [db])
  console.log(number)
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="STUDENTS"
                  statTitle={studentNumber}
                  statArrow=''
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="STAFF"
                  statTitle={number}
                  statPercent=""
                  statDescripiron=""
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                  statArrow=''
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="COURSES"
                  statTitle="2"
                  statPercent=""
                  statDescripiron=""
                  statArrow=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
