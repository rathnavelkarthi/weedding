"use client";

import dynamic from "next/dynamic";

const CosmosGallery = dynamic(() => import("@/components/CosmosGallery"), {
  ssr: false,
  loading: () => <div style={{ height: "100svh", background: "#06040a" }} />,
});

export default function CosmosGalleryClient() {
  return <CosmosGallery />;
}
