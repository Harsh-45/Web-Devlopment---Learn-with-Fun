let index=0;
let que = questions.sort(function(){
    return 0.5-Math.random();
});
let attempt = 0; 
let score = 0;
let wrong = 0;
let totalQuestion = 15;
let check = []; // array to know whether question has been attempted or not
let optionChoose = [];  // array to know which option has been chosen
let value = []; // array to know whether answer chosen is correct or not :: 1-true, 0-false
for(let i=0; i<15; i++){
    check.push(false);
    optionChoose.push(-1);
    value.push(-1);
}

$(function (){
    // timer code starts from here
    let totalTime = 300;   // 300 seconds for timer
    let min=0;
    let sec=0;
    let counter=0;

    let timer = setInterval(function(){
        counter++;
        min = Math.floor((totalTime-counter)/60);
        sec = totalTime - min*60 - counter;
        $(".timerbox span").text(min + ":" + sec);
        if(totalTime==counter){
            alert("Time's up. Press ok to show the Result");
            result(); 
            clearInterval(timer);
        }
    },1000); // timer sets for 1sec interval
    // timer code ends here


    //print question
    printQuestion(index);
});

//------------------------------------------------------------------------------------------------

// function to print question starts
function printQuestion(i){
    $(".questionbox").text(que[i].question);
    $(".opttext span").eq(0).text(que[i].option[0]);
    $(".opttext span").eq(1).text(que[i].option[1]);
    $(".opttext span").eq(2).text(que[i].option[2]);
    $(".opttext span").eq(3).text(que[i].option[3]);
    $(".qbox span").text(index+1);
}
// function to print question end

//------------------------------------------------------------------------------------------------

//fuction to check answer starts
function checkAnswer(option){
    attempt++;
    check[index] = true;
    let optionClicked = $(option).data("opt");
    // console.log(optionClicked);
    optionChoose[index] = optionClicked-1;
    if(optionClicked == que[index].answer){
        $(option).addClass("right");
        score++;
        value[index] = 1;
    }
    else{
        $(option).addClass("wrong");
        wrong++;
        value[index] = 0;
    }
    $(".scorebox span").text(score*10);
    $(".optionsbox .option").attr("onclick","");
    check[index] = true;
}
//fuction to check answer starts

//------------------------------------------------------------------------------------------------

// funcction for the next question starts
function showNext(){
    if(index >= 14){
        showResult(0);
        return;
    }
    index++;
    if(check[index]==false)
    {
        $(".optionsbox .option").removeClass("right wrong");
        $(".optionsbox .option").attr("onclick","checkAnswer(this)");
    }
    else
    {
        $(".optionsbox .option").attr("onclick","");
        $(".optionsbox .option").removeClass("right wrong");
        if(value[index]==1){
            $(".optionsbox .option").eq(optionChoose[index]).addClass("right");
        }
        else{
            $(".optionsbox .option").eq(optionChoose[index]).addClass("wrong");
        }
    }
    printQuestion(index);
}
// function for the next question starts

//------------------------------------------------------------------------------------------------

// function for the previous questions starts here
function showPrev(){
    if(index >= 14){
        showResult(0);
        return;
    }
    if(index<1){
        return;
    }
    index--;
    if(check[index]==false)
    {
        $(".optionsbox .option").removeClass("right wrong");
        $(".optionsbox .option").attr("onclick","checkAnswer(this)");
    }
    else
    {
        $(".optionsbox .option").attr("onclick","");
        $(".optionsbox .option").removeClass("right wrong");
        if(value[index]==1){
            $(".optionsbox .option").eq(optionChoose[index]).addClass("right");
        }
        else{
            $(".optionsbox .option").eq(optionChoose[index]).addClass("wrong");
        }
    }
    printQuestion(index);
}
// function for the previous questions starts here

//------------------------------------------------------------------------------------------------

//function showResult starts
function showResult(j){
    
    if(
        j==1 && 
        index<14 &&
        !confirm(
            "Quiz has not finished yet. Press ok to skip quiz & get your final result"
        )
    ){
        return;
    }
    result();
}
//function showResult ends

//------------------------------------------------------------------------------------------------

// function result starts
function result(){
    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalQuestion").text(totalQuestion);
    $("#totalAttempt").text(attempt);
    $("#totalCorrect").text(score);
    $("#totalWrong").text(wrong);
    $("#totalScore").text(score*10);
}
// function results ends here

//------------------------------------------------------------------------------------------------