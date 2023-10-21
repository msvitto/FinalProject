const myInput = document.querySelector(".wrapper__input");
const myBtn = document.querySelector(".wrapper__btn");
const myUsualList = document.querySelector(".usualList");
const myImportantList = document.querySelector(".importantList");
const myDoneList = document.querySelector(".doneList");
const myBtnDelete = document.querySelector(".wrapper__btn-delete");
const myBtnsImportant = document.querySelector(".wrapper__btns-important");
const myBtnsDone = document.querySelector(".wrapper__btns-done");
const categorySelect = document.querySelector(".wrapper__category-select");
myBtn.addEventListener("click", function () {
    const selectedCategory = categorySelect.value; 
    createListItem(selectedCategory, myInput.value); 
    myInput.value = "";
});
myBtn.addEventListener("click", function () {
    createListItem(myUsualList, myInput.value);
    myInput.value = "";
});
myBtnDelete.addEventListener("click", function () {
    deleteCheckedItems(myUsualList);
    deleteCheckedItems(myImportantList);
    deleteCheckedItems(myDoneList);
    enableTaskEditing(listItem);
});
function deleteCheckedItems(list) {
    const checkboxes = list.querySelectorAll(`input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const listItem = checkbox.parentElement;
            list.removeChild(listItem);
        }
    });
}
myBtnsImportant.addEventListener("click", function () {
    moveCheckedItems(myUsualList, myImportantList);
});
myBtnsDone.addEventListener("click", function () {
    moveCheckedItems(myUsualList, myDoneList);
    moveCheckedItems(myImportantList, myDoneList);
});
function createCategoryDropdown(listItem) {
    const categoryDropdown = document.createElement('select');
    const categories = ['Work', 'Study', 'Personal', 'Shopping', 'Other']; 
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
    categoryDropdown.addEventListener('change', function () {
        listItem.dataset.category = categoryDropdown.value;
    });
    listItem.appendChild(categoryDropdown);
}
function createListItem(targetList, text, category) {
    const selectedCategory = categorySelect.value;
    const listItem = document.createElement("li");
    listItem.classList.add(selectedCategory); 
    const myCheckBox = document.createElement('input');
    myCheckBox.type = 'checkbox';
    listItem.appendChild(myCheckBox);
    const taskText = document.createElement("span");
    taskText.textContent = text;
    listItem.appendChild(taskText);
    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('due-date-input');
    dueDateInput.type = 'datetime-local'; 
    dueDateInput.placeholder = 'Due Date';
    listItem.appendChild(dueDateInput);
    targetList.appendChild(listItem);
    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.style.color = "rgb(143, 140, 140)";
    listItem.appendChild(editButton);
    editButton.addEventListener("click", function () {
        const newText = prompt("Введіть новий текст завдання:", taskText.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskText.textContent = newText;
        }
    });
}
function createCheckBox(listItem) {
    const myCheckBox = document.createElement('input');
    myCheckBox.type = 'checkbox';
    listItem.appendChild(myCheckBox);
    myCheckBox.addEventListener("click", function (event) {
        event.stopPropagation();
        if (myCheckBox.checked) {
            listItem.classList.add('checked');
        } else {
            listItem.classList.remove('checked');
        }
    });
    createDueDateInput(listItem);
}
function moveCheckedItems(sourceList, targetList) {
    const checkboxes = sourceList.querySelectorAll(`input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const listItem = checkbox.parentElement;
            sourceList.removeChild(listItem);
            targetList.appendChild(listItem);
            checkbox.checked = false;
        }
    });
}
function createDueDateInput(listItem) {
    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('due-date-input');
    dueDateInput.type = 'datetime-local'; 
    dueDateInput.placeholder = 'Due Date';
    listItem.appendChild(dueDateInput);
}
function checkDueDates() {
    const now = new Date();
    const dueDateInputs = document.querySelectorAll('.due-date-input');
    dueDateInputs.forEach(dueDateInput => {
        if (!dueDateInput.value) {
            return;
        }
        const dueDateTime = new Date(dueDateInput.value);
        const timeDiff = dueDateTime - now;
        const hoursBeforeDue = 1; 
        if (!dueDateInput.parentElement.classList.contains('checked') && timeDiff > 0 && timeDiff <= hoursBeforeDue * 60 * 60 * 1000) {
            const taskDescription = dueDateInput.parentElement.querySelector('span').textContent;
            alert(`Reminder: The deadline for the assignment "${taskDescription}" is approaching`);
        }
    });
}
setInterval(checkDueDates, 60000);
