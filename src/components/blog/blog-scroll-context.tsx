'use client';

import { createContext, useContext, type RefObject } from 'react';

const BlogScrollRootContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function BlogScrollRootProvider({
  rootRef,
  children,
}: {
  rootRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  return <BlogScrollRootContext.Provider value={rootRef}>{children}</BlogScrollRootContext.Provider>;
}

export function useBlogScrollRoot() {
  return useContext(BlogScrollRootContext);
}
