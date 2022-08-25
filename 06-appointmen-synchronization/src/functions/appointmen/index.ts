import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.appointmentHandler`,
    events: [
        {
            s3: {
                bucket: "digital-awscurso09-cv-medic-${self:provider.stage}",
                event: "s3:ObjectCreated:*",
                existing: true,
                rules: [
                    {
                        suffix: ".csv",
                    },
                    {
                        prefix: "medics/",
                    },
                ],
            }
        }
    ]
};