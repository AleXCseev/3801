$(document).ready(function () {

	var currency = $("body").data('currency');
	// $('.price__current').each(function () {
	// 	var p = parseInt($(this).text());
	// 	p = p * 100 / 40;
	// 	p2 = Math.ceil(p);
	// 	$('.price__old').text(p2 + ' ' + currency);
	// });

  $('.order-form').submit(function (e) {

    var color = $(this).closest('.product-section').find(".select-color__list-item_active").attr('data-color');
    var size = $(this).closest('.product-section').find(".own-select__selected").text();

    $(".order-form input[name='comment']").val(size + "Цвет: " + color);
  });
});
