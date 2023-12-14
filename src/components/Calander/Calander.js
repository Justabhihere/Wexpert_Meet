import React, { useEffect, useState } from 'react';

export default function Calendar() {
  
  useEffect(() => {
    const CLIENT_ID = '551338560831-jsbvu5c1s6c3tsuiu82k1kpe1ri1pf12.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCon-aIXCzoHIQTx4gCElh2r74_T5_ZBNQ';
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    let gapiInited = false;
    let gisInited = false;
    let tokenClient;

    function initializeGapiClient() {
      gapi.client
        .init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        })
        .then(() => {
          gapiInited = true;
          maybeEnableButtons();
        })
        .catch((error) => {
          console.error('Error initializing GAPI:', error);
        });
    }

    function maybeEnableButtons() {
      if (gapiInited && gisInited) {
        // Enable buttons or perform other actions
      }
    }

    // ... (Other functions and event handlers)

    function listUpcomingEvents() {
      // Your event listing logic here
    }

    // Initialize GAPI
    window.gapiLoaded = () => {
      gapi.load('client', initializeGapiClient);
    };

    // Load Google Identity Services
    window.gisLoaded = () => {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
      });
      gisInited = true;
      maybeEnableButtons();
    };

    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = window.gapiLoaded;
    document.body.appendChild(script);

    // Load Google Identity Services script
    const gsiScript = document.createElement('script');
    gsiScript.src = 'https://accounts.google.com/gsi/client';
    gsiScript.async = true;
    gsiScript.defer = true;
    gsiScript.onload = window.gisLoaded;
    document.body.appendChild(gsiScript);

    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <div>
      <p>Google Calendar API Quickstart</p>

      <button id="authorize_button" onclick="handleAuthClick()">Authorize</button>
      <button id="signout_button" onclick="handleSignoutClick()">Sign Out</button>
    <pre id="content" style="white-space: pre-wrap;"></pre>

    </div>
  )
}
