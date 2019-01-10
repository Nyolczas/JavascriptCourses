//===================================================================================================================
//--- BUDGET CONTROLLER
var budgetController = (function () {

    // privát: költség osztály
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // privát: bevétel osztály
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // privát: globális adat modell
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    // privát: szumma számolása
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    // publikus osztályok
    return { 
        addItem: function (type, des, val) { // publikus: elem hozzáadása
            var newItem, ID;

            if (data.allItems[type].length > 0) {

                // ID készítés: megszámolja, hogy hány elem van már, és ennek megfelelően állítja be az ID-t.
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0; // a legelső elem 0 ID-t kap.
            }

            // elkészíti az új exp vagy inc elemet
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // feltolja az adatstruktúrába
            data.allItems[type].push(newItem);

            // visszaadja az új elemet
            return newItem;
        },

        calculateBudget: function() { // publikus: budget számolása

            // össz bevétel és össz kiadás kiszámolása
            calculateTotal('exp');
            calculateTotal('inc');

            // egyenleg kiszámítása: bevétel - kiadás
            data.budget = data.totals.inc - data.totals.exp;

            // százalékos költségek számítása a bevétel alapján
            if ( data.totals.inc > 0) { // nullával nem oszt
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;  // ha nincs bevétel, akkor -1-et ad vissza
            }

        },

        // visszaadja az értékeket egy objektumban
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percent: data.percentage
            }
        },

        testing: function () { // publikus: console-os teszteléshez
            console.log(data);
        }
    };

})();

//===================================================================================================================
//--- UI CONTROLLER
var UIController = (function () {

    var DOMstrings = { // ez a lista gyűjti a bemeneti sztingeket
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    // UI controller publikus metódusok
    return { 

        // begyűjti a beírt adatokat.
        getInput: function () { 
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc vagy exp lehet
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        // bevételi és kiadási tételek megjelenítése
        addListItem: function (obj, type) {
            var html, newHtml, element;

            // HTML placeholder stringek készítése
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // A placeholderek lecserélése az aktuális adatokra
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            // A HTML beszúrása a DOM-ba
            // help --- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Az input mezők alaphelyzetbe állítása
        clearFields: function() { 
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields); // a listát tömbbé alakítja

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            }); 

        },

        // a DOMstrings változók publikussá tétele
        getDomstrings: function () { 
            return DOMstrings;
        }
    };
})();

//===================================================================================================================
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

    // Fejléc elemeinek frissítése
    var updateBudget = function() {

        //- 1. Kiszámoltatja a Budgetet
        budgetCtrl.calculateBudget();

        //- 2. Lekérdezi a Budget értékeit.
        var budget = budgetCtrl.getBudget();

        //- 3. Megjeleníti az értékeket.
        console.log(budget);

    };

    // lábléc elemeinek megjelenítése
    var ctrlAddItem = function () {
        //console.log('Működik!');
        var input, newItem;

        //- 1. Beadott adatok felvétele
        input = UICtrl.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //- 2. Elemek átadása a Budget controllernek
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
            //- 3. Elemek hozzáadása az UI-hoz.
            UICtrl.addListItem(newItem, input.type);
    
            //- 4. Kiüríti a beviteli mezőket.
            UICtrl.clearFields();
    
            //- 5. Kiszámolja és frissíti a Budget-et.
            updateBudget();
        }

    };

    return { // a setupEventListeners függvény pulikussá tétele.
        init: function () {
            //console.log('Az alkalmazás elindult.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

//===================================================================================================================

controller.init();