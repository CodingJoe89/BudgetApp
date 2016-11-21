
//budget controller
var budgetController = (function() {

  //funciton constructors
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    }
    totals: {
      exp: 0,
      inc: 0
    }


  };
  return {
    addItem: function(type, des, val){

      var newItem, ID;

      //create new ID
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      //create new item based on in or exp type
      if (type === 'exp'){
        newItem = new Expense(ID, des, val);
      }else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // push it into our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;

    }
  };


})();

//ui contorller
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }
  return {
    getInput: function(){
      return{
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDomstrings: function(){
      return DOMstrings;
    }

  }


})();


//global app controller
var controller = (function(budgetCtrl, UICtrl){


  var setupEventListeners = function(){

    var DOM = UICtrl.getDomstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  };


  var ctrlAddItem = function(){
    // 1. get the feild input data
    var input = UICtrl.getInput();
    // 2. add the item to the budget controller
    budgetCtrl.addItem(input.type, input.description, input.value)
    // 3. add the new item to the UI
    // 4. calculate the budget
    // 5. display the duget on the UI


  };

  return{
    init: function(){
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
