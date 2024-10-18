import dynamic from "next/dynamic";
import * as React from "react";
const Room = dynamic(() => import("../components/room"), { ssr: false });

const roomUrl = "<room url>"
export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Room roomUrl={roomUrl} />
    </div>
  );
}
