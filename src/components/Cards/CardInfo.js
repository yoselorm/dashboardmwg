import React, { useState } from "react";
import Chart from "chart.js";
import { studentInfo } from "Data/StudentInfo";
import { CSVLink } from "react-csv";
import EditModal from "./EditModal";


export default function CardInfo() {
    const [student, setStudents] = useState(studentInfo)
    const [search, setSearch] = useState('')
    const [toggle, setToggle] = useState(false)

    const handleEdit = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }
    const headers = [{
        label: "Student", key: "name"
    },
    {
        label: "Date", key: "date"
    },
    {
        label: "Attendance", key: "attendance"
    },
    {
        label: "Course", key: "course"
    },
    {
        label: "Score", key: "score"
    }
    ]

    const csvLink = {
        headers: headers,
        data: student,
        filename: "student.csv"
    }
    return (
        <div className={toggle ? 'bg-black/40 h-full w-full' : ''}>

            <div>
                <div className='mb-4'>
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
                <div className="relative flex flex-col overflow-scroll  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="flex flex-row justify-between mx-8">
                        <h3 className="px-4 text-blueGray-900 font-semibold">STUDENT INFO</h3>
                        <CSVLink {...csvLink} className={!toggle ? "flex px-4" : 'hidden'}>Download</CSVLink>
                    </div>

                    <div className="rounded-t mb-0 px-3 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-3 max-w-full flex-grow flex-1">
                                <div className="flex flex-row justify-between">
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Students
                                    </h3>
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Start Date
                                    </h3>
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Attendance
                                    </h3>
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Course
                                    </h3>
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Score
                                    </h3>
                                    <h3 className="font-bold text-base text-blueGray-700">
                                        Update
                                    </h3>
                                </div>

                            </div>



                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">

                        {student.filter(student => student.name.toLowerCase().includes(search)).map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className={!toggle ? 'hover:bg-blueGray-300 flex flex-row justify-between px-6 py-3 font-semibold text-base text-blueGray-700 ' : 'hidden'}>
                                        <div>{item.name}</div>
                                        <div>{item.date}</div>
                                        <div>{item.attendance}</div>
                                        <div>{item.course}</div>
                                        <div>{item.score}</div>
                                        <button className="hover:bg-blue-500 " onClick={handleEdit}>📝</button>
                                    </div>
                                    <hr />

                                    <div className={!toggle ? "hidden " : "block absolute bg-blueGray-200  top-6 p-8 mx-auto"} >
                                        <EditModal handleSubmit={handleSubmit} item={item} />
                                    </div>
                                </div>


                            )
                        })}


                    </div>
                </div>
            </div>



        </div>

    );
}
