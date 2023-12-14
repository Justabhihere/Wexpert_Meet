import { useState } from "react";
import "./Transcription.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const Transcription = ({ setMeetingState }) => {
  console.log("Trans")
  return (
    <>
      <button id="drag-container">
        <FontAwesomeIcon
          className="text-3xl absolute text-black m-3 transition-opa z-10"
          icon={faAngleRight}
          onClick={() =>
            setMeetingState((prev) => ({
              ...prev,
              transcription: !prev.transcription,
            }))
          }
        />
      </button>
      <div className={`messenger-container from-left mx-2 my-3 rounded-md `}>
        <div className="border-b-2 pb-3 border-black sticky top-0 bg-white">
          <div className="messenger-header text-2xl">
            <p>Transcription</p>
            <FontAwesomeIcon
              className="icon transition-opa z-10"
              onClick={() =>
                setMeetingState((prev) => ({
                  ...prev,
                  transcription: !prev.transcription,
                }))
              }
              icon={faTimes}
            />
          </div>
          <div className="flex justify-center gap-3">
            <div className="">
              <FontAwesomeIcon className="" icon={faUserFriends} />
            </div>
            <p>People (1)</p>
          </div>
        </div>

        <div className="transcript-section pl-7 pr-3 text-left">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque tenetur omnis illum ducimus, ad doloribus dignissimos asperiores tempore blanditiis, reiciendis a perspiciatis ullam animi sunt veniam nam sit recusandae eum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum veritatis a id consequatur iusto commodi, quo maxime quia qui animi libero quaerat sequi mollitia voluptatem! Atque, alias, beatae, cupiditate quia quos quae ea culpa vitae laborum ad dolorem. Amet beatae quis tempore, consequatur dicta non id, debitis natus omnis ab sint nobis eveniet vel provident doloremque harum nihil explicabo fugit tenetur nam asperiores voluptates at neque rerum. Deserunt incidunt at amet unde, dignissimos in quos provident tenetur. Explicabo doloribus cumque voluptate saepe unde excepturi reprehenderit, architecto quas magnam voluptas fuga quidem deleniti repellendus omnis rerum modi asperiores totam facere nihil temporibus vitae cupiditate. Expedita voluptatum tempore distinctio cupiditate, assumenda incidunt in, iure nobis et exercitationem asperiores nulla beatae, laboriosam dolorem temporibus minus nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum veritatis a id consequatur iusto commodi, quo maxime quia qui animi libero quaerat sequi mollitia voluptatem! Atque, alias, beatae, cupiditate quia quos quae ea culpa vitae laborum ad dolorem. Amet beatae quis tempore, consequatur dicta non id, debitis natus omnis ab sint nobis eveniet vel provident doloremque harum nihil explicabo fugit tenetur nam asperiores voluptates at neque rerum. Deserunt incidunt at amet unde, dignissimos in quos provident tenetur. Explicabo doloribus cumque voluptate saepe unde excepturi reprehenderit, architecto quas magnam voluptas fuga quidem deleniti repellendus omnis rerum modi asperiores totam facere nihil temporibus vitae cupiditate. Expedita voluptatum tempore distinctio cupiditate, assumenda incidunt in, iure nobis et exercitationem asperiores nulla beatae, laboriosam dolorem temporibus minus nostrum.
          {/* Trancipt messgaes using map */}
        </div>
      </div>
    </>
  );
};

export default Transcription;
