import React, { useState, useRef } from "react";
import {Tooltip} from 'antd';
import {  useSelector } from "react-redux";
import { setVideo } from "../../dux/videoPlayerReducer"; 
import { videos } from "../../helpers/dataJson";

const Playlist = () => {
  const playlist = useSelector(state => state.playlist); 

  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const droppedIndex = e.dataTransfer.getData("index");
    if (droppedIndex !== index) {
      const newPlaylist = Array.from(playlist);
      const [removed] = newPlaylist.splice(droppedIndex, 1);
      newPlaylist.splice(index, 0, removed);
    }
  };

  const filteredPlaylist = playlist.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDescriptionDisplay = (description) => {
    if (description && description.length > 30) {
      return description.substring(0, 30) + "...";
    }
    return description;
  };

  return (
    <div className="playlist-container max-h-[calc(100vh-100px)] bg-black overflow-y-scroll w-full lg:w-[30%] mt-10 lg:mt-0 pt-0 pl-2 p-5" style={{ direction: 'rtl' }}>
    <h2 className="playlist-title">Playlist</h2>
    <input
      type="text"
      className="search-input"
      placeholder="Search videos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="playlist-items">
      {filteredPlaylist.map((video, index) => (
        <div
          key={video.id}
          onClick={() => handleDescriptionDisplay(index)}
          onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, index)}
            draggable
          className={
            "playlist-item cursor-pointer flex items-center justify-start py-2 px-4 border-b border-gray-700 " + (index === currentVideoIndex ? "bg-gray-900" : "")
          }
        >
          <div className="thumbnail-container">
            <img src={video.thumb} alt="Thumbnail" className="w-12 h-12 rounded-lg" />
          </div>
          <div className="video-details ml-3">
            <h3 className="video-title text-gray-200">{video.title}</h3>
            <Tooltip title={video.description}>
              <p className="video-description text-gray-400">
                {handleDescriptionDisplay(video.description)}
              </p>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Playlist;
