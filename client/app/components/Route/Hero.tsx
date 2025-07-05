'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data,isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router = useRouter()
  
  const handleSearch = () => {
   if(search === ""){
    return
   }else{
    // redirect seacrh
    router.push(`/courses?title=${search}`);
   }
  }


  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div className="hero-bg w-full min-h-screen flex flex-col lg:flex-row items-center relative overflow-hidden">
        <div className="hero-bg-image"></div>
        <div className="absolute top-[100px] lg:top-[unset] xl:h-[700px] xl:w-[700px] lg:h-[600px] lg:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] lg:left-8 xl:left-14 z-20"></div>
        
        {/* Image Section */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex items-center justify-center lg:min-h-screen min-h-[200px] z-20">
          <div className="relative flex items-center justify-center w-full h-full">
            <Image
              src={data?.layout?.banner?.image?.url}
              width={1200}
              height={1200}
              alt=""
              className="object-contain h-[35vh] w-auto lg:h-[70vh] lg:w-auto max-h-[90vh] mx-auto z-[10]"
            />
            {/* Decorative elements for desktop */}
            <div className="hidden lg:block absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="hidden lg:block absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col items-center lg:items-start lg:mt-[0px] text-center lg:text-left mt-[50px] lg:mt-[150px] z-20 px-4 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl">
            <h2 className="text-white text-[24px] sm:text-[30px] lg:text-[50px] xl:text-[60px] 2xl:text-[70px] font-[600] font-Josefin py-2 leading-tight lg:leading-[1.1] xl:leading-[1.2] w-full">
              {data?.layout?.banner?.title}
            </h2>
            <br />
            <p className="text-white font-Josefin font-[500] text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] w-full lg:w-[90%] xl:w-[85%] leading-relaxed opacity-90">
             {data?.layout?.banner?.subTitle}
            </p>
            <br />
            <br />
            
            {/* Search Bar */}
            <div className="w-full lg:w-[90%] xl:w-[85%] h-[50px] lg:h-[60px] bg-transparent relative">
              <input
                type="search"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 dark:border-white/30 rounded-[15px] lg:rounded-[20px] p-3 lg:p-4 w-full h-full outline-none text-white placeholder:text-white/70 text-[16px] sm:text-[18px] lg:text-[20px] font-[500] font-Josefin transition-all duration-300 focus:border-white/50 focus:bg-white/20 pr-[60px] lg:pr-[70px]"
              />
              <div className="absolute flex items-center justify-center w-[50px] lg:w-[60px] cursor-pointer h-[50px] lg:h-[60px] right-0 top-0 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] rounded-r-[15px] lg:rounded-r-[20px] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg"
              onClick={handleSearch}
              >
                <BiSearch className="text-white" size={24} />
              </div>
            </div>
            <br />
            <br />
            
            {/* Trust Section */}
            <div className="w-full lg:w-[90%] xl:w-[85%] flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <div className="flex items-center">
                <Image
                  src={require("../../../public/assests/client-1.jpg")}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] border-2 border-white/30"
                />
                <Image
                  src={require("../../../public/assests/client-2.jpg")}
                  alt=""
                  className="rounded-full ml-[-20px] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] border-2 border-white/30"
                />
                <Image
                  src={require("../../../public/assests/client-3.jpg")}
                  alt=""
                  className="rounded-full ml-[-20px] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[60px] lg:h-[60px] border-2 border-white/30"
                />
              </div>
              <p className="font-Josefin text-white text-center sm:text-left lg:pl-3 text-[14px] sm:text-[16px] lg:text-[18px] font-[500] opacity-90">
                500K+ People already trusted us.{" "}
                <Link
                  href="/courses"
                  className="text-[#39c1f3] hover:text-[#2563eb] transition-colors duration-300 font-semibold"
                >
                  View Courses
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
   }
   </>
  );
};

export default Hero;