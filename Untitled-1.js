
(function($) {
  var resEdit = false;
  var expSelected = false;
  var type, level, focus;

  $(document).ready(function() {
    var mobile =window.matchMedia('screen and (max-width: 413px)').matches;

    //mobile dropdown functions
    if (mobile) {
      alert('mobile!')
      $('body')
  .off('click.dropdown touchstart.dropdown.data-api', '.dropdown')
  .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
      $('#create-wo-m').hide()
      $('.m-exp').on("click", function(e) {
        e.stopPropagation();
        $('#create-wo-m').show()
        level = $(this).attr("value")
          $('#1').show()
          $('#2').show()
          $('#functional').show()
          $('#endurance').show()
          $('#strength').show()
          $('#power').show()
        if(level == "beginner"){
          $('#functional').hide()
          $('#endurance').hide()
          $('#strength').hide()
          $('#power').hide()
        }else if(level == 'novice'){
          $('#1').hide()
          $('#2').hide()
          $('#power').hide()
        }else if(level == 'intermediate'){
          $('#1').hide()
          $('#2').hide()
        }else{
          $('#1').hide()
          $('#2').hide()
          $('#endurance').hide()
        }
      })
      $('.resistanceDropdown').on("click", function(e) {
        e.stopPropagation();
        $('#dropdownMenu1').dropdown('toggle')
      })
    }
    function getWo(focusExer,callback) {
      var queryAction = "workout_ajax";

      var workoutObj = {"level":level.toLowerCase(),"type":type.toLowerCase(),"focus":focusExer.toLowerCase()} //build query serverside
      var ajaxurl = "http://fitnessproblem.com/wp-admin/admin-ajax.php"
      var data = {
        'action': queryAction,
        'name': workoutObj
      };
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
    //main dropdown select
    $('.wo').on("click", function(e) {
      //set global vars
      if(mobile){
        type = $(this).attr("value")
      }else{
        type = $(this).attr("value")
        level = $(this).parent().parent().parent().children()[0].text      
              //changes main button text
        $('#create-wo').text(level).append('<small>' + ' (' + this.text + ') ').append('<span class="caret"></span>')
      }

      $('.hidden-box').show()
      if (expSelected) {$('.expbased').remove()}
      expSelected = true;

      getWo("warmup",function(woArray){
        woArray = JSON.parse(woArray)
        $.each(woArray,function(i,exer){
          addTr(exer, "warmup", "expbased")
          addTr(exer, "cooldown", "expbased")
        })
      });
      refresh('balance');
      refresh('coreBtn');
      refresh('saqBtn');
    })

    function refresh(tempFocus) {
      var content = '#' + tempFocus + '-content'
      $(content).text("Loading...")
      getWo(tempFocus,function(newWorkout){
        $(content).text(newWorkout)
      });
    }

    function addTr(n, toRefresh, optionalCls) {
      var delBtn = '' 
      if(toRefresh != 'warmup' && toRefresh != 'cooldown'){
        delBtn = "<a class='btn btn-danger delete pull-right' href='#' onclick='rowDelete(this); return false;'>X</a>"
      }
      if(n == '' || n =="Loading..."){return false}
      $('#' + toRefresh + ' tr:last').after('<tr class="' + optionalCls + '"><td>'+ n + delBtn + "</td></tr>")
    }

    //core, balance, saq
    $('.refresh').on("click", function(e) {
      refresh(this.id.slice(0, -2))
    })
    $('.add').on("click", function(e) {
      var newWorkout = $('#'+this.id.slice(0, -2)+'-content').text()
      var workoutTable = "workout-table-"
      workoutTable += this.id.slice(0, -2)
      addTr(newWorkout, workoutTable, "")
      refresh(this.id.slice(0, -2))
    })


    function updateResOption(focus) {
      $('#dropdownMenu1').text("Loading...")
      getWo(focus,function(newWorkout){
        $('#dropdownMenu1').text(newWorkout + ' ').append('<span class="caret"></span>')
      });
    }
    //resistance dropdown
    $('.resistanceDropdown').on("click", function(e) {
      $('#resistance-selected').text(this.text)
      updateResOption(this.text)
      resEdit = true;
    })
    //refresh
    $('#resistance-r').on("click", function(e) {
      if (resEdit) {
        updateResOption($('#resistance-selected').text())
      }
    })   
    //add
    $('.addRes').on("click", function(e) {
      if (resEdit) {
        addTr($('#dropdownMenu1').text(), "workout-table-resistance", "")
      }
    })

  });
})(jQuery);