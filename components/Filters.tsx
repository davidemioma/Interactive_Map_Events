"use client";

import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Combobox } from "./ui/combobox";
import { useRouter } from "next/navigation";

const categories = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "war",
    label: "War",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "politics",
    label: "Politics",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "religion",
    label: "Religion",
  },
  {
    value: "other",
    label: "Other",
  },
];

const Filters = () => {
  const router = useRouter();

  const [value, setValue] = useState("all");

  useEffect(() => {
    const pushToUrl = () => {
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: {
            cat: value,
          },
        },
        { skipNull: true }
      );

      router.push(url);
    };

    pushToUrl();
  }, [value]);

  return (
    <div className="bg-[#f9f9f9] dark:bg-[#262626] h-20 flex items-center px-6 rounded-2xl border dark:border-4 dark:border-[#363636] shadow-md">
      <div>
        <Combobox frameworks={categories} value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default Filters;
