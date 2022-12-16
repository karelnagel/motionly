import { PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";

export const usePlayer = () => {
    const playerRef = useRef<PlayerRef>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }
        playerRef.current.addEventListener("play", () => {
            setIsPlaying(true);
        });
        playerRef.current.addEventListener("pause", () => {
            setIsPlaying(false);
        });
        playerRef.current.addEventListener("seeked", (e) => {
            setFrame(e.detail.frame);
        });
        playerRef.current.addEventListener("timeupdate", (e) => {
            setFrame(e.detail.frame);
        });
        playerRef.current.addEventListener("ended", (e) => {
            setFrame(0)
        });
    }, []);
    return { playerRef, isPlaying, frame }
}