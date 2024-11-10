// Declares global vars and arrays 
let currentBalance;
let transactionTypes = [];
let transactionCategories = [];
let transactionAmounts = [];
let transactionStores = [];
let transactionSources = [];
let transactionDates = [];
let filteredTypes = [];
let filteredCategories = [];
let filteredAmounts = [];
let filteredStores = [];
let filteredSources = [];
let filteredDates = [];

// Code to update localStorage to lists or update lists to localStorage
if (localStorage.getItem('transactionTypes') === null ||
    localStorage.getItem('transactionCategories') === null ||
    localStorage.getItem('transactionAmounts') === null ||
    localStorage.getItem('transactionStores') === null ||
    localStorage.getItem('transactionSources') === null ||
    localStorage.getItem('transactionDates') === null) {
        currentBalance = 0;
        updateStorageToData();
        updateDataToStorage();
}
else {
    updateDataToStorage();
}

document.getElementById('currentBalanceDisplay').textContent = currentBalance; // Displays currentBalance
updateTable(transactionTypes, transactionCategories, transactionAmounts, transactionStores, transactionSources, transactionDates); // Updates table

// Updates transaction lists to respective localStorage item
function updateDataToStorage(){
    transactionTypes = JSON.parse(localStorage.getItem('transactionTypes'));
    transactionCategories = JSON.parse(localStorage.getItem('transactionCategories'));
    transactionAmounts = JSON.parse(localStorage.getItem('transactionAmounts'));
    transactionStores = JSON.parse(localStorage.getItem('transactionStores'));
    transactionSources = JSON.parse(localStorage.getItem('transactionSources'));
    transactionDates = JSON.parse(localStorage.getItem('transactionDates'));
    currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
}

// Updates localStorage item to respective transaction list
function updateStorageToData(){
    localStorage.setItem('transactionTypes', JSON.stringify(transactionTypes));
    localStorage.setItem('transactionCategories', JSON.stringify(transactionCategories));
    localStorage.setItem('transactionAmounts', JSON.stringify(transactionAmounts));
    localStorage.setItem('transactionStores', JSON.stringify(transactionStores));
    localStorage.setItem('transactionSources', JSON.stringify(transactionSources));
    localStorage.setItem('transactionDates', JSON.stringify(transactionDates));
    localStorage.setItem('currentBalance', JSON.stringify(currentBalance));
}

// Function called when currentBalanceDisplay is hovered over to add a hover effect
document.getElementById('currentBalanceDisplay').onmouseover = function() {
   document.getElementById('dollarSign').style.color = '#47a84f';
   document.getElementById('dollarSign').style.transform = 'scale(1.15)';
   document.getElementById('currentBalanceDisplay').style.cursor = 'pointer';
   document.getElementById('currentBalanceDisplay').style.color = '#47a84f';
   document.getElementById('currentBalanceDisplay').style.transform = 'scale(1.15)';
}

// Removes hover effect for currentBalanceDisplay 
document.getElementById('currentBalanceDisplay').onmouseout = function() {
   document.getElementById('dollarSign').style.color = 'black';
   document.getElementById('dollarSign').style.transform = 'scale(1.00)';
   document.getElementById('currentBalanceDisplay').style.cursor = 'pointer';
   document.getElementById('currentBalanceDisplay').style.color = 'black';
   document.getElementById('currentBalanceDisplay').style.transform = 'scale(1.00)';
}

// Function called when dollarSign is hovered over to add a hover effect
document.getElementById('dollarSign').onmouseover = function() {
   document.getElementById('dollarSign').style.color = '#47a84f';
   document.getElementById('dollarSign').style.transform = 'scale(1.15)';
   document.getElementById('dollarSign').style.cursor = 'pointer';
   document.getElementById('currentBalanceDisplay').style.color = '#47a84f';
   document.getElementById('currentBalanceDisplay').style.transform = 'scale(1.15)';
}

// Removes hover effect for dollarSign
document.getElementById('dollarSign').onmouseout = function() {
   document.getElementById('dollarSign').style.color = 'black';
   document.getElementById('dollarSign').style.transform = 'scale(1.00)';
   document.getElementById('dollarSign').style.cursor = 'pointer';
   document.getElementById('currentBalanceDisplay').style.color = 'black';
   document.getElementById('currentBalanceDisplay').style.transform = 'scale(1.00)';
}

