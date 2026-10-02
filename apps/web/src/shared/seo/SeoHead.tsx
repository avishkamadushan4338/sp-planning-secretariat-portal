import React from "react";

// In TanStack Start, SEO metadata is rendered server-side via Route.head() on every route!
// This component provides a safe client-side dynamic head updater if called inside components.
export default function SeoHead(props) {
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (props.title) document.title = props.title;
    }
  }, [props.title]);
  return null;
}
