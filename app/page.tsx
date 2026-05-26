import Atmosphere from "@/components/Atmosphere";
import Invitation from "@/components/Invitation";
import CosmosGalleryClient from "@/components/CosmosGalleryClient";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Invitation cosmosSlot={<CosmosGalleryClient />} />
    </>
  );
}
