/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as aiPrompts from "../aiPrompts.js";
import type * as auth from "../auth.js";
import type * as blogs from "../blogs.js";
import type * as chat from "../chat.js";
import type * as http from "../http.js";
import type * as migrations from "../migrations.js";
import type * as products from "../products.js";
import type * as siteSettings from "../siteSettings.js";
import type * as storage from "../storage.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  aiPrompts: typeof aiPrompts;
  auth: typeof auth;
  blogs: typeof blogs;
  chat: typeof chat;
  http: typeof http;
  migrations: typeof migrations;
  products: typeof products;
  siteSettings: typeof siteSettings;
  storage: typeof storage;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
