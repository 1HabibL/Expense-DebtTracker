import ExpenseForm from './expenseform';

let exEXP = [
{expenseName: 'Popeyes', amount: '25', category: 'Food', date: '2025-06-04', additionalNotes: ''},

{expenseName: 'ttc', amount: '25', category: 'Transportation', date: '2025-06-04', additionalNotes: ''},

{expenseName: 'winter tires', amount: '800', category: 'Transportation', date: '2025-06-11', additionalNotes: ''},

{expenseName: 'medecine', amount: '275', category: 'Health', date: '2025-06-24', additionalNotes: ''},

{expenseName: 'car ', amount: '55', category: 'Transportation', date: '2025-06-10', additionalNotes: ''},

{expenseName: 'fit 4 less', amount: '20', category: 'Health', date: '2025-06-18', additionalNotes: ''}]


export function categoryProcessing(array) {
let refinedCategory = []


function pieChartCategories(array){
let expenseCategories = array.map(chosenExp => chosenExp.category).filter((cat, index, self) => self.indexOf(cat) === index)
let categoryRefinement = expenseCategories.map((refCat) => refinedCategory.push({newCategory: refCat, amount: 0}))
}

pieChartCategories(array)

//adding category expenses

for(let i = 0; i < refinedCategory.length; i++){
    for(let n = 0; n < array.length; n++){
        if(refinedCategory[i].newCategory === array[n].category){
            refinedCategory[i].amount += parseInt(array[n].amount);
        }
    }
}

return refinedCategory
}

 categoryProcessing(exEXP)



export function dateProcessing(array) {
    let refinedDates = []
    let summedMonths = []

    function datesExtractions (array) {
    let extractedDates = array.map((targetExp) => targetExp.date).filter((cat, index, self) => self.indexOf(cat) === index) 

    console.log("extractedDates:",extractedDates)
    
extractedDates.sort((a, b) => new Date(a) - new Date(b))
 console.log("organized extractedDates", extractedDates)

    //convert extractedDAtes

    let stringDateConversion = extractedDates.map((targetDate) => new Date(targetDate))

    console.log("stringDateConversion:", stringDateConversion)

    let formattedDates = stringDateConversion.map((targetDate) => targetDate.toLocaleDateString("en-Us", {
        month: "long",
        year: "numeric"
    }))

     console.log("this is formatted dates:",formattedDates)

     let individualizedDates =  []

     for (let i = 0; i < formattedDates.length; i++){
        if (!individualizedDates.includes(formattedDates[i])){
             individualizedDates.push(formattedDates[i])
        }
     }

 console.log("individualized dates:", individualizedDates)


let refinedMonthAmounts = individualizedDates.map((targetMonthAmount) => summedMonths.push({date: targetMonthAmount, amount: 0}))


let dateRefinements = extractedDates.map((targetDate) => refinedDates.push({date: targetDate, amount: 0}))
console.log("")
//TOTAL SUM FOR specefic months




for(let i = 0; i < summedMonths.length; i++){
    for(let n = 0; n < array.length; n++ ){
        let selectedDate = array[n].date
        let refinedSelectedDate = new Date(selectedDate)

        let formattedSelectedDate = refinedSelectedDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        })

        if(summedMonths[i].date === formattedSelectedDate){
summedMonths[i].amount += parseInt(array[n].amount);
        }
    }
    console.log("Sum for that month (summedMonths):", summedMonths)
}



//TOTAL SUM FOR REALLY SPECIFIC DATES
     
    for (let i = 0; i < refinedDates.length; i++){
for(let n = 0; n < array.length; n++){
    if(refinedDates[i].date === array[n].date){
        refinedDates[i].amount = refinedDates[i].amount + array[n].amount
    }
}
    }

   
    }

    datesExtractions(array)
     console.log("this is refined dates:", refinedDates)

return summedMonths
 }

