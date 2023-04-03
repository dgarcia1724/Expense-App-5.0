// Budget
const redTextBudget = document.querySelector(".budgetBox > p");
redTextBudget.style.visibility = "hidden";
const inputBudget = document.querySelector(".budgetBox > input");
const btnBudget = document.querySelector(".budgetBox > button");

// Expenses
const redTextExpenses = document.querySelector(".expensesBox > p");
redTextExpenses.style.visibility = "hidden";
const inputTitle = document.querySelector(".inputTitle");
const inputCost = document.querySelector(".inputCost");
const btnExpenses = document.querySelector(".expensesBox > button");

// Columns
const columnTotalBudget = document.querySelector(".columnTotalBudget > span");
const columnExpenses = document.querySelector(".columnExpenses > span");
const columnBalance = document.querySelector(".columnBalance > span");

// Expense List
const expenseListItems = document.querySelector(".expenseListItems");

// Variables
let currentBudget = 0;
let currentExpenses = 0;
let currentBalance = 0;

// UPDATE COLUMNS Function
const updateColumns = function () {
  currentBalance = currentBudget - currentExpenses;

  columnTotalBudget.innerHTML = currentBudget;
  columnExpenses.innerHTML = currentExpenses;
  columnBalance.innerHTML = currentBalance;
};

btnBudget.addEventListener("click", function () {
  if (inputBudget.value >= 0 && inputBudget.value != "") {
    redTextBudget.style.visibility = "hidden";

    // update Columns
    currentBudget = Number(inputBudget.value);
    updateColumns();
  } else {
    redTextBudget.style.visibility = "visible";
  }
});

btnExpenses.addEventListener("click", function () {
  if (inputTitle.value != "" && inputCost.value != "") {
    redTextExpenses.style.visibility = "hidden";

    // update Columns
    currentExpenses += Number(inputCost.value);
    updateColumns();
    // Store Values
    const valueInputTitle = inputTitle.value;
    const valueInputCost = inputCost.value;
    // Add to Expense List
    expenseListItems.innerHTML += `
      <div class='item'>
        <span class='itemTitle'>${valueInputTitle}</span>
        <span class='itemCost'>${valueInputCost}</span>
        <button class='itemEdit'>EDIT</button>
        <button class='itemUpdate'>UPDATE</button>
        <button class='itemDelete'>X</button>
      </div>
    `;
    const item = document.querySelectorAll(".item");

    // DELETE BUTTON
    for (let i = 0; i < item.length; i++) {
      const currentBtnDelete = item[i].querySelector(".itemDelete");
      currentBtnDelete.addEventListener("click", function () {
        // update Columns
        currentExpenses -= Number(item[i].querySelector(".itemCost").innerHTML);
        updateColumns();
        // Delete Individual
        item[i].remove();
      });
    }
    // EDIT BUTTON
    for (let i = 0; i < item.length; i++) {
      const currentEditBtn = item[i].querySelector(".itemEdit");
      currentEditBtn.addEventListener("click", function () {
        const itemTitleValue = item[i].querySelector(".itemTitle").innerHTML;
        const itemCostValue = item[i].querySelector(".itemCost").innerHTML;

        // update Columns
        currentExpenses -= Number(itemCostValue);
        updateColumns();

        // Title
        item[i].querySelector(
          ".itemTitle"
        ).innerHTML = `<input class='itemTitleInput' type='text'>`;
        item[i].querySelector(".itemTitleInput").value = itemTitleValue;
        // Cost
        item[i].querySelector(
          ".itemCost"
        ).innerHTML = `<input class='itemCostInput' type='number'>`;
        item[i].querySelector(".itemCostInput").value = 0;

        // Button Swap
        item[i].querySelector(".itemEdit").style.display = "none";
        item[i].querySelector(".itemUpdate").style.display = "block";

        // Disable Btn Disabled
        item[i].querySelector(".itemDelete").disabled = true;

        // ******* UPDATE BUTTON CLICKED *******
        item[i]
          .querySelector(".itemUpdate")
          .addEventListener("click", function () {
            // Title
            item[i].querySelector(".itemTitle").innerHTML =
              item[i].querySelector(".itemTitleInput").value;
            // Cost
            item[i].querySelector(".itemCost").innerHTML =
              item[i].querySelector(".itemCostInput").value;
            // update Columns
            currentExpenses += Number(
              item[i].querySelector(".itemCost").innerHTML
            );
            updateColumns();

            // Button Swap
            item[i].querySelector(".itemEdit").style.display = "block";
            item[i].querySelector(".itemUpdate").style.display = "none";

            // Disable Btn Enabled
            item[i].querySelector(".itemDelete").disabled = false;
          });
      });
    }
  } else {
    redTextExpenses.style.visibility = "visible";
  }
});
