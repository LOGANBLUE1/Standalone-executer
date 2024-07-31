import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // <div className='flex justify-center items-center text-white text-3xl h-full'>
      
    // </div>

    const [formData, setFormData] = useState({
        jiraId:"",
        env:"qa",
        browser:"chromium",
        headless:"true",
        release:"",
        testType:""
    })

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    function submitHandler(event) {
        event.preventDefault();

        console.log("Finally printing the value of Form Data:");
        console.log(formData)
        // navigate("/dashboard");
    }


  return (
    <div className='relative bg-deepBlue'>
        
        <form onSubmit={submitHandler} className='w-10/12 max-w-[1080px] flex flex-col justify-around gap-10  mx-auto'>
        {/* Input fields */}
            <div className='w-full grid grid-cols-2 gap-10'>
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Jira ID<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="jiraId"
                            onChange={changeHandler}
                            placeholder="Enter Jira id"
                            value={formData.jiraId}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Environment</p>
                        {/* <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Select the environment"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        /> */}

                        <select name="env" id="env" 
                            value={formData.env}
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'>
                            <option value="qa">QA</option>
                            <option value="dev">DEV</option>
                            <option value="stage">STAGE</option>
                            <option value="beta">BETA</option>
                        </select>
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Browser Type</p>
                        {/* <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Select the browser"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        /> */}
                        <select name="browser" id="browser" 
                            value={formData.browser}
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'>
                            <option value="chromium">Chromium</option>
                            <option value="firefox">Firefox</option>
                            <option value="webkit">Webkit</option>
                        </select>
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Headless</p>
                        {/* <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Select the option"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        /> */}
                        <select name="headless" id="headless"
                            value={formData.headless}
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Release</p>
                        <input
                            // required
                            type="text"
                            name="release"
                            onChange={changeHandler}
                            placeholder="Select the release"
                            value={formData.release}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Test-type</p>
                        <input
                            // required
                            type="text"
                            name="testType"
                            onChange={changeHandler}
                            placeholder="Select the release"
                            value={formData.testType}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>

            {/* Submit button */}
            <div className='w-full flex flex-row justify-center'>
                <button className='w-1/2 bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Execute
                </button>
            </div>
        </form>

    </div>
  )
}

export default Home;
