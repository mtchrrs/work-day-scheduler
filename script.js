
function createTimeBlock(time, content = ""){
    
    const timeValue = moment(time, "H").format("h A");
    const timeRow = $('<div class="row row-cols-3 time-row">'); 
    const colTime = $('<div class="col border d-flex align-items-center justify-content-center time-col-time">').text(timeValue);
    const colTextArea = $('<textarea class="form-control col-8 time-col-textarea" type="text">').val(content);
    const colButton = $('<button type="button" class="col border d-flex align-items-center justify-content-center time-col-button">').text("Save");
   

    const currentTime = moment();
    const timeMoment = moment(time, "H");
    const presentTime = (currentTime > timeMoment) && (currentTime < timeMoment.clone().add(1, "h"))
    const pastTime = timeMoment < currentTime;
    const futureTime = timeMoment > currentTime;

    if(presentTime){
      colTextArea.addClass("present");
    } 
    if(pastTime){
      colTextArea.addClass("past");
    }
    if(futureTime){
      colTextArea.addClass("future");
    }
    
    function handleFormSubmit(event){
        event.preventDefault(); 
        localStorage.setItem(colTime.text(), colTextArea.val());
    };

    colButton.on("click", handleFormSubmit);
    
    function renderLastDetails(){
        inputs = localStorage.getItem(colTime.text(), colTextArea.val());

        if (colTime.text() == inputs.colTime.text()){
          colTextArea.val(inputs.colTextArea.val());
        } else if (colTime.text() == null){
            return;
        };

    };
    renderLastDetails();

 return timeRow.append(colTime, colTextArea, colButton);
}


// function handleFormSubmit(event){
//     event.preventDefault();
//     let buttonClick = $(event.currentTarget);
//     let targetText = buttonClick.siblings("time-col-textarea");
//     let targetTime = targetText.data(time);

//     localStorage.setItem("timeblock " + targetTime, targetText.val());
    
// }




// when user lands on this app
// user should see the current time, ticking clock


$(function(){
   const currentTime = $('#currentDay');
   const container = $('.container');

    function startTimer(){
        setInterval(function(){
            currentTime.text(moment().format('dddd Do MMM YYYY h:mm:ss A'))
        }, 1000);
    }
  
    startTimer();

  
  for (let index = 9; index <18; index++) {
      const previousNotes = "";
      const timeBlock = createTimeBlock(index, previousNotes);
      container.append(timeBlock);
    }

});

// need to change the time to 12 hour

// should see 9am to 5 pm blocks with the previous notes
// see coloured blocks - past, present and future

// when user clicks on submit
// return the note on the targer time block
// save the not to the storage, based on the time

// 

// user can edit past and current time blocks

 