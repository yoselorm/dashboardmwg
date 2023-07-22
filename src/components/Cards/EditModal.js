import React, { useState } from 'react';

const EditModal = (props) => {
    console.log(props)
    const [studentName, setStudentName] = useState(props.item.name)
    const [date, setDate] = useState(props.item.date)
    const [attendance, setAttendance] = useState(props.item.attendance)
    const [course, setCourse] = useState(props.item.course)
    const [score, setScore] = useState(props.item.score)
    return (
        <div>
            <form className='grid grid-col-3 max-h-fit'>

                <input type='text' placeholder='Enter Full name' className='bg-transparent border-b-2 border-black focus:outline-none  mb-5 md:mb-5 sm:w-4 rounded-md' value={studentName} onClick={(e) => { setStudentName(e.target.value) }} />

                <input type='email' placeholder='Enter date' className='bg-transparent border-b-2 border-black focus:outline-none  sm:w-[300px] rounded-md' value={date} onClick={(e) => { setDate(e.target.value) }} />

                <input type='email' placeholder='Attendance out of 5' className='bg-transparent border-b-2 border-black focus:outline-none  rounded-md sm:w-[300px] ' value={attendance} onClick={(e) => { setAttendance(e.target.value) }} />


                <input type='number' placeholder='Course' className='  bg-transparent border-b-2 border-black mr-10 focus:outline-none px-2 mb-5 rounded-md md:mb-0' value={course} onClick={(e) => { setCourse(e.target.value) }} />

                <input type='text' placeholder='Enter Score' className='bg-transparent border-b-2 border-black focus:outline-none  px-2 rounded-md' value={score} onClick={(e) => { setScore(e.target.value) }} />


                <div className='sm:mt-4 mt-2 mb-4'>
                    <button className='bg-black text-[#3282B8] hover:bg-[#3282B8] hover:text-black md:w-[20%] p-2 rounded-md font-bold' onClick={props.handleSubmit} >Submit</button>

                </div>
            </form>
        </div>
    );
}

export default EditModal;
