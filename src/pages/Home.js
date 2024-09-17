import React, { useState } from 'react'
import {toast} from "react-hot-toast"
import {invokeTask} from "../apiconnection/invokeTask";

const Home = () => {
    const [formData, setFormData] = useState({
        task_definition:"pfm_automation",
        container_name:"pfm_automation",
        aws_region:"",
        aws_secret_arn:"",
        jiraId:"",
        env:"QA",
        browser:"chromium",
        headless:"true",
        release:"",
        testType:"",
        env_variables:"",
        tags:""
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
    
        const { aws_region, aws_secret_arn, jiraId, env, browser, headless, release, testType } = formData;
    
        let command = `--jiraID=${jiraId}`;
        
        if (release) {
            command += ` --release=${release}`;
        }
        if (testType) {
            command += ` --testType=${testType}`;
        }
        if(aws_region){
            command += ` --awsRegion=${aws_region}`;
        }
        if(aws_secret_arn){
            command += ` --awsSecretArn=${aws_secret_arn}`;
        }
        if(headless !== "true"){
            command += ` --headless=${headless}`;
        }
        if(browser !== "chromium"){
            command += ` --browser=${browser}`;
        }
        if(env !== "QA"){
            command += ` --env=${env}`;
        }
    
        const form = {
            ...formData,
            command
        };
    
        invokeTask(form)
            .then((response) => {
                if (response.success) {
                    console.log('API Response:', response);
                    toast.success("Task executed successfully!");
                } else {
                    console.error('API invocation failed');
                    toast.error("Task execution failed");
                }
            })
            .catch((error) => {
                console.error('Error while executing task:', error);
                toast.error("An error occurred");
            });
    }
    

  return (
    <div className='relative bg-deepBlue'>
        
        <form onSubmit={submitHandler} className='w-10/12 max-w-[1080px] flex flex-col justify-around gap-10  mx-auto'>
        {/* Input fields */}
            <div className='w-full grid grid-cols-2 gap-x-20'>
               
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
                    <select name="env" id="env" 
                        value={formData.env}
                        onChange={changeHandler}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'>
                        <option value="QA">QA</option>
                        <option value="DEV">DEV</option>
                        <option value="STAGE">STAGE</option>
                        <option value="BETA">BETA</option>
                    </select>
                </label>

                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Browser Type</p>
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
                        type="text"
                        name="release"
                        onChange={changeHandler}
                        placeholder="Enter the release"
                        value={formData.release}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Test Type</p>
                    <input
                        type="text"
                        name="testType"
                        onChange={changeHandler}
                        placeholder="Enter the test type"
                        value={formData.testType}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>AWS Region</p>
                    <input
                        type="text"
                        name="aws_region"
                        onChange={changeHandler}
                        placeholder="Enter the AWS region"
                        value={formData.aws_region}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>AWS Secret Arn</p>
                    <input
                        type="text"
                        name="aws_secret_arn"
                        onChange={changeHandler}
                        placeholder="Enter the AWS secret arn"
                        value={formData.aws_secret_arn}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>
                 
            </div>



            <div>
                {/* AWS params */}
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Task Definition<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="text"
                        name="task_definition"
                        onChange={changeHandler}
                        placeholder="task_definition"
                        value={formData.task_definition}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Container Name<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="text"
                        name="container_name"
                        onChange={changeHandler}
                        placeholder="container_name"
                        value={formData.container_name}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                
            

            {/* Optional parameters */}
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Env variables</p>
                    <input
                        type="text"
                        name="env_variables"
                        onChange={changeHandler}
                        placeholder="env_variables"
                        value={formData.env_variables}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>tags</p>
                    <input
                        type="text"
                        name="tags"
                        onChange={changeHandler}
                        placeholder="tags"
                        value={formData.tags}
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