// When the searchButton is clicked, the inputs and hideSearchButton will show, and the searchButton will disappear
document.getElementById('searchButton').onclick = function() {
   document.getElementById('storeSearchLabel').style.display = 'inline';
   document.getElementById('storeSearchInput').style.display = 'inline';
   document.getElementById('hideSearchButton').style.display = 'inline';
   document.getElementById('searchButton').style.display = 'none';
}

// When the hideSearchButton is clicked, the inputs and hideSearchButton will disappear, and the searchButton will show
document.getElementById('hideSearchButton').onclick = function() {
   document.getElementById('storeSearchLabel').style.display = 'none';
   document.getElementById('storeSearchInput').style.display = 'none';
   document.getElementById('hideSearchButton').style.display = 'none';
   document.getElementById('searchButton').style.display = 'inline';
}

// Function to update table based on 6 parameters
function updateTable(types, categories, amounts, stores, sources, dates) {
    const table = document.getElementById('transactionsTable').querySelector('table'); // Selects table element
  
    // Clears existing table
    while (table.rows.length > 1) {
       table.deleteRow(1);
    }
  
    // Appends rows based on parameters, assuming they are arrays/lists
    for (let i = 0; i < types.length; i++) {
       const row = createTableRow(types[i], categories[i], amounts[i], stores[i], sources[i], dates[i], i);
       table.appendChild(row);
    }
}


function deleteTransaction(index) {
    // Updates currentBalance
    if (transactionTypes[index] === 'Withdrawal') {
       currentBalance += parseFloat(transactionAmounts[index]);
    } else if (transactionTypes[index] === 'Deposit') {
       currentBalance -= parseFloat(transactionAmounts[index]);
    }
    document.getElementById('currentBalanceDisplay').textContent = currentBalance; // Displays currentBalance

    // Deletes the array item at the index
    transactionTypes.splice(index, 1);
    transactionCategories.splice(index, 1);
    transactionAmounts.splice(index, 1);
    transactionStores.splice(index, 1);
    transactionSources.splice(index, 1);
    transactionDates.splice(index, 1);

    // Updates the localStorage to the lists
    updateStorageToData();

    // Updates table to display deleted
    updateTable(transactionTypes, transactionCategories, transactionAmounts, transactionStores, transactionSources, transactionDates);
}

// Function to create a table row
function createTableRow(type, category, amount, store, source, date, index) {
    const row = document.createElement('tr'); // Create new row
    const data = [type, category, amount, store, source, date]; // List of data

    // Iterates through list of data to create a row based on it
    data.forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        row.appendChild(cell);
    });

    const editButton = document.createElement('button'); // Creates edit button
    editButton.textContent = 'Edit';

    editButton.onclick = function() {
        // Hide and remove functionality from all edit buttons
        const allHideEditButtons = document.querySelectorAll('.hideEditButton');
        allHideEditButtons.forEach(button => {
            button.style.opacity = '.3';
            hideEditButton.style.pointerEvents = 'none';
        });

        editTransaction(index); // Edit transaction

        // Allow indexed hideEditButton to be functional
        hideEditButton.style.opacity = '1';
        hideEditButton.style.pointerEvents = 'auto';
    };

    // Creates a table data for the edit button
    const cellEdit = document.createElement('td'); 
    cellEdit.appendChild(editButton);
    row.appendChild(cellEdit);


    const deleteButton = document.createElement('button'); // Creates delete button
    deleteButton.textContent = 'Delete';

    // Deletes indexed transaction
    deleteButton.onclick = function() {
        deleteTransaction(index);
    };

    // Creates a table data for the delete button
    const cellDelete = document.createElement('td');
    cellDelete.appendChild(deleteButton);
    row.appendChild(cellDelete);

    const hideEditButton = document.createElement('button'); // Creates a hide edit button
    hideEditButton.textContent = 'Hide edit';

    // Hides and removes functionality from all hideEditButtons
    hideEditButton.style.opacity = '.3';
    hideEditButton.style.pointerEvents = 'none';

    // Hides inputs and hides and removes functionality from all hideEditButtons
    hideEditButton.onclick = function() {
        hideEdits(index); // Hides inputs

        const allHideEditButtons = document.querySelectorAll('.hideEditButton'); // Gets all hideEditButtons

        // Iterates through all hideEditButtons to hide and remove functioanlity
        allHideEditButtons.forEach(button => {
            button.style.opacity = '.3';
            hideEditButton.style.pointerEvents = 'none';
        });
    }

    // Creates a table data for the hideEdit button
    const cellHideEdit = document.createElement('td');
    cellHideEdit.appendChild(hideEditButton);
    row.appendChild(cellHideEdit);

    hideEditButton.classList.add('hideEditButton'); // Adds the class of 'hideEditButton' to hideEditButtons

    return row; // Returns the value of row to be added
}


