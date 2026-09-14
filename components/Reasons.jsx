import { LuMonitorPlay } from "react-icons/lu";
import { MdDownloadForOffline } from "react-icons/md";
import { IoTelescope } from "react-icons/io5";
import { RiStarSmileLine } from "react-icons/ri";

const Reasons = () => {
    const reasons = [
        {
            "title": "Enjoy on your TV",
            "detail": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            "icon": <LuMonitorPlay />,
        },
        {
            "title": "Download your shows to watch offline",
            "detail": "Save your favourites easily and always have something to watch.",
            "icon": <MdDownloadForOffline />,
        },
        {
            "title": "Watch everywhere",
            "detail": "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
            "icon": <IoTelescope />,
        },
        {
            "title": "Create profiles for kids",
            "detail": "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
            "icon": <RiStarSmileLine />,
        },
    ];
  return (
      <div className='mt-5'>
          <div className='font-bold text-2xl mb-5'>
              More reasons to join
          </div>
          <div className="flex gap-5">
              {reasons.map((reason, index) => (
                  <div key={index} className='w-[300px] h-[320px] relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#1c1a3a] via-[#1a1535] to-[#2b0f1f]'>

                      <div className='font-bold text-[22px]'>
                         {reason.title}
                      </div>
                      <div className='py-5 text-[16px] text-gray-400'>{reason.detail}
                      </div>
                      <div className="text-7xl absolute right-0 mr-8 opacity-60 bottom-0 mb-5">
                          {reason.icon}
                      </div>

                  </div>
              ))}
          </div>
    </div>
  )
}

export default Reasons