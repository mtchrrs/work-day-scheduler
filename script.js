// create a function to generate the interactive planner
function createTimeBlock(time, content = ""){
    // this variable takes the time parameter from the top and redefines  it
    // the value is converted through the moment library
    const timeValue = moment(time, "HH").format("HH"); // formats the time as "13"
    // this variable creates the container (using jquery) that will hold the content
    const timeRow = $('<div class="row row-cols-3 time-row">'); 
    // this variable creates the column that will display the time (includes jquery classes)
    const colTime = $('<div class="col border d-flex align-items-center justify-content-center time-col-time">').text(timeValue);// holds the timeValue
    // this variable creates the column that users can input into, and displays this content
    const colTextArea = $('<textarea id="input" class="form-control col-8 time-col-textarea" type="text">').val(content);
    // this variable creates the save button
    const colButton = $('<button type="button" class="col border d-flex align-items-center justify-content-center time-col-button">').text("Save");
    
    // this variable calls the past inputs (see below) from the local storage
    const pastInputs = localStorage.getItem(time); // which is sent in line 97
    // and pastes the content from the storage as the colTextArea 'content'
    colTextArea.val(pastInputs);

    // the following are constants that allow the js to determine what colour the times should be (passing through)
    // the current time is taken as the pure moment function
    const currentTime = moment();
    // the timeMoment constant shows the time from the createTimeBlock function as a number ie '9', '10'
    const timeMoment = moment(time, "H");
    // this constant determines present time (in between the timeMoment and timeMoment + 1)
    const presentTime = (currentTime > timeMoment) && (currentTime < timeMoment.clone().add(1, "h"));
    // this constant determines when the time shown is past the current time
    const pastTime = timeMoment < currentTime;
    // similarly, this constant determines what times are ahead of the current time
    const futureTime = timeMoment > currentTime;

    // these couple of lines determine the classes that are to be added to the above values
    if(presentTime){
      colTextArea.addClass("present");
    }; 
    // present time is presented as red
    if(pastTime){
      colTextArea.addClass("past");
    };
    // past time is grey
    if(futureTime){
      colTextArea.addClass("future");
    };
    // future time is green

    // the following line appends the time column, input column and save column to the overarching 'div'
    // and returns the function
    return timeRow.append(colTime, colTextArea, colButton);
}

// this next function will set the running time at the top of the application
$(function(){
    // the time is to be shown in the section with the id 'currentDay'
    const currentTime = $('#currentDay');
    // the container for the above constant is found where the class is 'container'
    const container = $('.container');
        // in the container, we want to create a function to start the timer
    function startTimer(){
        // the timer must have an interval to show
        setInterval(function(){
          // this function shows the time using the moment.js library in the form - Monday 1st Jan 2000 01:01:01
          currentTime.text(moment().format('dddd Do MMM YYYY HH:mm:ss'))
          // and refreshes the page every second
        }, 1000);
    };
    // this line calls the startTimer function
    startTimer();
    // the for loop sets the number of time slots to create on the page
    for (let index = 9; index <18; index++) {
     // the constant previous notes and index determine the parameters content and time in the createTimeBlock function
     const previousNotes = "";
     // therefore, each time slot is originally set with a number from 9 - 17, and empty content
      const timeBlock = createTimeBlock(index, previousNotes);
     // the new constant is then appended to the container created above (adding it to the time slots in the planner)
     // this will also run the function
     container.append(timeBlock);
      
    }
});

// the function below will send the data from the colTextArea, or the content, to the local storage
// this is done by clicking the save button, referenced below by the class 'time-col-button'
$(document).on('click','.time-col-button', function(event){
   // the following constant sets the variable of buttonClicked to the event target as shown above, ie the save button
   const buttonClicked = $(event.target);
   // this constant sets the the colTextArea to the html element that was called directly before the button (line 11)
   const colTextArea = buttonClicked.prev();
   // this constant sets the timeCol as the html element called two elements before the target (line 9)
   const timeCol = buttonClicked.prev().prev();
   // the time is determined as the value of the timeCol constant, which transfers to the time shown in the first column on the application
   const time = timeCol.text()
   // the hour contant just takes away the " AM" or " PM" from the value collected (sets as a pure number)
   const hour = time.slice(0,-3);
    // this constant sets the user input as the value entered into the text area, seen as the middle column on the application
   const userInput = colTextArea.val();
   // this is then sent to local storage, with tke key of 'time' and the value of 'userInput'
   localStorage.setItem(hour, userInput); // this is later called in line 16
})