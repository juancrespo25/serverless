import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
    events: [
        {
            sqs: {
                arn: "${ssm:/digital/sqs-pe-arn-${self:provider.stage}}"
            },
            /* sns: {
                 arn: "${ssm:/digital/topic-sns-arn-${self:provider.stage}}",
                 topic: "${ssm:/digital/topic-sns-name-topic-${self:provider.stage}}"
             }*/
            /*  eventBridge: {
                  eventBus: "arn:aws:events:us-east-1:583233449948:event-bus/EventBusCursoAWS09",
                  pattern: {
                      source: ["appointmen"],
                      "detail-type": ["appointmen-create-pe"],
                  }
              }*/
        }
    ]
};