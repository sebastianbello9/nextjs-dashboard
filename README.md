## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## PostHog Integration

This Next.js application is now integrated with PostHog for analytics and feature flags.

### Setup

1. **Environment Variables**

   Add your PostHog credentials to `.env.local`:

   ```env
   NEXT_PUBLIC_POSTHOG_KEY=your_project_api_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

   Or use your self-hosted PostHog instance URL for the host.

2. **Verify Installation**

   PostHog packages are already installed:

   - `posthog-js`: Client-side analytics
   - `posthog-node`: Server-side analytics

### Usage

#### Client-Side Event Tracking

Use the `usePostHog` hook in any client component:

```tsx
"use client";

import { usePostHog } from "posthog-js/react";

export function MyComponent() {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("button_clicked", {
      button_name: "my_button",
      page: "home",
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

#### Server-Side Analytics

Use the PostHog client in server components or API routes:

```tsx
import PostHogClient from "@/app/lib/posthog";

export async function MyServerComponent() {
  const posthog = PostHogClient();

  // Get feature flags
  const flags = await posthog.getAllFlags("user_id_123");

  // Always shutdown the client when done
  await posthog.shutdown();

  return <div>...</div>;
}
```

#### Feature Flags

##### Client-Side

```tsx
"use client";

import { usePostHog } from "posthog-js/react";

export function MyComponent() {
  const posthog = usePostHog();
  const showNewFeature = posthog.isFeatureEnabled("new-feature");

  return showNewFeature ? <NewFeature /> : <OldFeature />;
}
```

##### Server-Side

```tsx
import PostHogClient from "@/app/lib/posthog";

export async function MyPage() {
  const posthog = PostHogClient();
  const isEnabled = await posthog.isFeatureEnabled(
    "new-feature",
    "user_id_123"
  );
  await posthog.shutdown();

  return <div>{isEnabled ? "New Feature" : "Old Feature"}</div>;
}
```

### Example

See `app/ui/clickable-shape.tsx` for a complete example of client-side event tracking.

### Best Practices

### Next.js 15 Conventions

- PostHog initialization happens at **module level** (not in useEffect) to prevent re-initialization
- Uses **Suspense boundary** around PostHogPageView to handle async hooks safely
- Pageview tracking uses **usePathname and useSearchParams** from next/navigation for App Router
- Server-side client is created **per-request** via factory function for proper user context
- Uses `instrumentation.ts` at project root for server-side setup (Next.js 15 convention)

### General Notes

- Always call `posthog.shutdown()` after using the server-side client
- Client-side events are automatically tracked once the provider is initialized
- Use `NEXT_PUBLIC_` prefix for environment variables that need to be available in the browser
- Page views are tracked automatically on route changes via the PostHogPageView component
