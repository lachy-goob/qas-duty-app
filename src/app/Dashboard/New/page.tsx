"use client";

import React from "react";
import JobFormController from "./JobFormController";

const JobFormPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create New Job
        </h2>
        <JobFormController />
      </div>
    </div>
  );
};

export default JobFormPage;
