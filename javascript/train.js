var config = {
    apiKey: "AIzaSyAA1Q78GkAvmtOS6rb838pkmsbe0Oh40Is",
    authDomain: "train-schedule-1010e.firebaseapp.com",
    databaseURL: "https://train-schedule-1010e.firebaseio.com",
    projectId: "train-schedule-1010e",
    storageBucket: "train-schedule-1010e.appspot.com",
    messagingSenderId: "742499567153"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var destination = $("#destination-input").val().trim();
  	var trainTime = $("#train-time-input").val().trim();
  	var frequency = $("#frequency-input").val().trim();



	var newTrain = {
		train: trainName,
  		destination: destination,
  		trainTime: trainTime,
  		frequency: frequency
	};

  	database.ref().push(newTrain);

  console.log(trainName.train);
  console.log(destination.destination);
  console.log(trainTime.trainTime);
  console.log(frequency.frequency);

  alert("Your train has been added to the schedule! Be sure to check the schedule so you don't miss it!");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#train-time-input").val("");
$("#frequency-input").val("");
});

 //event for when a user adds a train and then adds it to a row in the schedule
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 	console.log(childSnapshot.val());

 	var trainName = childSnapshot.val().train;
 	var destination = childSnapshot.val().destination;
 	var trainTime = childSnapshot.val().trainTime;
 	var frequency = childSnapshot.val().frequency;

 	console.log(trainName);
  	console.log(destination);
  	console.log(trainTime);
  	console.log(frequency);
  

  	var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  	console.log(trainTimeConverted);

  	var currentTime = moment();
  	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  	var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  	console.log("DIFFERENCE IN TIME: " + diffTime);

  	var timeApart = diffTime % frequency;
  	console.log(timeApart);

  	var minutes = frequency - timeApart;
  	console.log("MINUTES UNTIL TRAIN: " + minutes);

  	var nextArrival = moment().add(minutes, "minutes").format("hh:mm");
  	console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");
});

