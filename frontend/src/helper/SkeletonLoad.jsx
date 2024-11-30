import React from "react";

export default function SkeletonLoad() {
  return (
    <div className="my-3.5 border border-gray-400  shadow rounded">
      <div className="animate-pulse p-[18px]">
        <div className="bg-slate-300 h-80 rounded-md duration-300 hover:scale-90"></div>
        <div className="pt-4">
          <div className="h-6 bg-slate-300 rounded-md"></div>
          <div className="h-6 mt-4 py-5 rounded-md bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}
