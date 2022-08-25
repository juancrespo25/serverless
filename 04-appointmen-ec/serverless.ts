import type { AWS } from '@serverless/typescript';
import { appointmen } from './src/functions';

const serverlessConfiguration: AWS = {
    service: "appointmen-ec",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild"],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        stage: "${opt:stage, 'dev'}",
        deploymentBucket: {
            name: "${ssm:/digital/s3-bucket-deployment-name-${self:provider.stage}}",
            serverSideEncryption: "AES256",
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                name: "appointment-ec-role-${self:provider.stage}",
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "logs:CreateLogGroup",
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                        ],
                        Resource: "arn:aws:logs:*:*:*",
                    }, {
                        Effect: "Allow",
                        Action: "lambda:InvokeFunction",
                        Resource: "arn:aws:lambda:*:*:function:*",
                    },
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
        }
    },
    functions: { appointmen }
};

module.exports = serverlessConfiguration;