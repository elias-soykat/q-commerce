import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="container">
      <div className="animate-pulse py-20 md:py-36">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-slate-200 h-80 sm:mr-10"></div>
          <div className="">
            <div className="h-6 bg-slate-200 rounded-md"></div>
            <div className="h-6 mt-4 py-5 rounded-md bg-slate-300"></div>
            <div className="mt-14 py-2 rounded-md bg-slate-300"></div>
            <div className="mt-5 py-2 rounded-md bg-slate-200"></div>
            <div className="mt-5 py-2 rounded-md bg-slate-300"></div>
            <div className="grid grid-cols-2 mt-8">
              <div className="mt-4 py-6 mr-12 rounded-md bg-slate-300"></div>
              <div className="mt-4 py-6 rounded-md bg-slate-300"></div>
            </div>
          </div>
        </div>
        <div className="mt-20 py-3 rounded-md bg-slate-200"></div>
        <div className="mt-4 py-3 rounded-md bg-slate-300"></div>
        <div className="mt-8 py-3 rounded-md bg-slate-200"></div>
        <div className="mt-4 py-3 rounded-md bg-slate-300"></div>
        <div className="mt-10 py-3 rounded-md bg-slate-200"></div>
        <div className="mt-4 py-3 rounded-md bg-slate-300"></div>
      </div>
    </div>
  );
}
