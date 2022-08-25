import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.medics`,
    events: [
        {
            http: {
                method: "get",
                path: "/medics",
            }
        }
    ]
}
