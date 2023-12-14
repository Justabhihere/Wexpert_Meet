import { createContext, useState } from 'react';
import { SyncLoader } from 'react-spinners';

export const AppContext = createContext({
  appState: false,
  setAppState: () => {},
});

export const Loader = ({ message = "Loading..." }) => (
  <>
    <div className="transparent-background flex-col">
      <SyncLoader color="white" />
      <div className='mt-4'>{message}</div>
    </div>
  </>
);

export function handleSendMail(setAppState, title, message) {
  fetch('http://127.0.0.1:5000/send-mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, message }),
  })
    .then(response => response.text())
    .then(data => {
      setAppState(prevState => ({
        ...prevState,
        loaderShow: false,
        model: {
          ...prevState.model, // Retain other properties in the model
          showModel: true,
          modelNeedInput: false,
          modelMsg: data,
        },
      }));
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


export default function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({
    model: {
      showModel: false,
      modelNeedInput: false,
      modelMsg: '',
      modelType: '',
    },
    loaderShow: false,
    calendar: {
      showCalendar: false,
      calendarDate: new Date(),
    },
  });

  const AppContextValues = {
    appState,
    setAppState,
  };

  return (
    <AppContext.Provider value={AppContextValues}>
      {children}
    </AppContext.Provider>
  );
}