function hideEdits(index) {
    // If transaction is a withdrawal, the hideEdit button will hide the withdrawal inputs
    if (transactionTypes[index] === 'Withdrawal') {
        document.getElementById("storeInput").style.display = 'none';
        document.getElementById("storeInputLabel").style.display = 'none';
        document.getElementById("categorySelect").style.display = 'none';
        document.getElementById("categorySelectLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawal").style.display = 'none';
        document.getElementById("recordWithdrawalButton").style.display = 'inline';
        document.getElementById("hideWithdrawalButton").style.display = 'none';
        document.getElementById("dateSelectWithdrawal").style.display = 'none';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'none';
        document.getElementById("submitWithdrawalButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';
        document.getElementById("submitEditButton").setAttribute('data-index', index);
        document.getElementById("storeInput").value = '';
        document.getElementById("categorySelect").value = 'Necessity';
        document.getElementById("amountInputWithdrawal").value = '';
        document.getElementById("dateSelectWithdrawal").value = '';
        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'none';
        }
    }

    // If transaction is a deposit, the hideEdit button will hide the deposit inputs
    if (transactionTypes[index] === 'Deposit') {
        document.getElementById("amountInputDepositLabel").style.display = 'none';
        document.getElementById("amountInputDeposit").style.display = 'none';
        document.getElementById("recordDepositButton").style.display = 'inline';
        document.getElementById("hideDepositButton").style.display = 'none';
        document.getElementById("dateSelectDeposit").style.display = 'none';
        document.getElementById("dateSelectDepositLabel").style.display = 'none';
        document.getElementById("sourceSelectLabel").style.display = 'none';
        document.getElementById("sourceSelect").style.display = 'none';
        document.getElementById("submitDepositButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';
        document.getElementById("submitEditButton").setAttribute('data-index', index);
        document.getElementById("sourceSelect").value = 'Work';
        document.getElementById("amountInputDeposit").value = '';
        document.getElementById("dateSelectDeposit").value = '';
        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'none';
        }
    }
}

function editTransaction(index) {
    if (transactionTypes[index] === 'Withdrawal') {
        // Update withdrawal inputs to transaction values
        document.getElementById("amountInputWithdrawal").value = transactionAmounts[index];
        document.getElementById("categorySelect").value = transactionCategories[index];
        document.getElementById("storeInput").value = transactionStores[index];
        document.getElementById("dateSelectWithdrawal").value = transactionDates[index];

        // Show withdrawal inputs for editing
        document.getElementById("storeInput").style.display = 'inline';
        document.getElementById("storeInputLabel").style.display = 'inline';
        document.getElementById("categorySelect").style.display = 'inline';
        document.getElementById("categorySelectLabel").style.display = 'inline';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'inline';
        document.getElementById("amountInputWithdrawal").style.display = 'inline';
        document.getElementById("recordWithdrawalButton").style.display = 'none';
        document.getElementById("hideWithdrawalButton").style.display = 'inline';
        document.getElementById("dateSelectWithdrawal").style.display = 'inline';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'inline';
        document.getElementById("submitWithdrawalButton").style.display = 'inline';
        document.getElementById("submitEditButton").style.display = 'inline';
        document.getElementById("submitEditButton").setAttribute('data-index', index);
        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'inline';
        }
    }

    if (transactionTypes[index] === 'Deposit') {
        // Update deposit inputs to transaction values
        document.getElementById("amountInputDeposit").value = transactionAmounts[index];
        document.getElementById("sourceSelect").value = transactionSources[index];
        document.getElementById("dateSelectDeposit").value = transactionDates[index];
        
        // Show deposit inputs for editing
        document.getElementById("amountInputDepositLabel").style.display = 'inline';
        document.getElementById("amountInputDeposit").style.display = 'inline';
        document.getElementById("recordDepositButton").style.display = 'none';
        document.getElementById("hideDepositButton").style.display = 'inline';
        document.getElementById("dateSelectDeposit").style.display = 'inline';
        document.getElementById("dateSelectDepositLabel").style.display = 'inline';
        document.getElementById("sourceSelectLabel").style.display = 'inline';
        document.getElementById("sourceSelect").style.display = 'inline';
        document.getElementById("submitDepositButton").style.display = 'inline';
        document.getElementById("submitEditButton").style.display = 'inline';
        document.getElementById("submitEditButton").setAttribute('data-index', index);
        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'inline';
        }
    }
}

