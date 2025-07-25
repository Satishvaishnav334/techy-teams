import React from 'react'

function Input({ lable, placeholder, onChange, value, type }) {
    return (
        <>
        <div>

            <label >{lable}</label>
            <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder={placeholder} onChange={onChange} value={value} type={type} ></input>
        </div>
        </>

    )
}

export default Input
