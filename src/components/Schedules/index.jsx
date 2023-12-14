import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BACKEND_URI } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

const Schedules = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_URI}/api/v1/updateCalendar`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const getDate = dayjs(new Date());

  try {
    window.eventFollowUp = events && events[0].description.split(" ");
  }
  catch(e){
    console.log("schedules: description Error")
  }

  const today = [];
  const tom = [];

  events.forEach((e) => {
    const str = e.startDateTime.substring(0, 10);
    if (
      str ===
      getDate.year() + "-" + (getDate.month() + 1) + "-" + getDate.date()
    )
      today.push(e);
    if (
      str ===
      getDate.year() + "-" + (getDate.month() + 1) + "-" + (getDate.date() + 1)
    )
      tom.push(e);
  });

  function getDay(i) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][i];
  }
  function getMonth(i) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][i];
  }

  const obj = useOutletContext();

  const style = {
    position: "absolute",
    width: "35vw",
    height: "65vh",
    top: "54%",
    left: "48%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#17202a",
    border: "1px solid rgb(255 255 255/ 20%)",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    "&::before, &::after": {
      content: '""',
    },
  };

  const [open, setOpen] = useState(false);

  const [modalInfo, setModelInfo] = useState({});

  const handleOpen = (e) => {
    const key = e.target.getAttribute("id");
    events.filter((e) => {
      if (e.id === key) setModelInfo(e);
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleButtonClose = () => {
    const left = (window.innerWidth - 600) / 2;
    const top = (window.innerHeight - 500) / 2;
    window.open(
      `${modalInfo.Link}`,
      "Popup",
      `width=600,height=500,left=${left}, top=${top}`
    );
    setOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-[#FF007A] font-['Cairo'] text-[2.5rem] py-[1rem] font-[600]">
        Your Schedules
      </h1>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-[#FF007A] font-['Cairo'] text-[1.7rem] font-[200]">
            Today
          </h3>
          <hr
            className="border-[#313942]"
            style={{ width: obj.large ? "38vw" : "55vw" }}
          />
          <div className="flex flex-col justify-center items-end">
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getMonth(getDate.month())} {getDate.date()}, {getDate.year()}
            </h3>
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getDay(getDate.day() % 7)}
            </h3>
          </div>
        </div>
        <div className="m-[1.5rem] flex justify-start items-start gap-[2rem]">
          <div className="flex flex-col justify-start gap-[1rem] p-[0rem]">
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Time
            </h3>
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Event
            </h3>
          </div>
          {today.map((elem) => (
            <>
              <div className="flex flex-col justify-start gap-[1rem] p-[0.5rem]">
                <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] text-center">
                  {elem.startDateTime.substring(11, 16)}
                </h3>
                <h3
                  id={elem.id}
                  data-function="today"
                  onClick={handleOpen}
                  className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] cursor-pointer text-center"
                >
                  {elem.eventName}
                </h3>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <div className="flex justify-between items-center">
          <h3 className="text-[#FF007A] font-['Cairo'] text-[1.7rem] font-[200]">
            Tomorrow
          </h3>
          <hr
            className="border-[#313942]"
            style={{ width: obj.large ? "35vw" : "52vw" }}
          />
          <div className="flex flex-col justify-center items-end">
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getMonth(getDate.month())} {getDate.date() + 1}, {getDate.year()}
            </h3>
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getDay((getDate.day() + 1) % 7)}
            </h3>
          </div>
        </div>
        <div className="m-[1.5rem] flex justify-start items-start gap-[2rem]">
          <div className="flex flex-col justify-start gap-[1rem] p-[0rem]">
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Time
            </h3>
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Event
            </h3>
          </div>
          {tom.map((elem) => (
            <>
              <div className="flex flex-col justify-start gap-[1rem] p-[0.5rem]">
                <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] text-center">
                  {elem.startDateTime.substring(11, 16)}
                </h3>
                <h3
                  id={elem.id}
                  data-function="tomorrow"
                  onClick={handleOpen}
                  className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] text-center cursor-pointer"
                >
                  {elem.eventName}
                </h3>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FontAwesomeIcon
            style={{
              position: "absolute",
              top: 15,
              right: 17,
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleClose}
            icon={faXmark}
          />
          <div className="w-[100%]">
            <h2 className="font-['Cairo'] text-[#ff007a] text-[2rem] text-center">
              Event Details
            </h2>
            <Divider sx={{ "border-color": "#313942" }} />
          </div>
          <div className="flex flex-col justify-center items-start gap-[1rem]">
            <div className="flex justify-start items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] font-['Cairo'] text-[1.2rem]">
                Event Name:{" "}
              </h2>
              <h2 className="text-[1.2rem] font-['Cairo']">
                {modalInfo.eventName}
              </h2>
            </div>
            <div className="flex justify-start items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] text-[1.2rem] font-['Cairo']">
                Start Date:{" "}
              </h2>
              <h2 className="text-[1.2rem] font-['Cairo']">
                {modalInfo.startDateTime &&
                  modalInfo.startDateTime.slice(0, 10)}
              </h2>
            </div>
            <div className="flex justify-start items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] text-[1.2rem] font-['Cairo']">
                Start Time:{" "}
              </h2>
              <h2 className="text-[1.2rem] font-['Cairo']">
                {modalInfo.startDateTime &&
                  modalInfo.startDateTime.slice(11, 16)}
              </h2>
            </div>
            <div className="flex justify-start items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] text-[1.2rem] font-['Cairo']">
                Creator Email:{" "}
              </h2>
              <h2 className="text-[1.2rem] font-['Cairo']">
                {modalInfo.email}
              </h2>
            </div>
            <div className="flex justify-start items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] text-[1.2rem] font-['Cairo']">
                Meeting Link:{" "}
              </h2>
              <h2 className="text-[1.2rem] font-['Cairo']">{modalInfo.Link}</h2>
            </div>
            <div className="flex justify-center items-center gap-[0.5rem]">
              <h2 className="text-[#ff007a] text-[1.2rem] font-['Cairo']">
                Description:{" "}
              </h2>
              <p className="text-[1rem] font-['Cairo']">
                {modalInfo.description}
              </p>
            </div>
            <button
              onClick={handleButtonClose}
              data-function="post-date-time"
              className="text-[#000] font-['Cairo'] py-[0.5rem] text-[1.2rem] rounded-[14px] bg-[#FF007A] w-[10rem] mx-[auto] mt-[1rem]"
            >
              Join Meeting
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Schedules;
