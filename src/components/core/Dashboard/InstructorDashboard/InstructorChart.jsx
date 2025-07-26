import React from 'react'
import { useState } from "react"

import { Pie } from "react-chartjs-2"
import {ArcElement,Chart} from 'chart.js'

Chart.register(ArcElement)


const InstructorChart = ({courses}) => {
 
  const [currChart, setCurrChart] = useState("income")

  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }


  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }
  console.log("chartDataStudents", chartDataStudents)

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }
  console.log("chartIncomeData",chartIncomeData)

  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-2 max-w-maxContent rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">

        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm  relative z-50 p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm relative z-50 p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="-mt-16 pl-12 aspect-square h-full -z-0 relative ">
      
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
         
        />
      </div>
    </div>
  )
}

export default InstructorChart
