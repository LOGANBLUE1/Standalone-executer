import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { invokeTask } from '../apiconnection/invokeTask';

const Home = () => {
    
    const [formData, setFormData] = useState({
        task_definition: "pfm_automation",
        container_name: "pfm_automation",
        aws_region: "",
        aws_secret_arn: "",
        jiraId: "",
        env: "QA",
        browser: "chromium",
        headless: "true",
        release: "",
        testType: "",
        env_variables: "",
        tags: ""
    });

    const formFields = {
        jiraId: "Jira ID",
        aws_region: "AWS Region",
        aws_secret_arn: "AWS Secret Arn",
        release: "Release",
        testType: "Test Type",
        env: "Environment",
        browser: "Browser Type",
        headless: "Headless"
    };

    const awsProps = {
        task_definition: "Task Definition",
        container_name: "Container Name",
        env_variables: "Env variables",
        tags: "Tags"
    };

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
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
        if (aws_region) {
            command += ` --awsRegion=${aws_region}`;
        }
        if (aws_secret_arn) {
            command += ` --awsSecretArn=${aws_secret_arn}`;
        }
        if (headless !== "true") {
            command += ` --headless=${headless}`;
        }
        if (browser !== "chromium") {
            command += ` --browser=${browser}`;
        }
        if (env !== "QA") {
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
        <div className='bg-white min-h-screen  h-full flex items-center justify-center py-10 mt-20'>
            <form onSubmit={submitHandler} className='w-full max-w-4xl bg-background shadow-lg rounded-lg p-8'>
                {/* Input fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-7'>
                {Object.entries(formFields).map(([key, label]) => (
                        <label key={key} className='block'>
                            <p className='text-gray-700 text-sm font-medium mb-2'>{label}{key === 'jiraId' && <sup className='text-pink-200'>*</sup>}</p>
                            {key === 'env' || key === 'browser' || key === 'headless' ? (
                                <select
                                    name={key}
                                    value={formData[key]}
                                    onChange={changeHandler}
                                    className='bg-gray-100 border border-gray-300 rounded-lg p-3 w-full'>
                                    {key === 'env' && (
                                        <>
                                            <option value="QA">QA</option>
                                            <option value="DEV">DEV</option>
                                            <option value="STAGE">STAGE</option>
                                            <option value="BETA">BETA</option>
                                        </>
                                    )}
                                    {key === 'browser' && (
                                        <>
                                            <option value="chromium">Chromium</option>
                                            <option value="firefox">Firefox</option>
                                            <option value="webkit">Webkit</option>
                                        </>
                                    )}
                                    {key === 'headless' && (
                                        <>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    onChange={changeHandler}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    value={formData[key]}
                                    className='bg-gray-100 border border-gray-300 rounded-lg p-3 w-full'
                                />
                            )}
                        </label>
                    ))}
                </div>

                <div className='mb-6 space-y-4'>
                {Object.entries(awsProps).map(([key, label]) => (
                    <label key={key} className='block'>
                    <p className='text-gray-700 text-sm font-medium mb-1'>
                        {label}{(key === 'task_definition' || key === 'container_name') && <sup className='text-pink-200'>*</sup>}
                    </p>
                    <input
                        type="text"
                        name={key}
                        onChange={changeHandler}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        value={formData[key]}
                        required={key === 'task_definition' || key === 'container_name'}
                        className='bg-gray-100 border border-gray-300 rounded-lg p-3 w-full'
                    />
                    </label>
                ))}
                </div>



                {/* Submit button */}
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className='bg-lightBlue500 text-white font-medium py-3 px-6 rounded-lg hover:bg-lightBlue300 transition duration-300'>
                        Execute
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Home;
