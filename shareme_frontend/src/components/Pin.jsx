import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import avatar from '../assets/avatar.png';

import { client, urlFor } from "../client";

const Pin = ({ pin }) => {
  const { postedBy, image, _id, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  console.log(pin?.save);
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const deletePin = (id) =>{
    client.delete(id).then(()=> window.location.reload)
  }

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img
            className="rounded-lg w-full"
            alt="user-post"
            src={urlFor(image).width(250).url()}
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-full w-9 h-9 p-2 fle items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hoverLshadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <div>
                {alreadySaved?.length !== 0 ? (
                  <button
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {pin?.save?.length} Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 16)}...
                </a>
              ) : undefined}
              {postedBy?._id === user?.googleId && (
                  <button
                  type="button"
                  onClick={(e)=>{
                e.stopPropagation();
                deletePin(_id);}
                }
                  className="bg-white flex  items-center p-2 opacity-75 hover:opacity-100 text-dark rounded-full w-8 h-8"><AiTwotoneDelete /></button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 items-center mt-2">
          <img className="w-6 h-6 rounded-full" src={avatar} alt="user-profile"/>
          <p className="text-gray-500 capitalize">{postedBy?.userName?.slice(6,20)}</p>
      </Link>
    </div>
  );
};

export default Pin;
