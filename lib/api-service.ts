import createClient from "openapi-fetch";
import type {paths} from "~/lib/api";

export const client = createClient<paths>({baseUrl: "https://localhost:7093"});
