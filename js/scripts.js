//Business logic

//Create individual pizza order
function Pizza (panSize, toppings) {
  this.panSize = panSize;
  this.toppings = toppings;
  this.price = '';
}

//Create price of pizza with size and number of toppings
Pizza.prototype.setPrice = function(panSize) {
  var totalPrice = 0
  if (this.panSize === "Small") {
    totalPrice += 10;
  } else if (this.panSize === "Medium") {
    totalPrice += 15;
  } else if (this.panSize === "Large") {
    totalPrice += 20;
  }

  if (this.toppings.length !== 0) {
    totalPrice += this.toppings.length;
  }
  return totalPrice;
}



//UI logic
$(document).ready(function() {

  $(".pizza-form").submit(function(event) {
    var sizeInput = $("input:radio[name=pizza-size]:checked").val();
    var toppingsInput = []; $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var aTopping = $(this).val();
      toppingsInput.push(aTopping);
    });

    //Create one order using Pizza constructor
    var pizzaOrder = new Pizza(sizeInput, toppingsInput);
    //Add price to constructor object using price calculator prototype
    pizzaOrder.price = pizzaOrder.setPrice();

    $(".pan-size").text(pizzaOrder.panSize);
    $(".list-toppings").text(pizzaOrder.toppings);
    $(".price-total").text("$" + pizzaOrder.price);
    $(".order-for-purchase").show();

    event.preventDefault();
  });
});