document.getElementById("submitEditButton").onclick = function() {
    const index = this.getAttribute('data-index'); // Declares an index

    if (transactionTypes[index] === 'Withdrawal') {
        // Update transaction to withdrawal inputs
        transactionAmounts[index] = document.getElementById("amountInputWithdrawal").value;
        transactionCategories[index] = document.getElementById("categorySelect").value;
        transactionStores[index] = document.getElementById("storeInput").value;
        transactionDates[index] = document.getElementById("dateSelectWithdrawal").value;
    }

    if (transactionTypes[index] === 'Deposit') {
        // Update transaction to deposit inputs
        transactionAmounts[index] = document.getElementById("amountInputDeposit").value;
        transactionSources[index] = document.getElementById("sourceSelect").value;
        transactionDates[index] = document.getElementById("dateSelectDeposit").value;
    }

    // Update currentBalance
    currentBalance = 0 // Reset currentBalance
    // Iterate through transactionAmounts and add all values to generate updated currentBalance
    transactionAmounts.forEach((amount, i) => {
        if (transactionTypes[i] === 'Deposit') {
            currentBalance += parseFloat(amount);
        } else {
            currentBalance -= parseFloat(amount);
        }
    });

    document.getElementById('currentBalanceDisplay').textContent = currentBalance; // Display currentBalance
    document.getElementById('submitEditButton').style.display = 'none'; // Hide submitEdit button

    // Hide withdrawal inputs
    if (transactionTypes[index] === 'Withdrawal') {
        document.getElementById("storeInput").style.display = 'none';
        document.getElementById("storeInputLabel").style.display = 'none';
        document.getElementById("categorySelect").style.display = 'none';
        document.getElementById("categorySelectLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawal").style.display = 'none';
        document.getElementById("recordWithdrawalButton").style.display = 'inline';
        document.getElementById("hideWithdrawalButton").style.display = 'none';
        document.getElementById("dateSelectWithdrawal").style.display = 'none';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'none';
        document.getElementById("submitWithdrawalButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';
        document.getElementById("submitEditButton").setAttribute('data-index', index);

        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'none';
        }
    }

    // Hide deposit inputs
    if (transactionTypes[index] === 'Deposit') {
        document.getElementById("amountInputDepositLabel").style.display = 'none';
        document.getElementById("amountInputDeposit").style.display = 'none';
        document.getElementById("recordDepositButton").style.display = 'inline';
        document.getElementById("hideDepositButton").style.display = 'none';
        document.getElementById("dateSelectDeposit").style.display = 'none';
        document.getElementById("dateSelectDepositLabel").style.display = 'none';
        document.getElementById("sourceSelectLabel").style.display = 'none';
        document.getElementById("sourceSelect").style.display = 'none';
        document.getElementById("submitDepositButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';
        document.getElementById("submitEditButton").setAttribute('data-index', index);

        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'none';
        }
    }

    updateStorageToData(); // Update localStorage

    updateTable(transactionTypes, transactionCategories, transactionAmounts, transactionStores, transactionSources, transactionDates); // Update table
}

if (recordWithdrawalButton !== null){
    // Show withdrawal inputs
    document.getElementById("recordWithdrawalButton").onclick = function(){
        document.getElementById("storeInput").style.display = 'inline';
        document.getElementById("storeInputLabel").style.display = 'inline';
        document.getElementById("categorySelect").style.display = 'inline';
        document.getElementById("categorySelectLabel").style.display = 'inline';
        document.getElementById("amountInputWithdrawal").style.display = 'inline';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'inline';
        document.getElementById("dateSelectWithdrawal").style.display = 'inline';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'inline';
        document.getElementById("submitWithdrawalButton").style.display = 'inline';

        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'inline';
        }

        document.getElementById("recordWithdrawalButton").style.display = 'none';
        document.getElementById("hideWithdrawalButton").style.display = 'inline';
    }
}

if (hideWithdrawalButton !== null){
    // Hide withdrawal inputs
    document.getElementById("hideWithdrawalButton").onclick = function(){
        document.getElementById("storeInput").style.display = 'none';
        document.getElementById("storeInputLabel").style.display = 'none';
        document.getElementById("categorySelect").style.display = 'none';
        document.getElementById("categorySelectLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawal").style.display = 'none';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'none';
        document.getElementById("dateSelectWithdrawal").style.display = 'none';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'none';
        document.getElementById("submitWithdrawalButton").style.display = 'none';
        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'none';
        }
        document.getElementById("recordWithdrawalButton").style.display = 'inline';
        document.getElementById("hideWithdrawalButton").style.display = 'none';
    }
}

