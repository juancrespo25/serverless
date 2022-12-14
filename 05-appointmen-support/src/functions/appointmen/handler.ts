import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const appointmentHandler = async (event) => {

    console.log("Appointmen Support...");
    console.log(event.Records);

    const records = event.Records;

    const listPromises = [];
    for (let record of records) {

        const body = JSON.parse(record.body);
        const id = body.detail.id

        listPromises.push(dynamodb.update({
            TableName: "Appointment-dev",
            UpdateExpression: "set statusAppointment = :newStatus",
            ExpressionAttributeValues: {
                ':newStatus': 3
            },
            Key: { id },
            ReturnValues: "ALL_NEW"
        }).promise()
        );
    }

    const results = await Promise.all(listPromises);

    console.log("results: " + results);

    return event;

};