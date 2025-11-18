import { PostHog } from "posthog-node";

export default function PostHogClient(): PostHog {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";

  const client = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}
