// IDs of the three methods of payment buttons
let formIDs = ['visa-card__form', 'master-card__form', 'paypal__form'];
let priceTotal = parseFloat(document.getElementById("total").innerText);

//  Toggle betyween forms
function toggleForm(form){
    let getForm = document.getElementById(form);
    if(getForm){
        getForm.classList.add('show-form');

        let removeForms = formIDs.filter(x => x != form);
        
        //  Hide non selected forms
        for(var i = 0; i<removeForms.length; i++){
            let formToRemove = document.getElementById(removeForms[i]);
            if(formToRemove.classList.contains('show-form')){
                formToRemove.classList.remove('show-form');
            }
        }
    }
}


// credit card validation

// code gotten from stackoverflow - https://stackoverflow.com/questions/6176802/how-to-validate-a-credit-card-number

function validateCardNumber(no) {
    return (
        (no &&
        luhnCheck(no) &&
        no.length == 16 &&
        (no[0] == 4 ||
            (no[0] == 5 && no[1] >= 1 && no[1] <= 5) ||
            no.indexOf('6011') == 0 ||
            no.indexOf('65') == 0)) ||
        (no.length == 15 && (no.indexOf('34') == 0 || no.indexOf('37') == 0)) ||
        (no.length == 13 && no[0] == 4)
    );
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
        intVal *= 2;
        if (intVal > 9) {
            intVal = 1 + (intVal % 10);
        }
        }
        sum += intVal;
    }
    return sum % 10 == 0;
}

  function getTag(id){
    return document.getElementById(id);
  }

  function getTagValue(id){
      if(getTag(id)){
          return getTag(id).value;
      }
  }

var getForm = getTag('devugo-form');

getForm.addEventListener('submit', function(e){
    e.preventDefault();
    // alert('got here');
})

// This is to prevent any input that is not a number 
// from being inputed to the form
const cardNumberKey = ((evt)=>{
    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
        return false; 
    return true; 
})

// This is to add hyphen for the card number
function addHyphen (element) {
    let ele = document.getElementById(element.id);
    ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.

    let finalVal = ele.match(/.{1,4}/g).join('-');
    document.getElementById(element.id).value = finalVal;
}
const handleSummary = (e) =>{
    // Get the number of months and 
    // update the price summary

    let {value} = e.target;
    value = parseFloat(value);
    document.getElementById("total").innerText = (priceTotal * value);


}
const handleSubmit = ()=>{
    // Summary of all the data to be returned for payment
    const noOfMonths = document.getElementById("numMonths").value;
    const cardNum = document.getElementById("card-number").value;
    const expMonth = document.getElementById("expiration-date__month").value;
    const expYear = document.getElementById("expiration-date__year").value;
    const cvv = document.getElementById("cvv").value;
    const priceTotal = document.getElementById("total").innerText;
    console.log(noOfMonths, cardNum, expMonth, expYear, cvv, priceTotal)
}