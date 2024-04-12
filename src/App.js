import React from 'react';
import Video from './components/Video/VideoSection';
import Playlist from './components/Playlist/PlaylistSection';

const App = () => {
  return (
    <div className="bg-black">
      <div className="max-w-[1330px] m-auto min-h-[calc(100vh-200px)] w-full px-[15px] py-10 lg:flex bg-black">
      <Playlist />
        <Video style={{ marginLeft: '50px' }} />

      </div>
    </div>
  );
};

export default App;
