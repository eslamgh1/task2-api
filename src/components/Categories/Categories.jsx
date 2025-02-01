import React, { useState } from "react";
import style from "./Categories.module.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useCategories from '../../assets/customHooks/useCategories'


export default function Categories() {

const { data , isLoading} = useCategories();
const allCategories = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
<div className="container mx-auto py-5">


<div className="grid gap-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5 ">
        {/* 3rd Div Card for IMG */}

        {allCategories?.map((category) => (
          <div
            key={category._id}
            className="bg-blue-300 rounded-sm border border-red-100"
          >
            <img src={category.image} alt={category.name} className="w-full" />

            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
</div>
    </>
  );
}
