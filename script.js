
// Variables used by script.
// We need references to the textarea, the button and the div to place the results in
var inputFormContainer = document.querySelector('.input-form'),
    userInput = document.getElementById('user-input'),
    saveButton = document.getElementById('btn'),
    resultEl = document.getElementById('saved-text'),
    resultElContent,
    output = document.querySelector('.output'),
    statusMsg = document.createElement('p'),
    edit = document.getElementById('edit'),
    formNode = document.createElement('form'),
    editBox = document.createElement('textarea'),
    saveEdit = document.createElement('button'),
    editTextContent,
    trimmedEditTextContent,
    removeText;

// render stored notes
resultEl.innerHTML = localStorage.getItem("toDoList");

function storeLocally (){
    resultElContent = resultEl.innerHTML;
    localStorage.setItem("toDoList", resultElContent);
}


var totalItemsHtml = '<p>Total: <span id="total-items">0</span></p>';
inputFormContainer.insertAdjacentHTML('beforeEnd' , totalItemsHtml);

var totalItemsNumber =  document.getElementById('total-items');

function totalItems (){
    // space = child none so minus 1
    var totalItems = resultEl.childNodes.length -1;
    totalItemsNumber.textContent = totalItems;

}
totalItems ();


// Helper function to help keep code clean...
// All it does is make a button element, which we then add to each of the p 
// elements we add to the page
function makeMasterDeleteButton() {
    var btn = document.createElement('a');
    btn.innerHTML = '<span class="edit">Edit</span> X';
    btn.classList.add('item-delete'); // give button the class "item-delete"
    btn.setAttribute('href', '#');
    return btn;
}


// Make sure we have valid elements to work with
if (userInput !== null && saveButton !== null && resultEl !== null) {

    // Listen for clicks on form button
    saveButton.addEventListener('click', function (event) {

        var newNode, // Element we will create
            itemDeleteButton, // Delete button for element
            submitted = userInput.value; // Text from form field

        // Check if user entered something
        if (submitted !== '') {

            // Make a p element and add the submitted text to it
            newNode = document.createElement('p');
            newNode.textContent = submitted;

            // Make a delete button element and append it to p element
            itemDeleteButton = makeMasterDeleteButton();
            newNode.insertAdjacentElement('afterbegin', itemDeleteButton);

            // Status Message after fired before added
            output.insertAdjacentElement('beforeEnd',statusMsg);
            statusMsg.textContent = 'List item added';


            // add the p element to the page
            resultEl.appendChild(newNode);

            // Erase user's text from the textarea
            userInput.value = '';


            window.setTimeout( function(){
                statusMsg.remove();
            } , 1000);


        }

        // Stop the browser's default behaviour. By default, when a "button" within a "form"
        // element is clicked, the form gets submitted, resulting in a page reload (which we don't want)
        event.preventDefault();

        //add to local storage
        storeLocally ();
        //reset total
        totalItems ();

    });

    // Add event listener for item deletions here... // you can use the same event for edit as well.
    document.addEventListener('click', outputContainer);


}

// Remove and edit function
function outputContainer(event){
    event.preventDefault();
    event.stopPropagation();

    //Delete item
    if(event.target.classList.contains('item-delete')){

        // Status Message after fired before removed
        output.insertAdjacentElement('beforeEnd',statusMsg);
        statusMsg.textContent = 'List item removed';

        resultEl.removeChild(event.target.parentNode);

        // remove edit box if no notes - 1 node = white space
        //if(resultEl.childNodes.length == 1){
        //to fix bug, just delete whole edit box if list item removed
            editBox.remove();
            saveEdit.remove();
        //}

        storeLocally ();
        totalItems ();

        window.setTimeout( function(){
            statusMsg.remove();
        } , 1000);

    }

    else if(event.target.classList.contains('edit')){

        //Get parent of parent
        editTextContent = event.target.parentNode.parentNode;

        //Text to remove
        removeText = 'Edit X';
        trimmedEditTextContent = editTextContent.textContent.replace(removeText , '');

        formNode.id = "edit-form";
        output.insertAdjacentElement('beforeEnd',formNode);

        formNode.insertAdjacentElement('beforeEnd',editBox);
        editBox.id = 'edit-box';
        output.insertAdjacentElement('beforeEnd',saveEdit);
        saveEdit.textContent = 'Save edit';
        saveEdit.id = 'save-edit';
        editBox.textContent= '';
        editBox.textContent = trimmedEditTextContent;

        //Save edit function
        saveEdit.addEventListener('click' , saveEditFunction);

        function saveEditFunction (){
            event.preventDefault();
            event.stopPropagation();

            //remove edit box
            editBox.remove();
            saveEdit.remove();

            // Status Message after edited
            output.insertAdjacentElement('beforeEnd',statusMsg);
            statusMsg.textContent = 'List item edited';

            window.setTimeout( function(){
                statusMsg.remove();
            } , 1000);

            function returnVal (){
                event.target.parentNode.parentNode.innerHTML =  '<a class="item-delete" href="#"><span class="edit">Edit</span> X</a>' + editBox.value;
                storeLocally ();
                totalItems ();
            }
            return returnVal ();
        }
    }
}








