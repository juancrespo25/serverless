import type { AWS } from '@serverless/typescript';
import { appointmen, medics, agend } from './src/functions';

const serverlessConfiguration: AWS = {
    service: "appointmen",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild"],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        stage: "${opt:stage, 'dev'}",
        apiGateway: {
            restApiId: "${ssm:/digital/api-gateway-rest-api-id-${self:provider.stage}}",
            restApiRootResourceId: "${ssm:/digital/api-gateway-rest-api-root-resource-id-${self:provider.stage}}",
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true
        },
        deploymentBucket: {
            name: "${ssm:/digital/s3-bucket-deployment-name-${self:provider.stage}}",
            serverSideEncryption: "AES256",
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
            LAMBDA_CORE_PE: "appointmen-pe-${self:provider.stage}-appointmen",
            LAMBDA_CORE_EC: "appointmen-ec-${self:provider.stage}-appointmen",
            LAMBDA_CORE_CO: "appointmen-co-${self:provider.stage}-appointmen",
            SNS_TOPICO_CURSO03_ARN: "${ssm:/digital/topic-sns-arn-${self:provider.stage}}",
        },
        iam: {
            role: {
                name: "appointment-role-${self:provider.stage}",
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "logs:CreateLogGroup",
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                        ],
                        Resource: "arn:aws:logs:*:*:*",
                    },
                    {
                        Effect: "Allow",
                        Action: "lambda:InvokeFunction",
                        Resource: "arn:aws:lambda:*:*:function:*",
                    },
                    {
                        Effect: "Allow",
                        Action: "events:PutEvents",
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: "dynamodb:*",
                        Resource: "arn:aws:dynamodb:us-east-1:*:table/Appointment-dev"
                    },
                    {
                        Effect: "Allow",
                        Action: "SNS:Publish",
                        Resource: "arn:aws:sns:us-east-1:583233449948:*",
                    }
                ],
            },
        },
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: true,
            sourcemap: true,
            exclude: ["aws-sdk"],
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
        apiGateway: {
            restApiId: "z3n4iilv41",
            restApiRootResourceId: "j8bzrqwr40"
        }
    },
    functions: { appointmen, medics, agend }
};

module.exports = serverlessConfiguration;