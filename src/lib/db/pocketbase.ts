import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";

const baseUrl = import.meta.env.PROD ? "/" : "http://127.0.0.1:8090/";

export const pb = new PocketBase(baseUrl) as TypedPocketBase;