if (recordDepositButton !== null){
    // Show deposit inputs
    document.getElementById("recordDepositButton").onclick = function(){
        document.getElementById("amountInputDepositLabel").style.display = 'inline';
        document.getElementById("amountInputDeposit").style.display = 'inline';
        document.getElementById("sourceSelectLabel").style.display = 'inline'
        document.getElementById("sourceSelect").style.display = 'inline'
        document.getElementById("dateSelectDeposit").style.display = 'inline'
        document.getElementById("dateSelectDepositLabel").style.display = 'inline'
        document.getElementById("submitDepositButton").style.display = 'inline';
        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'inline';
        }
        document.getElementById("recordDepositButton").style.display = 'none';
        document.getElementById("hideDepositButton").style.display = 'inline';
    }
}


if (hideDepositButton !== null){
    // Hide deposit inputs
    document.getElementById("hideDepositButton").onclick = function(){
        document.getElementById("amountInputDepositLabel").style.display = 'none';
        document.getElementById("amountInputDeposit").style.display = 'none';
        document.getElementById("sourceSelectLabel").style.display = 'none'
        document.getElementById("sourceSelect").style.display = 'none'
        document.getElementById("dateSelectDeposit").style.display = 'none'
        document.getElementById("dateSelectDepositLabel").style.display = 'none'
        document.getElementById("submitDepositButton").style.display = 'none';


        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'none';
        }
        document.getElementById("recordDepositButton").style.display = 'inline';
        document.getElementById("hideDepositButton").style.display = 'none';
    }
}

