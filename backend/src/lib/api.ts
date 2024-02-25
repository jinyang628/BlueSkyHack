import { BskyAgent } from "@atproto/api";

export const agent = new BskyAgent({
  // App View URL
  service: "https://api.bsky.app",
});