
function createTimeBlock(time, content = ""){
    const timeValue = moment(time, "H").format("h A");
    const timeRow = $('<div class="row row-cols-3 time-row">'); 
    const colTime = $('<div class="col border d-flex align-items-center justify-content-center time-col-time">').text(timeValue);
    const colTextArea = $('<textarea id="input" class="form-control col-8 time-col-textarea" type="text">').val(content);
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
    
    return timeRow.append(colTime, colTextArea, colButton);
}
