import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { handleChat } from "./chat";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: handleChat,
});

http.route({
  path: "/api/chat",
  method: "POST",
  handler: handleChat,
});

export default http;
