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
            refinedCategory[i].amount = refinedCategory[i].amount + array[n].amount
        }
    }
}

return refinedCategory
}

 categoryProcessing(exEXP)



 export function dateProcessing(array)