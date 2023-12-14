import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from 'html2canvas';
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
  faLink,
  faLinkSlash,
  faAlignLeft,
  faSlash,
  faCamera,
  faPhone,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import "./MeetingFooter.css";
import { Link } from "react-router-dom";
import Model from "../Model/Model";
import { useContext } from 'react';
import { AppContext } from '../../AppContext';


const MeetingFooter = (props) => {
  const { appState, setAppState } = useContext(AppContext);
  const inputRef = useRef();
  const [keyPoints, setKeyPoints] = useState([]);
  console.log(keyPoints)
  const captureElementRef = useRef(null);
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };

  const onScreenshotClick = () => {
    const elementToCapture = captureElementRef.current || document.body;

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        const screenshotDataUrl = canvas.toDataURL("image/png");
        const newWindow = window.open();
        newWindow.document.write('<img src="' + screenshotDataUrl + '" alt="Screenshot" style="width: 100%"/>');
      });
    }
  };

  function onKeyClick() {
    setAppState({
      loaderShow: false,
      model: {
        showModel: true,
        modelNeedInput: true,
        modelType:'keys',
        modelMsg: "Enter a Key Points:"
      }
    });
  }

  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  return (
    <>
      {appState.model.showModel && (
        <Model
          message={appState.model.modelMsg}
          setKeyPoints={setKeyPoints}
          keyPoints={keyPoints}
          inputRef={inputRef}
        />)}
      <div className="meeting-footer border-t">
        <div
          className={"meeting-icons " + (!streamState.mic ? "active" : "")}
          data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
          onClick={micClick}
        >
          <FontAwesomeIcon
            icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
            title="Mute"
          />
        </div>
        <div
          className={"meeting-icons " + (!streamState.video ? "active" : "")}
          data-tip={streamState.video ? "Hide Video" : "Show Video"}
          onClick={onVideoClick}
        >
          <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
        </div>
        <div
          className={"meeting-icons"}
          onClick={onScreenshotClick}
        >
          <FontAwesomeIcon icon={faCamera} />
        </div>
        <Link to='summary'>
          <div
            className={"meeting-icons active"}
          >
            <FontAwesomeIcon icon={faPhone} />
          </div>
        </Link>
        <div
          className="meeting-icons"
          data-tip="Share Screen"
          onClick={onScreenClick}
          disabled={streamState.screen}
        >
          <FontAwesomeIcon icon={faDesktop} />
        </div>
        <div className={"meeting-icons " + (props.meetingState.meetingInfo ? "" : "active")}
          data-tip="Link Info"
          onClick={() =>
            props.setMeetingState((prev) => ({
              ...prev,
              meetingInfo: !prev.meetingInfo,
            }))
          }
          disabled={streamState.screen}
        >
          <FontAwesomeIcon
            icon={
              props.meetingState.meetingInfo ? faLink : faLinkSlash
            }
          />
        </div>
        <div className={"meeting-icons " + (props.meetingState.transcription ? "" : "active")}
          data-tip="Link Info"
          onClick={() =>
            props.setMeetingState((prev) => ({
              ...prev,
              transcription: !prev.transcription,
            }))
          }
          disabled={streamState.screen}
        >
          {props.meetingState.transcription ? (
            <FontAwesomeIcon icon={faAlignLeft} />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faSlash}
                className="overlay-icon"
                style={{ position: "absolute" }}
              />
              <FontAwesomeIcon
                icon={faAlignLeft}
                style={{ position: "relative" }}
              />
            </>
          )}
        </div>
        <div
          className="meeting-icons"
          onClick={onKeyClick}
          disabled={streamState.screen}
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <ReactTooltip />
      </div>
    </>
  );
};

export default MeetingFooter;
