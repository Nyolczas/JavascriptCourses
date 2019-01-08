
//--- BUDGET CONTROLLER
var budgetController = (function() {

})();

//--- UI CONTROLLER
var UIController = (function(){

    return {
        getinput: function(){

        } 
    };
})();

//--- GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    document.querySelector('.add__btn').addEventListener('click', function() {
        //console.log('rákattintottál a gombra.')

        //- 1. Beadott adatok felvétele
    
        //- 2. Elemek átadása a Budget controllernek
    
        //- 3. Elemek hozzáadása az UI-hoz.
    
        //- 4. Budget kiszámolása
    
        //- 5. Budget megjelenítése
    });

    document.addEventListener('keypress', function(event){

        console.log(event);

    });

})(budgetController, UIController);

