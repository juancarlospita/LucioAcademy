"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import { Heading } from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const CoursesPageContent: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setcourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setcourses(data?.courses);
    }
    if (category !== "All") {
      setcourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setcourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] max-w-7xl mx-auto min-h-[70vh] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <Heading
              title={"All courses - Elearning"}
              description={"Elearning is a programming community."}
              keywords={
                "programming community, coding courses, expert advice, tutorials, articles, resources, projects, events, jobs, collaboration"
              }
            />
            
            {/* Page Header */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Explore Our Courses
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover a wide range of programming courses designed to help you master the latest technologies and advance your career.
              </p>
            </div>
            
            {/* Categories Filter */}
            <div className="w-full mb-8 lg:mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Filter by Category:
                </h3>
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 lg:gap-4">
                  <div
                    className={`h-[40px] lg:h-[45px] px-4 lg:px-6 rounded-full flex items-center justify-center font-Poppins cursor-pointer text-[14px] sm:text-[16px] lg:text-[18px] font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                      category === "All" 
                        ? "bg-gradient-to-r from-[#39c1f3] to-[#2563eb] text-white transform scale-105" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    }`}
                    onClick={() => setCategory("All")}
                  >
                    All Courses
                  </div>
                  {categories &&
                    categories.map((item: any, index: number) => (
                      <div key={index}>
                        <div
                          className={`h-[40px] lg:h-[45px] px-4 lg:px-6 rounded-full flex items-center justify-center font-Poppins cursor-pointer text-[14px] sm:text-[16px] lg:text-[18px] font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                            category === item.title
                              ? "bg-gradient-to-r from-[#39c1f3] to-[#2563eb] text-white transform scale-105"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                          }`}
                          onClick={() => setCategory(item.title)}
                        >
                          {item.title}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mb-6 lg:mb-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {courses ? `${courses.length} course${courses.length !== 1 ? 's' : ''} found` : 'Loading courses...'}
              </p>
            </div>
            
            {/* No Courses Message */}
            {courses && courses.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {search ? "No courses found!" : "No courses in this category"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  {search 
                    ? "Try adjusting your search terms or browse all courses."
                    : "Please try another category or check back later for new courses."
                  }
                </p>
              </div>
            )}
            
            {/* Courses Grid */}
            {courses && courses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
                {courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default CoursesPageContent; 