"use client";

import * as React from "react";

import { useLocalMedia, useRoomConnection, VideoGrid } from "@whereby.com/browser-sdk/react";
import { useRouter } from 'next/navigation'

interface Props {
    roomUrl: string;
}

export default function Room({ roomUrl }: Props) {
    const router = useRouter()

    const { state: localMediaState, actions: localMediaActions } = useLocalMedia({
        video: true,
        audio: true,
    });

    const { state, actions } = useRoomConnection(roomUrl, {
        localMedia: {
            state: localMediaState,
            actions: localMediaActions,
        },
    });
    const { joinRoom, leaveRoom } = actions

    const handleKnock = async () => {
        actions.knock();
    };

    React.useEffect(() => {
        console.log(state);
    }, [state]);

    React.useEffect(() => {
          joinRoom();
          return () => {
              leaveRoom()
          };
      }, [joinRoom, leaveRoom]);

    if (state.connectionStatus === "ready") {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (state.connectionStatus === "room_locked") {
        return (
            <div>
                <button onClick={() => handleKnock()}>Knock</button>
            </div>
        );
    }

    if (state.connectionStatus === "knocking") {
        return (
            <div>
                Knocking
            </div>
        );
    }

      return (
          <div style={{width: "100%", height: "100%"}}>
              <VideoGrid />
              <button type="button" onClick={() => router.push('/other')} style={{ width: "5em", height: "2em" }}>
                  Other
              </button>
          </div>
      );
}
