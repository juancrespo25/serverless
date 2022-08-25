import { getPathHandler } from "../libs/getPathHandler";

export default {
    handler: `${getPathHandler(__dirname)}/handler.registerHandler`,
    events: [
        {
            http: {
                method: "post",
                path: "/register",
                integration: "lambda",
                private: true,
            },
        },
    ],
};