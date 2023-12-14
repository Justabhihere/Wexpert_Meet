// ParentComponent.js
import React from 'react';
import MeetingFooter from './MeetingFooter';

const ParentComponent = () => {
  const handleLeaveMeeting = () => {
    // Your logic to end the meeting
    console.log('Leaving the meeting...');
  };

  const handleMicClick = (isMicOn) => {
    // Logic for handling mic click
    console.log('Mic state:', isMicOn);
  };

  const handleVideoClick = (isVideoOn) => {
    // Logic for handling video click
    console.log('Video state:', isVideoOn);
  };
  

  return (
    <div>
      {/* Other components */}
      <MeetingFooter
        onLeaveMeeting={handleLeaveMeeting}
        onMicClick={handleMicClick}
        onVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default ParentComponent;
