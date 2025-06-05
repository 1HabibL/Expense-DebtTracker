"use client"

import React from 'react'
import {useState} from "react";
import ExpenseForm from '../expenseform';



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

export default function DashBoard() {
    const [expenses, setExpenses] = useState([]);
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


            <ExpenseForm  expenses={expenses} setExpenses={setExpenses}/>


        </div>

    )
}