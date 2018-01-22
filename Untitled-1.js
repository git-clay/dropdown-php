var mobile = window.matchMedia('screen and (max-width: 413px)').matches;

var resEdit = false,coreEdit=false,saqEdit=false,plyoEdit=false;
var resVal,coreVal,saqVal,plyoVal;
var expSelected = false;
var type, level, focus;

$(document).ready(function() {
  //mobile dropdown functions
  if (mobile) {
    //apply mobile specific classes?
    $('body')
      .off('click.dropdown touchstart.dropdown.data-api', '.dropdown')
      .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    //how to handle mobile click events
    $('.m-exp').on("click", function(e) {
      e.stopPropagation();
      $('#create-wo-m').show()
      level = $(this).attr("value")
        $('#1').hide()
        $('#2').hide()
        $('#fatloss').show()
        $('#endurance').show()
        $('#strength').show()
        $('#power').show()
      if(level == "beginner"){
        $('#1').show()
        $('#2').show()
        $('#fatloss').hide()
        $('#endurance').hide()
        $('#strength').hide()
        $('#power').hide()
        $('#power').hide()
      }else if(level == 'intermediate'){

      }else{
        $('#endurance').hide()
      }
    })
    //how to handle type selection - mobile
    $('.a').on("click", function(e) {
      e.stopPropagation();
      $('#resistanceMenu').dropdown('toggle')
    })
  }else{
    $('#create-wo-m').hide()
  }
  /**
   * *Function Section * *
   */
    //returns one workout based on focus exercise
    //called on level/type selection, refresh, add
    /**
     * getwo is the main call
     * ? maybe a promise instead of callback
     * @param focusExer 
     * @param callback
     * * public method refresh
     * * public method add
     */
    function getWo(focusExer,callback) {
      var queryAction = "workout_ajax";
      this.workoutObj = {
        "level":"",
        "type":"",
        "focus":focusExer.toLowerCase()
      }
      var ajaxurl = "http://fitnessproblem.com/wp-admin/admin-ajax.php"
      var data = {
        'action': queryAction,
        'name': workoutObj
      };
      console.log(this.workoutObj)
      function request(){
        jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        data: data,
        success: function(res) {
          if(res==null || res == ''){
            getWo(focusExer,callback)
          }else{
            callback(res)
          }
        }
        })
      }
      this.add = function(){
      console.log('add')
      }
      this.refresh = function(){

      }
    }

    //refresh "constructor"
    //todo  combine with getWo as a public method?
    function refresh(tempFocus) {
      if(tempFocus == 'resistance' && resEdit){
        updateResOption($('#resistance-selected').text(),'#resistanceMenu')
      }else if(tempFocus == 'plyo'&&plyoEdit){
        updateResOption(plyoVal,'#plyoMenu')
      }else if(tempFocus == 'saqBtn' && saqEdit){
        updateResOption(saqVal,'#saqMenu')
      }else if(tempFocus == 'coreBtn' && coreEdit){
        updateResOption(coreVal,'#coreMenu')
      }else{
        var content = '#' + tempFocus + '-content'
        $(content).text("Loading...")
          getWo(tempFocus,function(newWorkout){
            $(content).text(newWorkout)
          });
      }
      function addTr(newWorkout, toRefresh, optionalCls) {
        var delBtn = ''
        if(toRefresh != 'warmup' && toRefresh != 'cooldown'){
          delBtn = "<a class='btn btn-danger delete pull-right' href='#' onclick='rowDelete(this); return false;'>X</a>"
        }
        if(newWorkout == '' || newWorkout =="Loading..."){return false}
        $('#' + toRefresh + ' tr:last').after('<tr class="' + optionalCls + '"><td>'+ newWorkout + delBtn + "</td></tr>")
      }
    }
    //adding a row to the correct results table to the right with the given workout from getWo
    //todo might be refresh's child method
    function addTr(newWorkout, toRefresh, optionalCls) {
      var delBtn = ''
      if(toRefresh != 'warmup' && toRefresh != 'cooldown'){
        delBtn = "<a class='btn btn-danger delete pull-right' href='#' onclick='rowDelete(this); return false;'>X</a>"
      }
      if(newWorkout == '' || newWorkout =="Loading..."){return false}
      $('#' + toRefresh + ' tr:last').after('<tr class="' + optionalCls + '"><td>'+ newWorkout + delBtn + "</td></tr>")
    }

    /* Resistance Dropdown */
    //todo combine into refresh
    function updateResOption(focus, thisMenu) {
      $(thisMenu).text("Loading...")
      getWo(focus,function(newWorkout){
        $(thisMenu).text(newWorkout + ' ').append('<span class="caret"></span>')
      });
    }
  /**
   * * Two click handlers for main dropdowns (wo, focus)
   * TODO: make a parent "class" for click handlers
   */
  //click - main dropdown select for experience and type and level
  $('.wo').on("click", function(e) {
    resEdit=false;coreEdit=false;saqEdit=false;plyoEdit=false;
    resVal='',coreVal='',saqVal='',plyoVal='';
    //set global vars
    if(mobile){
      type = $(this).attr("value")
    }else{
      type = $(this).attr("value")
      level = $(this).parent().parent().parent().children()[0].text      
            //changes main button text
      $('#create-wo').text(level).append('<small>' + ' (' + this.text + ') ').append('<span class="caret"></span>')
      level = level.toLowerCase()
    }

    $('.hidden-box').show()
    $('.saq').show()
    $('.plyo').show()
    $('#saqHybrid').hide()
    $('.submenu-power').hide()
    $('.submenu-normal').show()
    $('.submenu-endurance').hide()


    //what options to show in dropdowns
    if(level == "beginner"){
      $('.saq').hide()
      $('.plyo').hide()
      $('.beginner').show()
      $('.not-beginner').hide()
    }else if(level == 'advanced' || (level == 'intermediate' && type=='power'||'strength')){
      $('#saqHybrid').show()
      $('.beginner').hide()
      $('.not-beginner').show()
    }
    if((type == 'strength' || type == 'power' && level == 'advanced')||(type == 'power' && level == 'intermediate')){
      $('#plyo-dropdown-content').show()
      $('#plyo-content').hide()
    }else{
      $('#plyo-dropdown-content').hide()
      $('#plyo-content').show()
    }

    if(type == 'power'){
      $('.submenu-power').show()
      $('.submenu-normal').hide()
    }else if(type == 'endurance'){
      $('.submenu-endurance').show()
      $('.submenu-normal').hide()
      if(level == 'intermediate' || level == 'advanced'){
        $('#plyo-dropdown-content').show()
        $('#plyo-content').hide()
      }
    }

    if((type != 'fatloss' && level == 'novice') || level == 'intermediate' || level == 'advanced'){ 
      $('#saqBtn-dropdown-content').show()
      $('#saqBtn-content').hide()   
    }else{
      $('#saqBtn-dropdown-content').hide()
      $('#saqBtn-content').show()
    }


    if(type == 'hypertrophy' || type == 'strength' || type == 'power'){
      $('#mobility').show()
    }else{
      $('#mobility').hide()
    }



    if (expSelected) {$('.expbased').remove()}
    expSelected = true;
  
    // getWo("warmup",function(woArray){
    //   woArray = JSON.parse(woArray)
    //   $.each(woArray,function(i,exer){
    //     addTr(exer, "warmup", "expbased")
    //     addTr(exer, "cooldown", "expbased")
    //   })
    // });

    getWo("core",function(woArray){
      // woArray = JSON.parse(woArray)
      // $.each(woArray,function(i,exer){
        addTr(woArray, "core", "expbased")
        // addTr(exer, "core", "expbased")
      // })
    });
    getWo.workoutObj.level = level
    getWo.workoutObj.type = type
    console.log(getWo.workoutObj)

    refresh('balance');
  })

  /**
   * Focus dropdowns
   * ! make these one class that is applied to all four dropdown options with
   * @param dropdownTitle core, saq, plyo, resistance
   * */
  //click - core dropdown 
  $('.coreDropdown').on("click", function(e) {
    coreEdit=true;
    var tagname;
    coreVal = $(this).val()
    if($(this).parent().parent().parent().children()[0].text == undefined){
      tagname = $(this).text()
    }else{
      tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
    }
    updateResOption(coreVal,'#coreMenu')
    $('#core-selected').text(tagname)
  })
  //click - saq dropdown
  $('.saqDropdown').on("click", function(e) {
    saqEdit=true;
    var tagname;
    saqVal = $(this).val()
    if($(this).parent().parent().parent().children()[0].text == undefined){
      tagname = $(this).text()
    }else{
      tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
    }
    updateResOption(saqVal,'#saqMenu')
    $('#saq-selected').text(tagname)
  })
  //click - plyo dropdown 
  $('.plyoDropdown').on("click", function(e) {
    plyoEdit=true;
    var tagname;
    plyoVal= $(this).val()
    if($(this).parent().parent().parent().children()[0].text == undefined){
      tagname = $(this).text()
    }else{
      tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
    }
    updateResOption(plyoVal,'#plyoMenu')
    $('#plyo-selected').text(tagname)
  })
  //click - resistance dropdown //? rename to resistanceDropdown
  $('.resSelection').on("click", function(e) {
    var tagname;
    resVal = $(this).val()
    if($(this).parent().parent().parent().children()[0].text == undefined){
      tagname = $(this).text()
    }else{
      tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
    }
    updateResOption(resVal,'#resistanceMenu')
    $('#resistance-selected').text(tagname)
    resEdit = true;
  })  



  //click - refresh btn for dropdowns or non-dropdown rows
  //todo make both a refresh btn with a way to toggle 'isAdd' bool
  $('.refresh').on("click", function(e) {
    refresh(this.id.slice(0, -2))
  })
  //click - add button for dropdowns or non-dropdown rows
  $('.add').on("click", function(e) {
    var tempFocus = this.id.slice(0, -2)
    var newWorkout
    var workoutTable = "workout-table-"
    workoutTable += tempFocus

    if( (tempFocus == 'resistance' && resEdit)  ||
        (tempFocus == 'plyo'&& plyoEdit))
    {
      newWorkout = $('#'+tempFocus+'Menu').text()
    }else if( (tempFocus == 'saqBtn' && saqEdit)      ||
              (tempFocus == 'coreBtn' && coreEdit))
    {
      tempFocus = tempFocus.slice(0,-3)
      newWorkout = $('#'+tempFocus+'Menu').text()
    }else{
      newWorkout = $('#'+tempFocus+'-content').text()
    }
    addTr(newWorkout, workoutTable, "")
    refresh(tempFocus)
  })



});