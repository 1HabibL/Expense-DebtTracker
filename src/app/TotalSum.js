import ExpenseForm from "./expenseform";

const today = new Date();
const formattedToday = today.toLocaleDateString("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric"
})
console.log("today:",today);
console.log("formattedToday:",formattedToday);


const numericalFormat = new Date().toISOString().split("T")[0]

export function convertDates(targetDate){
    let processedDate = new Date(targetDate)
    let expenseMonth = processedDate.toLocaleDateString("en-us",{
        month: "long"
    }) 

    return expenseMonth
}


export function monthlySums(array){
const todaysDate = new Date()
const todaysMYFormatted = todaysDate.toLocaleDateString("en-us",{
    year: "numeric",
    day: "numeric"
})

const todaysMonthFormatted = todaysDate.toLocaleDateString("en-us",{ 
    month: "long"
})
console.log("todaysDate", todaysDate)
console.log("todaysMonthFormatted:", todaysMonthFormatted)
console.log("todaysMYFormatted", todaysMYFormatted)

const annualMonths = [{month: "January"},{month: "February"}, 
    {month: "March"}, {month: "April"}, {month: "May"},
     {month: "June"},{month: "July"}, {month: "August"}, 
     {month: "September"}, {month: "October"},
      {month: "November"}, {month: "December"}]

const thisMonthsSum = []
const allAplicableMonthSums = []

thisMonthsSum.push({month:todaysMonthFormatted, amount: 0})

console.log("thisMonthsSum before for loop:",thisMonthsSum)

for(let i = 0; i < array.length; i++){

let expenseMonth = convertDates(array[i].date)

if(thisMonthsSum[0].month === expenseMonth){
    thisMonthsSum[0].amount = thisMonthsSum[0].amount + parseInt(array[i].amount)
} 


}
console.log("monthly sums final:",thisMonthsSum)
return thisMonthsSum
}

