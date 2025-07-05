"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiOutlineX } from "react-icons/hi";
import CustomModal from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {data:userData,isLoading,refetch} = useLoadUserQuery(undefined,{});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if(!isLoading){
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if(data === null){
        if(isSuccess){
          toast.success("Login Successfully");
        }
      }
      if(data === null && !isLoading && !userData){
          setLogout(true);
      }
    }
  }, [data, userData,isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-90 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition-all duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow transition-all duration-500"
        }`}
      >
        <div className="w-[95%] max-w-7xl mx-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div className="flex items-center">
              <Link
                href={"/"}
                className={`text-[20px] sm:text-[25px] lg:text-[28px] font-Poppins font-[600] text-black dark:text-white hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <NavItems activeItem={activeItem} isMobile={false} />
              <div className="hidden lg:block">
                <ThemeSwitcher />
              </div>
              {/* only for mobile */}
              <div className="lg:hidden flex items-center gap-3">
                <ThemeSwitcher />
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <div className="relative group">
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] lg:w-[35px] lg:h-[35px] rounded-full cursor-pointer border-2 border-transparent hover:border-[#39c1f3] transition-all duration-300"
                      style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden lg:block cursor-pointer dark:text-white text-black hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Features section for desktop */}
        <div className="hidden lg:block w-full bg-gradient-to-r from-[#39c1f3]/10 to-[#2563eb]/10 border-t border-[#39c1f3]/20">
          <div className="w-[95%] max-w-7xl mx-auto py-3">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Live Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Lifetime Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] backdrop-blur-sm"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[85%] sm:w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-95 top-0 right-0 overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <Link href="/" className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
                  ELearning
                </Link>
                <HiOutlineX
                  size={25}
                  className="cursor-pointer dark:text-white text-black hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300"
                  onClick={() => setOpenSidebar(false)}
                />
              </div>
              <NavItems activeItem={activeItem} isMobile={true} />
              <div className="p-4 border-t dark:border-gray-700 mt-4">
                {userData?.user ? (
                  <Link href={"/profile"} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full"
                      style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
                    />
                    <span className="text-black dark:text-white">Profile</span>
                  </Link>
                ) : (
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                    onClick={() => {
                      setOpen(true);
                      setOpenSidebar(false);
                    }}
                  >
                    <HiOutlineUserCircle size={25} className="dark:text-white text-black" />
                    <span className="text-black dark:text-white">Login</span>
                  </button>
                )}
              </div>
              <div className="p-4 mt-auto">
                <p className="text-[14px] text-gray-600 dark:text-gray-400 text-center">
                  Copyright © 2023 ELearning
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
    )
   }
   </>
  );
};

export default Header;