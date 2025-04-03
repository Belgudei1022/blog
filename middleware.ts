import { checkAuth } from "./middleware/middleware";
import type { NextRequest } from "next/server";

export function middleware(req:NextRequest){
    return checkAuth(req)
}

export const config = {
    matcher: ["/posts/:path*"],
  };