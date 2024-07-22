import serverconfigs from "./serverConfig";
export const BASE_URL = serverconfigs[process.env.ENV_NAME].BASE_URL;
