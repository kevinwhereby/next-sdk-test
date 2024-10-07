"use client";

import * as React from "react";

import { useRoomConnection, VideoGrid } from "@whereby.com/browser-sdk/react";
import { useRouter } from 'next/navigation'


interface Props {
    roomUrl: string;
}

export default function Room({ roomUrl }: Props) {
    const { actions } = useRoomConnection(roomUrl, { localMediaOptions: { audio: true, video: true } });
    const { joinRoom, leaveRoom } = actions;
    const router = useRouter()


    React.useEffect(() => {
        joinRoom();
        return () => {
            console.log("HERE")
            leaveRoom()
        };
    }, [joinRoom, leaveRoom]);

    return (
        <div style={{width: "100%", height: "100%"}}>
            <VideoGrid />
            <button type="button" onClick={() => router.push('/other')} style={{ width: "5em", height: "2em" }}>
                Other
            </button>
        </div>
    );
}
