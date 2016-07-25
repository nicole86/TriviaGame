//starts game on click
$(document).on('click', '#start', function(e) {
  $('#container').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.run();
});

//loads answer on click
$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

//resets game on click
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

//questions
var questions = [
	{
		question: "What is the tallest bird?",
		answers: ["Flamingo","Ostrich","Parrot","Condor"],
		correctAnswer:"Ostrich"
	},
	{
		question: "What is a baby kangaroo called?",
		answers: ["Foul","Joey","Foal","Mare"],
		correctAnswer:"Joey"
	},
	{
		question: "What is the largest kind of shark?",
		answers: ["Hammerhead Shark", "Great White Shark", "Nurse Shark", "Whale Shark"],
		correctAnswer:"Whale Shark"
	},
	{
		question: "What do giant pandas eat?",
		answers:["Bamboo", "Leaves", "Meat", "Fish"],
		correctAnswer:"Bamboo"
	},
	{
		question:"How many stomachs do cows have?",
		answers:["Six", "One", "Four", "Three"],
		correctAnswer:"Four"
	},
	{
		question: "What is a group of owls called?",
		answers:["A parliament", "A herd", "A school", "A colony"],
		correctAnswer:"A parliament"
	},
	{
		question: "Where do camels store water?",
		answers:["Stomach", "Hump", "Legs", "Mouth"],
		correctAnswer:"Hump"
	},
	{
		question: "How many legs does a grasshopper have?",
		answers:["Four", "Eight", "Twelve", "Six"],
		correctAnswer:"Six"
	},
	{
		question: "What is the fastest animal?",
		answers:["Sailfish", "Cheetah", "Lion", "Hawk"],
		correctAnswer:"Cheetah"
	},
	{
		question: "What is the slowest animal?",
		answers:["Tortoise", "Snail", "Seahorse", "Sloth"],
		correctAnswer:"Sloth"
	},
	];


var startTime = 30;

var game = {
	questions: questions,
	takenMap:{},
	taken:0,
	currentQuestion:0,
	counter: startTime,
	correct:0,
	incorrect:0,
	countdown: function(){
		game.counter--;
		$('#counter-number').html(game.counter);
		if(game.counter===0){
			console.log("Time's up!");
			game.timeUp();
		}
	},
	run: function(){
		if(this.taken >= this.questions.length)
			return;

		timer = setInterval(game.countdown, 1000);

		var rIndex = Math.floor(Math.random()*questions.length);

		while(this.takenMap[rIndex])
			rIndex = (rIndex+1 < questions.length)? rIndex++ : 0;

		this.takenMap[rIndex] = true;
		this.taken++;
		this.currentQuestion = rIndex;

    	$('#quiz').html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    	for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      	$('#quiz').append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    	}
	},
	nextQuestion: function(){
    game.counter = startTime;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.run();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    $('#quiz').html('<h2>Out of Time!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    if (game.taken === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    $('#quiz').html('<h2>Finished! See how you did!</h2>');
    $('#counter-number').html(game.counter);
    $('#quiz').append('<h3>Correct Answers: ' + game.correct + '</h3>');
    $('#quiz').append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    $('#quiz').append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    $('#quiz').append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    $('#quiz').html('<h2>Sorry!</h2>');
    $('#quiz').append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.taken === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    $('#quiz').html('<h2>Correct!</h2>');
     $('#quiz').append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.taken === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
	reset: function(){
    	this.currentQuestion = 0;
    	this.counter = startTime;
    	this.correct = 0;
    	this.incorrect = 0;
    	this.run();
  	}
};
