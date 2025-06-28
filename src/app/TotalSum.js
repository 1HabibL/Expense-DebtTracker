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




//WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM
//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM
//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM
const todaysDate = new Date();

export function getWeekOf(targetDate){

    let currentWeek = []
const weeksNumber = targetDate.getDay()
const endWeekNumber = new Date(targetDate)
const startWeekNumber = new Date(targetDate)
console.log("weeksNumber", weeksNumber)

switch (weeksNumber) {
    case 0:
    endWeekNumber.setDate(targetDate.getDate()+6)
     currentWeek.push({startingDay: targetDate, endingDay: new Date(endWeekNumber)})
     break;
     case 1:
         startWeekNumber.setDate(targetDate.getDate()-1)
          endWeekNumber.setDate(targetDate.getDate()+5)
        currentWeek.push({startingDay: new Date(startWeekNumber), endingDay:new Date(endWeekNumber)})
     break;
      case 2:
        startWeekNumber.setDate(targetDate.getDate()-2)
        endWeekNumber.setDate(targetDate.getDate()+4)
        currentWeek.push({startingDay: new Date(startWeekNumber), endingDay: new Date(endWeekNumber)})
     break;
      case 3:
        startWeekNumber.setDate(targetDate.getDate()-3)
         endWeekNumber.setDate(targetDate.getDate()+3)
        currentWeek.push({startingDay: new Date(startWeekNumber), endingDay: new Date(endWeekNumber)})
     break;
       case 4:
        startWeekNumber.setDate(targetDate.getDate()-4)
         endWeekNumber.setDate(targetDate.getDate()+2)
        currentWeek.push({startingDay: new Date(startWeekNumber), endingDay: new Date(endWeekNumber)})
     break;
      case 5:
        startWeekNumber.setDate(targetDate.getDate()-5)
        endWeekNumber.setDate(targetDate.getDate()+1)
        currentWeek.push({startingDay:  new Date(startWeekNumber), endingDay: new Date(endWeekNumber)})
     break;
         case 6:
            startWeekNumber.setDate(targetDate.getDate()-6)
        currentWeek.push({startingDay:  new Date(startWeekNumber), endingDay: targetDate})
     break;

}

console.log("TODAYS WEEK",currentWeek)
return currentWeek
}

export function weeklySums(array, targetDate){
  let startingAmount = 0
  let thisWeeksSum = []

  //GET WEEK OF CODER
   const currentWeek = getWeekOf(targetDate)
//GET WEEK OF CODE

let extractedStartingDay = currentWeek[0].startingDay
let extractedEndingDay = currentWeek[0].endingDay

let translatedStartingDay = extractedStartingDay.toLocaleDateString("en-US",{
  month: "long",
  day: "numeric",
  year: 'numeric'

})

let translatedEndingDay = extractedEndingDay.toLocaleDateString("en-US",{
  month: "long",
  day: "numeric",
  year: 'numeric'

})
let translatedWeek = []

translatedWeek.push({startingDay: translatedStartingDay, endingDay: translatedEndingDay})
console.log("TRANSLATED WEEK:", translatedWeek)

for (let i = 0; i < array.length; i++){
  let currentArrayDate = new Date(array[i].date)
  if(currentWeek[0].endingDay >= currentArrayDate && currentArrayDate >= currentWeek[0].startingDay){

    startingAmount = startingAmount + parseInt(array[i].amount)
    console.log(startingAmount)
  }
}

translatedWeek.push({weeklyAmount:startingAmount})
return translatedWeek
}
 
