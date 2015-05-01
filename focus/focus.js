//---------------------------------------------------------
// JS Focus
// Makes the data element with data-js-focus take focus
// put the js-focus class on the trigger element.
// put the data-js-focus="FOCUS_ID" on the trigger and the target
//---------------------------------------------------------
$('.js-focus').on('click', function(event) {
	var focusID = $(this).attr('data-js-focus');
	$('[data-js-focus=' + focusID + ']').focus();
});