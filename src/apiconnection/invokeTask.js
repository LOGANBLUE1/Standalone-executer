import { apiConnector } from '../utils/apiConnector';

export const invokeTask = async (formData) => {
    console.log('Invoking task with data:', formData);
    const taskManagerUrl = 'https://task-manager.dev.us.plannuh.com/invoke_task/';

    // Convert formData to the format required for x-www-form-urlencoded
    const formattedData = {
        task_definition: formData.task_definition,
        container_name: formData.container_name,
        command: `--jiraID=${formData.jiraId} --awsRegion=${formData.aws_region} --awsSecretArn=${formData.aws_secret_arn}`,
        env_variables: formData.env_variables,
        tags: formData.tags
    };

    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const response = await apiConnector('POST', taskManagerUrl, formattedData, headers);
        return response;
    } catch (error) {
        console.error('Error invoking task:', error);
        throw error;
    }
}
