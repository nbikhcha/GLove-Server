var contactForm1 = $('.person1 .contact-form');
var contactForm2 = $('.person2 .contact-form');
var submitButton = contactForm1.find(':button');
var recievedContactDiv1 = $('.person1 .receivedContact');
var recievedContactDiv2 = $('.person2 .receivedContact');
submitButton.click(function() {
	console.log("sending contact form 1 info");
	var contactInfo1 = {
		name: contactForm1.find('[name="name"]').val(),
		number: contactForm1.find('[name="number"]').val()
	};
	console.log(contactInfo1);

	$.get("http://localhost:5000/time", 
		contactInfo1,
		function(data) {
			console.log("person1 received: ");
			console.log(data);
			$(recievedContactDiv1.find('.name')).html(data.name);
			$(recievedContactDiv1.find('.number')).html(data.number);
	}).error(function(err) {
		console.error("Error with person1");
		console.error(err);
	});

	var delayTimeString = contactForm2.find('[name="delay"]').val();
	if (delayTimeString != "") {
		delayTime = parseInt(delayTimeString);
		var contactInfo2 = {
			name: contactForm2.find('[name="name"]').val(),
			number: contactForm2.find('[name="number"]').val()
		};
		setTimeout(function() {
			console.log("sending contact form 2 info");
			$.get("http://localhost:5000/time", 
				contactInfo2,
				function(data) {
					console.log("person2 received: ");
					console.log(data);
					$(recievedContactDiv2.find('.name')).html(data.name);
					$(recievedContactDiv2.find('.number')).html(data.number);
			}).error(function(err) {
				console.error("Error with person2");
				console.error(err);
			});
		}, delayTime);
	}

});