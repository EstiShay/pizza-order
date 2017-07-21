//Business logic
function Pizza (panSize) {
  this.panSize = panSize;
  this.toppings = [];
  this.price = '';
}

Pizza.prototype.setPrice = function(panSize) {
  if (this.panSize === "Small") {
    this.price = 10
  } else if (this.panSize === "Medium") {
    this.price = 15
  } else if(this.panSize === "Large") {
    this.price = 20
  }
}



//UI logic
$(document).ready(function() {

  $(".pizza-form").submit(function(event) {
    var sizeInput = $("input:radio[name=pizza-size]:checked").val();
    // var toppingsInput = $("input:checkbox[name=pizza-toppings]:checked").val();

    var pizzaOrder = new Pizza(sizeInput);
    pizzaOrder.setPrice();

    $("ul").append("<li>" + pizzaOrder.panSize + "</li>");
    $(".price-total").text("$" + pizzaOrder.price);
    $(".order-for-purchase").show();

    event.preventDefault();
  });
});