document.getElementById("submitWithdrawalButton").onclick = function(){
    if (document.getElementById("amountInputWithdrawal").value != "" && document.getElementById("storeInput").value != "" && document.getElementById("dateSelectWithdrawal").value != ""){
        // Update lists, currentBalance, localStorage, and table
        transactionTypes.push("Withdrawal");
        transactionAmounts.push(document.getElementById("amountInputWithdrawal").value);
        transactionCategories.push(document.getElementById("categorySelect").value);
        transactionStores.push(document.getElementById("storeInput").value);
        transactionSources.push("N/A");
        transactionDates.push(document.getElementById("dateSelectWithdrawal").value);
        currentBalance -= parseFloat(document.getElementById("amountInputWithdrawal").value);
        updateStorageToData();
        updateTable(transactionTypes, transactionCategories, transactionAmounts, transactionStores, transactionSources, transactionDates);

        // Reset withdrawal input values
        document.getElementById("storeInput").value = '';
        document.getElementById("categorySelect").value = 'Necessity';
        document.getElementById("amountInputWithdrawal").value = '';
        document.getElementById("dateSelectWithdrawal").value = '';

        document.getElementById('currentBalanceDisplay').textContent = currentBalance; // Display currentBalance

        // Hide withdrawal inputs
        document.getElementById("storeInput").style.display = 'none';
        document.getElementById("storeInputLabel").style.display = 'none';
        document.getElementById("categorySelect").style.display = 'none';
        document.getElementById("categorySelectLabel").style.display = 'none';
        document.getElementById("amountInputWithdrawal").style.display = 'none';
        document.getElementById("amountInputWithdrawalLabel").style.display = 'none';
        document.getElementById("recordWithdrawalButton").style.display = 'inline';
        document.getElementById("hideWithdrawalButton").style.display = 'none';
        document.getElementById("dateSelectWithdrawal").style.display = 'none';
        document.getElementById("dateSelectWithdrawalLabel").style.display = 'none';
        document.getElementById("submitWithdrawalButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';

        // Hide email output messages
        document.getElementById('emailNoDataMessage').style.display = 'none';
        document.getElementById('emailSuccessMessage').style.display = 'none';
        document.getElementById('emailErrorMessage').style.display = 'none';

        // Hide withdrawal inputs
        const withdrawalInfoElements = document.getElementsByClassName("withdrawalInfo");
        for (let i = 0; i < withdrawalInfoElements.length; i++) {
            withdrawalInfoElements[i].style.display = 'none';
        }
    }
}


document.getElementById("submitDepositButton").onclick = function(){
    if (document.getElementById("amountInputDeposit").value != "" && document.getElementById("dateSelectDeposit").value != ""){
        transactionTypes.push("Deposit");
        // Update lists, currentBalance, localStorage, and table
        transactionAmounts.push(document.getElementById("amountInputDeposit").value);
        transactionCategories.push("N/A");
        transactionStores.push("N/A");
        transactionSources.push(document.getElementById("sourceSelect").value);
        transactionDates.push(document.getElementById("dateSelectDeposit").value);
        currentBalance += parseFloat(document.getElementById("amountInputDeposit").value);
        updateStorageToData();
        updateTable(transactionTypes, transactionCategories, transactionAmounts, transactionStores, transactionSources, transactionDates);

        // Reset deposit inputs
        document.getElementById("sourceSelect").value =  'Work';
        document.getElementById("amountInputDeposit").value = '';
        document.getElementById("dateSelectDeposit").value = '';

        // Hide deposit inputs
        document.getElementById('currentBalanceDisplay').textContent = currentBalance;
        document.getElementById("amountInputDepositLabel").style.display = 'none';
        document.getElementById("amountInputDeposit").style.display = 'none';
        document.getElementById("recordDepositButton").style.display = 'inline';
        document.getElementById("hideDepositButton").style.display = 'none';
        document.getElementById("sourceSelectLabel").style.display = 'none'
        document.getElementById("sourceSelect").style.display = 'none'
        document.getElementById("dateSelectDeposit").style.display = 'none'
        document.getElementById("dateSelectDepositLabel").style.display = 'none'
        document.getElementById("submitDepositButton").style.display = 'none';
        document.getElementById("submitEditButton").style.display = 'none';

        // Hide email messages
        document.getElementById('emailNoDataMessage').style.display = 'none';
        document.getElementById('emailSuccessMessage').style.display = 'none';
        document.getElementById('emailErrorMessage').style.display = 'none';

        // Hide deposit inputs
        const depositInfoElements = document.getElementsByClassName("depositInfo");
        for (let i = 0; i < depositInfoElements.length; i++) {
            depositInfoElements[i].style.display = 'none';
        }
    }
}

document.getElementById("storeSearchInput").onchange = function() {
    const searchTerm = document.getElementById("storeSearchInput").value.toLowerCase().trim(); // Gets value of storeSearchInput
    
    // Declares empty lists for filtering 
    let filteredTypes = [];
    let filteredCategories = [];
    let filteredAmounts = [];
    let filteredStores = [];
    let filteredSources = [];
    let filteredDates = [];

    // Iterates through transactionStores, and if contains searchTerm will add the necessary list elements to the filter lists
    for (let i = 0; i < transactionTypes.length; i++) {
        if (transactionTypes[i] === "Withdrawal" && transactionStores[i].toLowerCase().includes(searchTerm)) {
            filteredTypes.push(transactionTypes[i]);
            filteredCategories.push(transactionCategories[i]);
            filteredAmounts.push(transactionAmounts[i]);
            filteredStores.push(transactionStores[i]);
            filteredSources.push(transactionSources[i]);
            filteredDates.push(transactionDates[i]);
        }
    }

    // If search term is empty, reset all values and show default table
    if (searchTerm === '') {
        filteredTypes = [];
        filteredCategories = [];
        filteredAmounts = [];
        filteredStores = [];
        filteredSources = [];
        filteredDates = [];

        transactionTypes.forEach((item, i) => {
        filteredTypes.push(item);
        filteredCategories.push(transactionCategories[i]);
        filteredAmounts.push(transactionAmounts[i]);
        filteredStores.push(transactionStores[i]);
        filteredSources.push(transactionSources[i]);
        filteredDates.push(transactionDates[i]);
        });
    }

    updateTable(filteredTypes, filteredCategories, filteredAmounts, filteredStores, filteredSources, filteredDates); // Update table to filter lists
}

document.getElementById("applyFilterButton").onclick = function() {
    // Sets constants to filter inputs
    const typeFilter = document.getElementById("transactionTypeSelect").value;
    const dateFilter = document.getElementById("filterDateInput").value;
    const amountFilter = document.getElementById("filterAmountInput").value;
    const categoryFilter = document.getElementById("filterCategorySelect").value;
    const sourceFilter = document.getElementById("filterSourceSelect").value;

    // Declares empty lists for filtering
    filteredTypes = [];
    filteredCategories = [];
    filteredAmounts = [];
    filteredStores = [];
    filteredSources = [];
    filteredDates = [];

    for (let i = 0; i < transactionTypes.length; i++) {
        // Sets boolean constants to see if filter matches transactiond ata
        const matchesType = (typeFilter === "All" || transactionTypes[i] === typeFilter);
        const matchesDate = (!dateFilter || transactionDates[i] === dateFilter);
        const matchesAmount = (!amountFilter || transactionAmounts[i] == amountFilter);
        const matchesCategory = (categoryFilter === "All" || transactionCategories[i] === categoryFilter);
        const matchesSource = (sourceFilter === "All" || transactionSources[i] === sourceFilter);

        // If all constants are true, append the necessary elements to the filter lists
        if (matchesType && matchesDate && matchesAmount && matchesCategory && matchesSource) {
            filteredTypes.push(transactionTypes[i]);
            filteredCategories.push(transactionCategories[i]);
            filteredAmounts.push(transactionAmounts[i]);
            filteredStores.push(transactionStores[i]);
            filteredSources.push(transactionSources[i]);
            filteredDates.push(transactionDates[i]);
        }
    }

    updateTable(filteredTypes, filteredCategories, filteredAmounts, filteredStores, filteredSources, filteredDates); // Update table to filter lists
}

document.getElementById("clearFilterButton").onclick = function(){
    // Sets filter inputs to default values
    document.getElementById("transactionTypeSelect").value = "All";
    document.getElementById("filterDateInput").value = "";
    document.getElementById("filterAmountInput").value = "";
    document.getElementById("filterCategorySelect").value = "All";
    document.getElementById("filterSourceSelect").value = "All";

    // Copies transaction lists to filter lists
    filteredTypes = transactionTypes.slice();
    filteredCategories = transactionCategories.slice();
    filteredAmounts = transactionAmounts.slice();
    filteredStores = transactionStores.slice();
    filteredSources = transactionSources.slice();
    filteredDates = transactionDates.slice();

    updateTable(filteredTypes, filteredCategories, filteredAmounts, filteredStores, filteredSources, filteredDates) // Updates table to filter lists
}

document.getElementById("generateMonthSummaryButton").onclick = function() {
    // Shows hide summary button
    document.getElementById('hideSummaryButton').style.display = 'inline'; 
    const hideSummaryElements = document.getElementsByClassName("hideSummary");
    for (let i = 0; i < hideSummaryElements.length; i++) {
                hideSummaryElements[i].style.display = 'inline';
    } 
    
    // Gets current month and current year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Declares variables and container for summary
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let depositCount = 0;
    let withdrawalCount = 0;
    let dailyExpenses = {};

    for (let i = 0; i < transactionDates.length; i++) {
        const transactionDate = new Date(transactionDates[i]);
        if (!isNaN(transactionDate)) {
            // Checks if the transaction date is within the current month and year
            if ((transactionDate.getMonth() === currentMonth || transactionDate.getDate() === 31) && transactionDate.getFullYear() === currentYear) {
                const amount = parseFloat(transactionAmounts[i]); // Get transaction amount
                
                if (transactionTypes[i] === "Deposit") {
                    totalDeposits += amount; // Total deposit amounts
                    depositCount++;
                } else if (transactionTypes[i] === "Withdrawal") {
                    totalWithdrawals += amount; // Total withdrawal amounts
                    withdrawalCount++;

                    const dateKey = transactionDate.toISOString().split('T')[0]; // Gets the transaction date
                    dailyExpenses[dateKey] = (dailyExpenses[dateKey] || 0) + amount; // Add amounts to container
                }
            }
        }
    }

    const netBalance = totalDeposits - totalWithdrawals; // Gets netBalance based on totalDeposits and totalWithdrawals
    
    // Calculates means if there are deposits and withdrawals to 2 decimal places
    const meanDeposit = depositCount > 0 ? (totalDeposits / depositCount).toFixed(2) : 0;
    const meanWithdrawal = withdrawalCount > 0 ? (totalWithdrawals / withdrawalCount).toFixed(2) : 0;

    // Declares variables to generate summary about the max expense
    let maxExpenseDay = '';
    let maxExpenseAmount = 0;

    // Iterates through withdrawals container and determines the largest amount of money spent
    for (const [date, amount] of Object.entries(dailyExpenses)) {
        if (amount > maxExpenseAmount) {
            maxExpenseAmount = amount;
            maxExpenseDay = date;
        }
    }

    // Updates text to variables
    const summaryDisplay = document.getElementById('summaryDisplay');
    summaryDisplay.innerHTML =
        `<br>` +
        `Month Summary: <br><br>` +
        `Total Deposits: $${totalDeposits.toFixed(2)}<br><br>` +
        `Total Withdrawals: $${totalWithdrawals.toFixed(2)}<br><br>` +
        `Net Balance: $${netBalance.toFixed(2)}<br><br>` +
        `Mean Deposit Amount: $${meanDeposit}<br><br>` +
        `Mean Withdrawal Amount: $${meanWithdrawal}<br><br>` +
        `Most Money Spent On: ${maxExpenseDay} ($${maxExpenseAmount.toFixed(2)})`;
};

document.getElementById("generateWeekSummaryButton").onclick = function() {
    document.getElementById('hideSummaryButton').style.display = 'inline'; // Shows hide summary button
    
    // Gets starting weekday date and ending weekday date
    const now = new Date();
    const currentWeekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const currentWeekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    
    // Declares variables and container for summary
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let depositCount = 0;
    let withdrawalCount = 0;
    let dailyExpenses = {};

    for (let i = 0; i < transactionDates.length; i++) {
        const transactionDate = new Date(transactionDates[i]);
        if (!isNaN(transactionDate)) {
            // Checks if the transaction date is between the starting weekday and ending weekday
            if (transactionDate >= currentWeekStart && transactionDate <= currentWeekEnd) {
                const amount = parseFloat(transactionAmounts[i]); // Gets transaction amount

                if (transactionTypes[i] === "Deposit") {
                    totalDeposits += amount; // Total deposit amounts
                    depositCount++;
                } else if (transactionTypes[i] === "Withdrawal") {
                    totalWithdrawals += amount; // Total withdrawal amounts
                    withdrawalCount++;

                    const dateKey = transactionDate.toISOString().split('T')[0]; // Gets the transaction date
                    dailyExpenses[dateKey] = (dailyExpenses[dateKey] || 0) + amount; // Add amounts to container
                }
            }
        }
    }

    const netBalance = totalDeposits - totalWithdrawals; // Gets netBalance based on totalDeposits and totalWithdrawals
    
    // Calculates means if there are deposits and withdrawals to 2 decimals
    const meanDeposit = depositCount > 0 ? (totalDeposits / depositCount).toFixed(2) : 0;
    const meanWithdrawal = withdrawalCount > 0 ? (totalWithdrawals / withdrawalCount).toFixed(2) : 0;

    // Declares variable to generate summary about max expense
    let maxExpenseDay = '';
    let maxExpenseAmount = 0;

    // Iterates through withdrawals container and determines the largest amount of money spent
    for (const [date, amount] of Object.entries(dailyExpenses)) {
        if (amount > maxExpenseAmount) {
            maxExpenseAmount = amount;
            maxExpenseDay = date;
        }
    }

    // Updates text to variables
    const summaryDisplay = document.getElementById('summaryDisplay');
    summaryDisplay.innerHTML =
        `<br>` +
        `Week Summary: <br><br>` +
        `Total Deposits: $${totalDeposits.toFixed(2)}<br><br>` +
        `Total Withdrawals: $${totalWithdrawals.toFixed(2)}<br><br>` +
        `Net Balance: $${netBalance.toFixed(2)}<br><br>` +
        `Mean Deposit Amount: $${meanDeposit}<br><br>` +
        `Mean Withdrawal Amount: $${meanWithdrawal}<br><br>` +
        `Most Money Spent On: ${maxExpenseDay} ($${maxExpenseAmount.toFixed(2)})`;
};


document.getElementById("hideSummaryButton").onclick = function() {
    document.getElementById("hideSummaryButton").style.display = 'none'; // Hides hideSummary button
    document.getElementById('summaryDisplay').innerHTML = ''; // Sets text blank
    const hideSummaryElements = document.getElementsByClassName("hideSummary");
       for (let i = 0; i < hideSummaryElements.length; i++) {
            hideSummaryElements[i].style.display = 'none';
       } 
}

document.getElementById("filterButton").onclick = function() {
    // Show filter inputs
    const filterInfoElements = document.getElementsByClassName("filterInfo");
    for (let i = 0; i < filterInfoElements.length; i++) {
        filterInfoElements[i].style.display = 'block';
    }
    document.getElementById("hideFilterButton").style.display = 'block';
    document.getElementById("filterButton").style.display = 'none';
}

document.getElementById("hideFilterButton").onclick = function() {
    // Hide filter inputs
    const filterInfoElements = document.getElementsByClassName("filterInfo");
    for (let i = 0; i < filterInfoElements.length; i++) {
        filterInfoElements[i].style.display = 'none';
    }
    document.getElementById("hideFilterButton").style.display = 'none';
    document.getElementById("filterButton").style.display = 'block';
  
}