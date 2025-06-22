"use client";
import React, { Suspense } from "react";
import CoursesPageContent from "./CoursesPageContent";
import Loader from "../components/Loader/Loader";

export const dynamic = 'force-dynamic';

type Props = {};

const Page: React.FC<Props> = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CoursesPageContent />
      </Suspense>
    </div>
  );
};

export default Page;