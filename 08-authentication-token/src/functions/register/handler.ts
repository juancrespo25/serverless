import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const registerHandler = async (event) => {
    const body = event.body;

    const register = { ...body };
    await dynamodb
        .put({
            TableName: "AuthenticationCurso-cv-dev",
            Item: register,
        })
        .promise();
};