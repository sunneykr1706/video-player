import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Slider, Switch } from "antd";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  FullscreenOutlined,
} from "@ant-design/icons";
import Playlist from "../Playlist/PlaylistSection";

function VideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const playNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (videoRef.current) {
      videoRef.current.playbackRate = value;
    }
  };

  const handleVideoEnd = () => {
    if (autoplay) {
      playNextVideo();
    }
  };

  const handlePlaylistItemClick = (index) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setCurrentVideoIndex(index);

    setIsPlaying(false);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 1);
  };

  const handleSeek = (value) => {
    setCurrentTime(value);
    videoRef.current.currentTime = value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-black"
    >
      <Col span={18}>
        <div className="video-container">
          <video
            ref={videoRef}
            src={playlist[currentVideoIndex].src}
            autoPlay={autoplay}
            onEnded={handleVideoEnd}
          />
        </div>
        <Row>
          <Row className="w-full border-b border-gray-700">
            <Col span={20}>
              <Slider
                min={0}
                max={duration}
                step={1}
                value={currentTime}
                onChange={handleSeek}
              />
            </Col>
            <Col span={4} className="flex items-center ml-2 text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={1}>
              <div className="text-white text-2xl">
                {isPlaying ? (
                  <PauseCircleFilled
                    onClick={handlePlayPause}
                  />
                ) : (
                  <PlayCircleFilled
                    onClick={handlePlayPause}
                  />
                )}
              </div>
            </Col>
            <Col span={3}>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
              />
            </Col>
            <Col span={18} className="flex items-center justify-start">
              <FullscreenOutlined
                onClick={handleFullScreen}
                className="text-white text-2xl cursor-pointer"
              />
            </Col>
            <Col span={1}>
              <Switch
                checked={autoplay}
                onChange={handleAutoplayToggle}
                checkedChildren="Autoplay"
                unCheckedChildren="Autoplay"
                className="text-white"
              />
            </Col>
          </Row>
        </Row>
      </Col>
      <Col span={5}>
        <Playlist
          playlist={playlist}
          setPlaylist={setPlaylist}
          currentVideoIndex={currentVideoIndex}
          handlePlaylistItemClick={handlePlaylistItemClick}
          playNextVideo={playNextVideo}
        />
      </Col>
    </Row>
  );
}

export default VideoPlayer;
