//Business logic

//Create individual pizza order
function Pizza (panSize, toppings) {
  this.panSize = panSize;
  this.toppings = toppings;
  this.price = '';
}

function Orders () {
  this.orderList = [];
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

var totalCost = 0

function clearForm() {
    document.getElementById("pizza-form").reset();
}

  $("#pizza-form").submit(function(event) {
    var sizeInput = $("input:radio[name=pizza-size]:checked").val();
    var toppingsInput = []; $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var aTopping = $(this).val();
      toppingsInput.push(aTopping);
    });

    //Create one order using Pizza constructor
    var pizzaOrder = new Pizza(sizeInput, toppingsInput);
    //Add price to constructor object using price calculator prototype
    pizzaOrder.price = pizzaOrder.setPrice();

    //Order multiple pizzas
    var fullOrder = new Orders();
    fullOrder.orderList.push(pizzaOrder);

    fullOrder.orderList.forEach(function() {
      $("#your-orders").append("<li>Size: " + pizzaOrder.panSize +"</li>");
      if (toppingsInput.length === 0) {
        $("#your-orders").append("<li>Toppings: None</li>");
      } else {
        $("#your-orders").append("<li>Toppings: " + pizzaOrder.toppings + "</li>");
      }
      $("#your-orders").append("<li>Subtotal: $" + pizzaOrder.price + "</li>");
      totalCost += pizzaOrder.price;
      $(".price-total").text("$" + totalCost);
    });

    //Single order
    // $(".pan-size").text(pizzaOrder.panSize);
    // if (toppingsInput.length === 0) {
    //   $(".list-toppings").text("None");
    // } else {
    //   $(".list-toppings").text(pizzaOrder.toppings);
    // }
    // $(".price-total").text("$" + pizzaOrder.price);

    $(".order-for-purchase").show();
    clearForm();
    event.preventDefault();
  });

  $("#purchase").click(function(event) {
    $(".order-submit").show();
    $("#main-content").hide();
    $(".order-for-purchase").hide();
  });

  $(".new-order").click(function(event) {
    $("#main-content").show();
    clearForm();
    $(".order-submit").hide();
  });
});
