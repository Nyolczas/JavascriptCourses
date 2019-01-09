//--- BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return { // publikussá teszi az új elem hozzáadását.
        addItem: function (type, des, val) {
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

        testing: function () {
            console.log(data);
        }
    };

})();

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

    return { // publikussá teszi a változókat
        getInput: function () { // begyűjti a beadott adatokat.
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc vagy exp lehet
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

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

        clearFields: function() { // kitisztítja a beírt adatokat
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields); // a listát tömbbé alakítja

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            }); 

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
        var input, newItem;

        //- 1. Beadott adatok felvétele
        input = UICtrl.getInput();
        //console.log(input);

        //- 2. Elemek átadása a Budget controllernek
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //- 3. Elemek hozzáadása az UI-hoz.
        UICtrl.addListItem(newItem, input.type);

        //- 4. Kiüríti a beviteli mezőket.
        UICtrl.clearFields();

        //- 5. Budget kiszámolása

        //- 6. Budget megjelenítése
    };

    return { // a setupEventListeners függvény pulikussá tétele.
        init: function () {
            //console.log('Az alkalmazás elindult.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();