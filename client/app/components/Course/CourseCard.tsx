import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const defaultThumbnail = "/default-course-image.jpg"; // Asegúrate de tener esta imagen en tu carpeta public

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-sm dark:shadow-inner hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group bg-white dark:bg-gray-800/50">
        <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[240px] overflow-hidden rounded-lg lg:rounded-xl">
          <Image
            src={item.thumbnail?.url || defaultThumbnail}
            fill
            className="object-cover rounded-lg lg:rounded-xl group-hover:scale-110 transition-transform duration-500"
            alt={item.name || "Course thumbnail"}
          />
          {/* Overlay for desktop hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {item.price === 0 ? "Free" : "₹" + item.price}
          </div>
        </div>
        
        <div className="p-3 lg:p-4">
          <h1 className="font-Poppins text-[14px] sm:text-[16px] lg:text-[18px] text-black dark:text-[#fff] line-clamp-2 min-h-[2.5rem] lg:min-h-[3rem] font-semibold group-hover:text-[#39c1f3] transition-colors duration-300">
            {item.name}
          </h1>
          
          <div className="w-full flex items-center justify-between pt-3 lg:pt-4">
            <Ratings rating={item.ratings} />
            <h5
              className={`text-black dark:text-[#fff] text-[12px] sm:text-[14px] lg:text-[15px] ${
                isProfile && "hidden sm:inline"
              }`}
            >
              {item.purchased} Students
            </h5>
          </div>
          
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 lg:pt-4 gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-black dark:text-[#fff] text-[16px] sm:text-[18px] lg:text-[20px] font-bold">
                {item.price === 0 ? "Free" : "₹" + item.price}
              </h3>
              <h5 className="text-[12px] sm:text-[14px] lg:text-[16px] line-through opacity-60 text-black dark:text-[#fff]">
              ₹{item.estimatedPrice}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineUnorderedList size={16} className="fill-current text-gray-600 dark:text-gray-400" />
              <h5 className="text-[12px] sm:text-[14px] lg:text-[15px] text-black dark:text-[#fff]">
                {item.courseData?.length} Lectures
              </h5>
            </div>
          </div>
          
          {/* Progress bar for desktop (if applicable) */}
          {isProfile && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#39c1f3] to-[#2563eb] h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;