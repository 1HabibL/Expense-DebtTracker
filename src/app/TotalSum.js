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

function convertDates(targetDate){
    let rawDate = new Date(targetDate)
    console.log("rawDate", rawDate )
    let processedDate = new Date(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate())
    console.log("processedDate", processedDate)
    let expenseMonth = rawDate.toLocaleDateString("en-us",{
        year: "numeric",
        month: "long",
        timeZone: "UTC"   
    }) 
console.log("expenseMonth:", expenseMonth)

return expenseMonth
}

function monthlySums(array){
const todaysDate = new Date()

const todaysMYFormatted = todaysDate.toLocaleDateString("en-us",{
    year: "numeric",
    month: "long",
     timeZone: "UTC" 
})
//console.log(todaysMYFormatted)

const todaysMonthFormatted = todaysDate.toLocaleDateString("en-us",{ 
    month: "long",
    year: "numeric"
})
//console.log("todaysDate", todaysDate)
//console.log("todaysMonthFormatted:", todaysMonthFormatted)
//console.log("todaysMYFormatted", todaysMYFormatted)

const thisMonthsSum = []
const allAplicableMonthSums = []

thisMonthsSum.push({month:todaysMonthFormatted, amount: 0})

//console.log("thisMonthsSum before for loop:",thisMonthsSum)

for(let i = 0; i < array.length; i++){

let expenseMonth = convertDates(array[i].date)

if(thisMonthsSum[0].month === expenseMonth){
    thisMonthsSum[0].amount = thisMonthsSum[0].amount + parseInt(array[i].amount)
} 

}
console.log("monthly sums final:",thisMonthsSum)
return  thisMonthsSum
}

//WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM //WEEK EXTRACTION AND WEEK SUM
//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM
//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM//WEEK EXTRACTION AND WEEK SUM
const todaysDate = new Date();

export function normalizeDate(date){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getWeekOf(targetDate){

let currentWeek = []
const weeksNumber = targetDate.getDay()
console.log("weeksNumber:", weeksNumber)
const endWeekNumber = new Date(targetDate)
console.log("endWeekNumber:", endWeekNumber)
const startWeekNumber = new Date(targetDate)
console.log("startWeekNumber:", startWeekNumber)

switch (weeksNumber) {
    case 0:
    endWeekNumber.setDate(targetDate.getDate()+6)
     currentWeek.push({startingDay: normalizeDate(targetDate), endingDay: normalizeDate(new Date(endWeekNumber))})
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
        currentWeek.push({startingDay: new Date(startWeekNumber), endingDay: targetDate})
     break;

}
console.log("TODAYS WEEK",currentWeek)
return currentWeek
}

export function weeklySums(array, targetDate){
  console.log("targetDate",targetDate)
  let startingAmount = 0
  let thisWeeksSum = []
  //GET WEEK OF CODER
   const currentWeek = getWeekOf(targetDate)
//GET WEEK OF CODE

let extractedStartingDay = currentWeek[0].startingDay
console.log("extractedStartingDay", extractedStartingDay)
let extractedEndingDay = currentWeek[0].endingDay
console.log("extractedEndingDay", extractedEndingDay)


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


  let startWT = normalizeDate(currentWeek[0].startingDay)
  console.log("startWT:", startWT)
  let endWT = normalizeDate(currentWeek[0].endingDay)
    console.log("endWT:", endWT)

for (let i = 0; i < array.length; i++){
  let currentArrayDate = new Date(array[i].date)
  console.log("currentArrayDate", currentArrayDate)
const formatDate = (date) => date.toISOString().split('T')[0];

const formattedExpenseDate = formatDate(currentArrayDate);
const formattedStart = formatDate(startWT);
const formattedEnd = formatDate(endWT);

if (formattedExpenseDate >= formattedStart && formattedExpenseDate <= formattedEnd) {
    startingAmount = startingAmount + parseInt(array[i].amount)
    console.log(startingAmount)
  }
}
translatedWeek.push({weeklyAmount:startingAmount})
console.log(translatedWeek)
return translatedWeek
}


export function annualSums(array, targetDate){
let annualSumData = []
let annualSumAmount = 0
const todaysYear = targetDate.toLocaleDateString("en-US",{
    year: "numeric"
})
for(let i = 0; i < array.length; i++){
let currentExpDate = new Date(array[i].date)
let currentExpYear = currentExpDate.toLocaleDateString("en-US",{
    year: "numeric"
})

if(currentExpYear === todaysYear){
annualSumAmount = annualSumAmount + parseInt(array[i].amount)
}
}
annualSumData.push({currentYear: todaysYear})
annualSumData.push({annualAmount: annualSumAmount})

console.log(annualSumData)
return annualSumData
}


export function todaysSums(array, targetDate){
const todaysDateFormatted = targetDate.toISOString().split("T")[0] // formats date from 2025-06-29T00:00:00.000Z to 2025-06-29
console.log(targetDate)
let todaysSumData = []
let todaysSumAmount = 0

for(let i = 0; i < array.length; i++){
if(array[i].date === todaysDateFormatted){
todaysSumAmount = todaysSumAmount + parseInt(array[i].amount)
}
}
todaysSumData.push({todaysDate: targetDate})
todaysSumData.push({todaysAmount: todaysSumAmount})

console.log(todaysSumData)
console.log(todaysSumAmount)

return todaysSumData
}

