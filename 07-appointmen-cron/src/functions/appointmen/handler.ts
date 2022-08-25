import * as AWS from "aws-sdk";
import * as velocityjs from "velocityjs";
//const dynamodb = new AWS.DynamoDB.DocumentClient();

const dynamodb = new AWS.DynamoDB.DocumentClient();
const SES = new AWS.SES();
const S3 = new AWS.S3();

export interface OptionsEmail {
    source: string;
    addresses: string[];
    subject: string;
    template: {
        bucketName: string;
        key: string;
    };
    data: Array<{ [s: string]: string | number }>
}

class S3Service {
    static async read(bucketName: string, key: string): Promise<string> {
        const parameters = { Bucket: bucketName, Key: key };
        const data = await S3.getObject(parameters).promise();
        return data.Body.toString("utf-8");
    }
}

class MailService {
    async sentEmail(options: OptionsEmail) {
        let bodyEmail = await S3Service.read(
            options.template.bucketName,
            options.template.key
        );

        console.log("bodyEmail2", bodyEmail);

        bodyEmail = velocityjs.render(
            bodyEmail,
            options.data.reduce(this.joinAttributes, {})
        );

        console.log("bodyEmail", bodyEmail);

        const parameters: AWS.SES.SendEmailRequest = {
            Source: options.source,
            Destination: {
                ToAddresses: options.addresses,
            },
            Message: {
                Body: {
                    Html: {
                        Data: bodyEmail,
                    },
                },
                Subject: {
                    Data: options.subject,
                },
            },
        };

        console.log("parameters", parameters);

        await SES.sendEmail(parameters).promise();
    }

    joinAttributes(accum: object, el: { [s: string]: string | number }) {
        return { ...accum, ...el };
    }
}


export const appointmentHandler = async (event) => {

    console.log("Appointmen  Cron...");

    const optionsEmail: OptionsEmail = {
        source: "jcrespovirhuez@gmail.com",
        addresses: ["j_cv@live.com"],
        subject: "Thanks for ypur appointment",
        template: {
            bucketName: "cursoaws02",
            key: "index.html",
        },
        data: [{ name: "Juan" }, { lastname: "Crespo" }]
    }

    console.log("optionsEmail", optionsEmail);

    const serviceEmail = new MailService();
    await serviceEmail.sentEmail(optionsEmail);

    /*console.log(JSON.stringify(event));

    const parameters: AWS.SES.SendEmailRequest = {
        Source: "jcrespovirhuez@gmail.com",
        Destination: {
            ToAddresses: ["j_cv@live.com"]
        },
        Message: {
            Body: {
                Html: {
                    Data: "Mensaje enviado desde AWS appointment cron"
                }
            },
            Subject: {
                Data: "Mensaje de prueba"
            }
        }
    }

    await SES.sendEmail(parameters).promise();*/
    return event;

};