import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.agend`,
    events: [
        {
            http: {
                method: "get",
                path: "/agend",
            }
        }
    ]
}
