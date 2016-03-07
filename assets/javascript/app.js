
$(document).ready(function(){
	run();
});


var timeRemaining = 20;
var timerID;
var currentQuestion = 0;
var answerDelay = 1000;

var questions = [
	{
		question: "What is the tallest bird?",
		answers: ["Flamingo","Ostrich","Parrot","Condor"],
		correctAnswer:1
	},
	{
		question: "What is a baby horse called?",
		answers: ["Foul","Joey","Foal","Mare"],
		correctAnswer:2
	},
	{
		question: "What is the largest kind of shark?",
		answers: ["Hammerhead Shark", "Great White Shark", "Nurse Shark", "Whale Shark"],
		correctAnswer:3
	},
	{
		question: "What do giant pandas eat?",
		answers:["Bamboo", "Leaves", "Meat", "Fish"],
		correctAnswer:0
	},
	{
		question:"How many stomachs do cows have?",
		answers:["Six", "One", "Four", "Three"],
		correctAnswer:2
	}
	];



function run(){
	nextQuestion();
}



function tic(){

	timeRemaining--;
	$('#timer').html(timeRemaining);

	if (timeRemaining == 0){

		clearInterval(timerID);
		currentQuestion++;
		nextQuestion();
	}
}



function answer(){

	var currentAnswer = $(this).text();
	var i = questions[currentQuestion].correctAnswer;
	var correctAnswer = questions[currentQuestion].answers[i];
	console.log(i);
	console.log(questions[currentQuestion]);
	$('#answers').empty();
	$('#answers').html("The correct answer is:<br>" + correctAnswer);
	setTimeout(nextQuestion,answerDelay);
}



function nextQuestion(){

	if(currentQuestion <= questions.length){

		timerID = setInterval(tic, 1000);
		var q = questions[currentQuestion];
		$('#question').html(q.question);

		for(var i in q.answers) {

			var el = $('<li>');
			el.on('click', answer);
			el.html(q.answers[i]);
			$('#answers').append(el);
		}
	}
}