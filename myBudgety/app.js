
//--- BUDGET CONTROLLER
var budgetController = (function() {

})();

//--- UI CONTROLLER
var UIController = (function(){

    var DOMstrings = { // ez a lista gyűjti a bemeneti sztingeket
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return { // publikussá teszi a változókat
        getInput: function(){ // begyűjti a beadott adatokat.
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc vagy exp lehet
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        getDomstrings: function() { // publikussá teszi a DOMstrings változókat
            return DOMstrings;
        }
    };
})();

//--- GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDomstrings();

    var ctrlAddItem = function() {
        //console.log('Működik!');

         //- 1. Beadott adatok felvétele
         var input = UICtrl.getInput();
         console.log(input);
    
        //- 2. Elemek átadása a Budget controllernek
    
        //- 3. Elemek hozzáadása az UI-hoz.
    
        //- 4. Budget kiszámolása
    
        //- 5. Budget megjelenítése

    }
    // a gomb megnyomása meghívja a ctrlAddItem függvényt.
    document.querySelector(inputBtn).addEventListener('click', ctrlAddItem); 

    // az enter leütése meghívja a ctrlAddItem függvényt.
    document.addEventListener('keypress', function(event){  
        // console.log(event);
        if (event.keyCode === 13 || event.witch === 13) {
            // console.log('Entert nyomtál!');
            ctrlAddItem();
        }

    });

})(budgetController, UIController);

