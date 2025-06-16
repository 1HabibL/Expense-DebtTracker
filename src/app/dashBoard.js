"use client"

import React from 'react'
import {useState} from "react";
import ExpenseForm from './expenseform';
import { categoryProcessing } from './chartData.js'


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
        labels: ["January", "February", "March"],
        datasets: [
            {label: "Monthly Expenses",
                data: [2400, 2100, 2500],
                fill: false,
                borderColor: "#60a5fa",// nice blue
                tension: 0.3
            }
        ]
    }

    return (
        <div>
            <h1>Dashboard</h1>
           
           <div id="graphContainer" className='flex'>
          
           <div className='max-w-xl mx-auto bg-white p-4 rounded-lg shadow'>
                <h2 className='text-xl font-semibold mb-2'>Monthly Expense Trend</h2>
                <Line data={lineChartData} />
            </div>
            
            <div className='max-w-md mx-auto bg-white p4 rounded-lg shadow'>
                <Pie data={chartData} />
            </div>
            </div>
        </div>

    )
}