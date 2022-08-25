import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
    events: [
        {
            eventBridge: {
                eventBus: "arn:aws:events:us-east-1:583233449948:event-bus/EventBusCursoAWS09",
                pattern: {
                    source: ["appointmen"],
                    "detail-type": ["appointmen-create-ec"],
                }
            }
        }
    ]
};