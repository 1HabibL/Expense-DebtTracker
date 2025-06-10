"use client"

import React from 'react'
import ExpenseForm from '../expenseform';

import {Pie} from "react-chartjs-2"
import {Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DashBoard() {

    const dummyExpenseList =[
        {rent: 1800},
        {car: 700},
        {food: 500}
    ]

    // concert data into chart format
    const labels = dummyExpenseList.map((item) => Object.keys(item)[0]);
    const dataValues = dummyExpenseList.map((item) => Object.values(item)[0])

    const chartData = {
        labels: labels,
        datasets: [
            {label: "Expenses",
              data: dataValues,
              backgroundColor: [
                "#4ade80", // green
                "#60a5fa", // blue
                 "#facc15"  // yellow
              ],
              borderColor: '#fff',
              borderWidth: 1  
            }
        ]
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className='max-w-md mx-auto bg-white p4 rounded-lg shadow'>
                <Pie data={chartData} />
            </div>
        </div>

    )
}