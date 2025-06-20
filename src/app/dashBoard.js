"use client"

import React from 'react'
import {useState} from "react";
import ExpenseForm from './expenseform';
import { categoryProcessing, dateProcessing } from './chartData.js'


import {Pie} from "react-chartjs-2"
import {Line} from "react-chartjs-2"
import {Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement,LineElement,Title)

export default function DashBoard({expenses}) {
    
    const dummyExpenseList =[
        {rent: 1800},
        {car: 700},
        {food: 500},
        {transportation: 0}
    ]

const expenseArch = [
{expenseName: 'Popeyes', amount: 25, category: 'Food', date: '2025-06-04', additionalNotes: ''},
{expenseName: 'ttc', amount: 25, category: 'Transportation', date: '2025-06-04', additionalNotes: ''},
{expenseName: 'winter tires', amount: 25, category: 'Transportation', date: '2025-06-11', additionalNotes: ''},
{expenseName: 'medecine', amount: 25, category: 'Health', date: '2025-06-24', additionalNotes: ''},
{expenseName: 'medecine', amount: 25, category: 'rent', date: '2025-06-24', additionalNotes: ''},
{expenseName: 'medecine', amount: 25, category: 'utilities', date: '2025-06-24', additionalNotes: ''},
]

 


    const expenseGraphing = expenses;

    // convert data into chart format
const refinedCategory = categoryProcessing(expenses);
const labels = refinedCategory.map((item) => item.newCategory);
const dataValues = refinedCategory.map((item) => item.amount);
    //expense form data  for pie chart
    // loop through all expenses categorys and add up all categories sums

    

      // convert data into line chart format

const refinedDate = dateProcessing(expenses)
const dateLabels = refinedDate.map((item) => item.date)
const dataDataValues = refinedDate.map((item) => item.amount)


    const chartData = {
        labels: labels,
        datasets: [
            {label: "Expenses",
              data: dataValues,
              backgroundColor: [
                "#4ade80", // green
                "#60a5fa", // blue
                 "#facc15",  // yellow
                 "#A020F0" , //purple
                 "#ff9b9b" ,//red
                 "#fbc3b0",//pastel orange
                 "#aaaaaa", //pastel gray
                 "#a08f61", //swamp
                 "#343b34", //decay black

              ],
              borderColor: '#fff',
              borderWidth: 1  
            }
        ]
    }
    const lineChartData = {
        labels: dateLabels, //["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {label: "Monthly Expenses",
                data: dataDataValues, //[2400, 2100, 2500]
                fill: false,
                borderColor: "#60a5fa",// nice blue
                tension: 0.3
            }
        ]
    }

    return (
   <div className="w-full px-4 py-8">
  <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

  <div id="graphContainer" className="flex flex-col lg:flex-row gap-8 justify-center items-center bg-gradient-to-br from-gray-300 via-white to-gray-300 p-6 rounded-xl shadow-inner">
    
    {/* Line Chart */}
    <div className="flex flex-col items-center justify-center w-full h-[500px] max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center">📈 Monthly Expense Trend</h2>
      <Line data={lineChartData} />
    </div>

    {/* Pie Chart */}
    <div className="w-full max-w-md h-[500px] bg-white p-6 rounded-xl shadow-lg flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">🧁 Category Breakdown</h2>
        <Pie data={chartData} />
      </div>
    </div>

{/* Pie Chart */}

  </div>
</div>

    )
}