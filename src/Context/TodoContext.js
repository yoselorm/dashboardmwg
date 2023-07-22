import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { auth, db } from "FIrebase/Firebase";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { db } from "FIrebase/Firebase";
import { AuthContext } from "Context/AuthContext";


export const TodoContext = createContext()
export const TodoContextProvider = ({ children }) => {
    const [student, setStudent] = useState()


    useEffect(() => {
        const getData = async () => {

            try {
                const q = query(collection(db, "Student"),);
                onSnapshot(q, (querySnapshot) => {
                    const todolist = [];
                    querySnapshot.forEach((doc) => {
                        console.log(doc)
                        if (doc.id !== currentUser.email) {
                            todolist.push(doc.data());
                        }
                    });
                    setStudent(todolist)
                    console.log(todolist)
                    //console.log("Current cities in CA: ", cities.join(", "));

                });

            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [db, currentUser?.email])


    return (
        <AuthContext.Provider value={{ student }}>
            {children}
        </AuthContext.Provider>
    )

}