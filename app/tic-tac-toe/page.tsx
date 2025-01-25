import { Suspense } from "react";
import OfflineMode from "@/components/GameModes/OfflineMode";

export default function page() {
  return (
    <Suspense>
      <OfflineMode />
    </Suspense>
  );
}
