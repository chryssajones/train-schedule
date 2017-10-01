console.log("JavaScript is loaded");
$(document).ready(function(){
  console.log("ready!")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBHMH_f2m5zZHxtLdTmzh9Qy1-Q2nezWGQ",
  authDomain: "train-scheduler-cj2017.firebaseapp.com",
  databaseURL: "https://train-scheduler-cj2017.firebaseio.com",
  projectId: "train-scheduler-cj2017",
  storageBucket: "train-scheduler-cj2017.appspot.com",
  messagingSenderId: "574470350431"
};

firebase.initializeApp(config);
var database = firebase.database();

// button for adding new trains
$("#submitBtn").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#nameInput").val().trim();
  var trainDest = $('#destinationInput').val().trim();
  var trainFreq = $('#frequencyInput').val().trim();
  var trainTime = $('#timeInput').val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    frequency: trainFreq,
    time: trainTime
  };

  database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.time);
    alert("Train successfully added");

  $('#nameInput').val("");
  $("#destinationInput").val("");
  $('#frequencyInput').val("");
  $('#timeInput').val("");
});

// managing the firebase entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  console.log(prevChildKey);

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFreq = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;

  var trainTimeConverted = moment.unix(trainTime).format("HH:MM");
  var minutesToArrival = moment().diff(moment.unix(trainTime, "X"), "minutes");

  $("#tableID > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + trainTimeConverted + "</td><td>" + minutesToArrival);

});

// closing the document.ready function
});