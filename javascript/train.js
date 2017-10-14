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

  alert("train added!");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#train-time-input").val("");
$("#frequency-input").val("");
});
