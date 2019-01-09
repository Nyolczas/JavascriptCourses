//--- BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            allExpenses: [],
            allIncomes: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;

            // ID készítés: megszámolja, hogy hány elem van már, és ennek megfelelően állítja be az ID-t.
            ID = data.allItems[type][data.allItems[type].length -1].id + 1; 

            // elkészíti az új exp vagy inc elemet
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // feltolja az adatstruktúrába
            data.allItems[type].push(newItem);
            return newItem;
        }
    };

})();

//--- UI CONTROLLER
var UIController = (function () {

    var DOMstrings = { // ez a lista gyűjti a bemeneti sztingeket
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return { // publikussá teszi a változókat
        getInput: function () { // begyűjti a beadott adatokat.
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc vagy exp lehet
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDomstrings: function () { // publikussá teszi a DOMstrings változókat
            return DOMstrings;
        }
    };
})();

//--- GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    // eseménykezelők gyűjteménye
    var setupEventListeners = function () { 
        var DOM = UICtrl.getDomstrings(); // behívja a DOM elemeket

        // a gomb megnyomása meghívja a ctrlAddItem függvényt.
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // az enter leütése meghívja a ctrlAddItem függvényt.
        document.addEventListener('keypress', function (event) {
            // console.log(event);
            if (event.keyCode === 13 || event.witch === 13) {
                // console.log('Entert nyomtál!');
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        //console.log('Működik!');

        //- 1. Beadott adatok felvétele
        var input = UICtrl.getInput();
        console.log(input);

        //- 2. Elemek átadása a Budget controllernek

        //- 3. Elemek hozzáadása az UI-hoz.

        //- 4. Budget kiszámolása

        //- 5. Budget megjelenítése
    };

    return { // a setupEventListeners függvény pulikussá tétele.
        init: function() { 
            console.log('Az alkalmazás elindult.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();