// src/app/page.tsx

import { agent } from "../lib/api";

export default async function getPopularFeeds() {
  const feeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 10,
  });
  return feeds;
}