import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { db } from "FIrebase/Firebase";
import { AuthContext } from "Context/AuthContext";
import { deleteDoc } from "firebase/firestore";

// components

export default function CardSocialTraffic() {
  const [todo, setTodo] = useState('')
  // const [todolist, setTodolist] = useState('')
  const [stafftodo, setStafftodo] = useState()
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      todo: todo,
      id: uuidv4()
    }
    try {
      await setDoc(doc(db, currentUser.email, newTodo.id), newTodo);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (e) => {
    try {
      await deleteDoc(doc(db, currentUser.email));
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const getData = async () => {

      try {
        const q = query(collection(db, currentUser.email),);
        onSnapshot(q, (querySnapshot) => {
          const todolist = [];
          querySnapshot.forEach((doc) => {
            console.log(doc)
            // if (doc.id == currentUser.email) {
            //   todolist.push(doc.data());
            // }
            todolist.push(doc.data());

          });
          setStafftodo(todolist)
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
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-2 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full  max-w-full flex-grow flex-1">
              <input type="text"
                className="w-full h-5 rounded-lg p-2 text-sm"
                placeholder="Add ToDo"
                value={todo}
                onChange={(e) => { setTodo(e.target.value) }}
              />
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}

          {stafftodo?.map((item) => {
            return (
              <div key={item.id} className="flex flex-row justify-between p-2">
                <div className="text-blueGray-800 font-semibold">{item.todo}</div>
                <div className="flex flex-row justify-between mx-4">
                  <button>📝</button>
                  <button onClick={deleteTodo}>⛔</button>
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </>
  );
}
