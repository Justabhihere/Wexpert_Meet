import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, Loader, handleSendMail } from '../../AppContext';
import './Summary.css';

export default function Summary() {
  const { appState, setAppState } = useContext(AppContext);
  const [data, setData] = useState({
    keyPoints: [],
    transcribe: '',
    summary: '',
  });
  const messageRef = useRef(null);

  useEffect(() => {
    const storedKeyPoints = localStorage.getItem('keyPoints');
    if (storedKeyPoints) {
      setData((prevData) => ({
        ...prevData,
        keyPoints: JSON.parse(storedKeyPoints),
      }));
    }

    const storedTranscribe = localStorage.getItem('transcript');
    if (storedTranscribe) {
      setData((prevData) => ({
        ...prevData,
        transcribe: storedTranscribe,
      }));
    }

    setAppState((prevAppState) => ({
      ...prevAppState,
      loaderShow: true,
    }));

    const loaderTimeout = setTimeout(() => {
      setAppState((prevAppState) => ({
        ...prevAppState,
        loaderShow: false,
      }));
    }, 3000);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, [setAppState]);

  return (
    <>
      {appState.loaderShow ? (
        <Loader message={"Heading to the Summary Page. Hold tight, we're almost there!"} />
      ) : (
        <div className='summary flex flex-col justify-center items-center h-screen'>
          <div ref={messageRef} className='p-10 rounded-xl bg-white text-black max-w-md'>
            <h1 className='text-3xl font-semibold mb-4'>Summary :</h1>
            {data.keyPoints.length !== 0 && (
              <div className='mb-3 border-2 p-3 border-black'>
                <h1 className="text-lg font-semibold mb-1">Key Points Discussed:</h1>
                <ul>
                  {data.keyPoints.map((point, index) => (
                    <li className='' key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className='mb-3 border-2 p-3 border-black'>
              <h1 className="text-lg font-semibold mb-1">Transcribed Data:</h1>
              {data.transcribe}
            </div>
            <div className='mb-3 border-2 p-3 border-black'>
              <h1 className="text-lg font-semibold mb-1">Brief Description:</h1>
              <h1 className="text-lg font-semibold mb-1">AI generated:</h1>
              This informal networking event brought together individuals from diverse backgrounds for an evening of conversation and connection.
              Attendees enjoyed drinks and appetizers while engaging in meaningful discussions about their careers,
              current industry trends, and potential collaborations.
            </div>
          </div>
          <button className='mt-3 btn' onClick={() => { handleSendMail(setAppState, "The Meeting Was Ended", messageRef.current.innerText) }}>Send Email</button> {/* Added a button to trigger sending email */}
        </div>
      )}
    </>
  );
}
