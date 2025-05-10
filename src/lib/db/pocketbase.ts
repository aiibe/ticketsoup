import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";
import { baseUrl } from "@/config";

export const pb = new PocketBase(baseUrl) as TypedPocketBase;
