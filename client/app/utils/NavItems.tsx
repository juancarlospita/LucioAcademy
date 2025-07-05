import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden lg:flex items-center space-x-1">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-[#39c1f3] dark:text-[#39c1f3] border-b-2 border-[#39c1f3]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#39c1f3] dark:hover:text-[#39c1f3]"
                } text-[16px] sm:text-[18px] px-4 py-2 font-Poppins font-[500] transition-all duration-300 relative group`}
              >
                {i.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] transition-all duration-300 group-hover:w-full ${
                  activeItem === index ? 'w-full' : ''
                }`}></span>
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="lg:hidden w-full">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[20px] font-Poppins font-[600] text-black dark:text-white`}
              >
                ELearning
              </span>
            </Link>
          </div>
          <div className="flex flex-col space-y-1">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={i.url} passHref key={index}>
                  <span
                    className={`${
                      activeItem === index
                        ? "text-[#39c1f3] border-l-2 border-[#39c1f3]"
                        : "text-black dark:text-white hover:text-[#39c1f3] dark:hover:text-[#39c1f3]"
                    } block py-4 px-6 text-[16px] font-Poppins font-[500] transition-all duration-300`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
