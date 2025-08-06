"use client"

import { createContext } from "react";

interface thumbnailData {
  userId? : string,
  thumbnailData: []
}

export const thumbnailContext = createContext<thumbnailData>({
  userId : "",
  thumbnailData : []
});

export const ThumbnailContextProvider = thumbnailContext.Provider




