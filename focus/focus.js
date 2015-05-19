//---------------------------------------------------------
//
//	JS Focus
//
//	Summary
//		Makes the data element with data-js-focus take focus on click
//		of its associated trigger element
//
//	Usage
//		.js-focus
//			Add this class to the trigger element
//		[data-js-focus="FOCUS_ID]
//			Add to both the the trigger and the target
//
//---------------------------------------------------------
$('.js-focus').on('click', function(event) {
	var focusID = $(this).attr('data-js-focus');
	$('[data-js-focus=' + focusID + ']').focus();
});