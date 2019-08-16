(function ($) {
  var mobile = window.matchMedia('screen and (max-width: 768px)').matches;

  var resEdit = false,
    coreEdit = false,
    saqEdit = false,
    plyoEdit = false;
  var resVal, coreVal, saqVal, plyoVal;
  var expSelected = false;
  var type, level, focus;

  $(document).ready(function () {
    if (jQuery.ui && !mobile) {
      $('tbody.displayText').sortable();
    }

    //mobile dropdown functions
    if (mobile) {
      //how to handle mobile click events
      $('.m-exp').on("click", function (e) {
        e.stopPropagation();
        $('#m-list').hide()
        level = $(this).attr("value")
        $('#1').hide()
        $('#2').hide()
        $('#fatloss').show()
        $('#endurance').show()
        $('#strength').show()
        $('#power').show()
        $('#hypertrophy').show()

        if (level == "beginner") {
          $('#1').show()
          $('#2').show()
          $('#fatloss').hide()
          $('#endurance').hide()
          $('#strength').hide()
          $('#hypertrophy').hide()
          $('#power').hide()
          $('#power').hide()
        } else if (level == 'intermediate') {

        } else {}
        $('#exp-m').text(level)
      })
      //how to handle type selection - mobile
      $('.wo').on("click", function (e) {
        e.stopPropagation();
        $('#wo-list').hide()
      })
    } else {
      $('#create-wo-m').hide()
    }

    function getWo(focusExer, callback, count) {
      var queryAction = "workout_ajax";
      var workoutObj = {
        "level": level.toLowerCase(),
        "type": type.toLowerCase(),
        "focus": focusExer.toLowerCase()
      } //build query serverside
      var ajaxurl = "http://fitt-ed.com/wp-json/api/v1/dropdown"
      var data = {
        'action': queryAction,
        'name': workoutObj
      };

      var request = jQuery.ajax({
        url: ajaxurl,
        data: data,
        type: "POST",
        success: function (res) {
          if ((res == null || res == '') && count < 5) {
            count++
            getWo(focusExer, callback, count)
          } else {
            callback(res)
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })
    }

    function refresh(tempFocus) {
      if (tempFocus == 'resistance' && resEdit) {
        updateResOption(resVal, '#resistanceMenu')
      } else if (tempFocus == 'plyo' && plyoEdit) {
        updateResOption(plyoVal, '#plyoMenu')
      } else if (tempFocus == 'saqBtn' && saqEdit) {
        updateResOption(saqVal, '#saqMenu')
      } else if (tempFocus == 'coreBtn' && coreEdit) {
        updateResOption(coreVal, '#coreMenu')
      } else {
        var content = '#' + tempFocus + '-content'
        tempFocus = tempFocus.replace('Btn', '')
        if (tempFocus == 'saq') {
          tempFocus = 'agility_ladder'
        }

        $(content).text("Loading...")
        getWo(tempFocus, function (newWorkout) {
          $(content).text(newWorkout)
        }, 0);
      }
    }

    function addTr(newWorkout, toRefresh, optionalCls) {
      var delBtn = '',
        inputWeight = '',
        inputReps = '';
      if (toRefresh != 'warmup' && toRefresh != 'cooldown') {
        inputWeight = '<input type="text" placeholder="weight" class="weight">'
        inputReps = '<input type="text" placeholder="reps" class="reps"></input>'
        delBtn = "<a class='btn btn-danger delete pull-right glyphicon glyphicon-remove' href='#' onclick='rowDelete(this); return false;'></a>"
      }
      if (newWorkout == '' || newWorkout == "Loading...") {
        return false
      }
      $('#' + toRefresh + ' tr:last').after('<tr class="' + optionalCls + '"><td>' + newWorkout + inputWeight + inputReps + delBtn + "</td></tr>")
      $('.weight').css('color', 'black');
      $('.reps').css('color', 'black');
    }

    function getTableContents(tableId) {
      var res = [];
      $('#' + tableId + ' > tr >td').each(function (i, el) {
        var obj = {
          name: $(el).text(),
          weight: $(el).children('input.weight')[0].value,
          reps: $(el).children('input.reps')[0].value
        }
        res.push(obj)
      })
      return res;
    }
    /* Resistance Dropdown */
    function updateResOption(focus, thisMenu) {
      $(thisMenu).text("Loading...")
      getWo(focus, function (newWorkout) {
        $(thisMenu).text(newWorkout + ' ').append('<span class="caret"></span>')
      }, 0);
    }

    function showInputCardAnimation() {
      $('.initial-actions').fadeOut();

      if (!mobile) {
        $('.result-card').animate({
          left: '250px',
        }, '3500', function () {
          $('.result-card').removeClass('col-md-offset-4');
          $('.result-card').addClass('animated');
          $('.input-card').fadeIn();
        })
      }
    }

    /**
     * click handlers
     */

    //click - main dropdown select for experience and type and level
    $('.wo').on("click", function (e) {
      resEdit = false;
      coreEdit = false;
      saqEdit = false;
      plyoEdit = false;
      resVal = '', coreVal = '', saqVal = '', plyoVal = '';
      showInputCardAnimation();
      //set global vars
      if (mobile) {
        type = $(this).attr("value")
        $('#create-wo-m').text(type)
      } else {
        type = $(this).attr("value")
        level = $(this).parent().parent().parent().children()[0].text
        //changes main button text
        $('#create-wo').text(level).append('<small>' + ' (' + this.text + ') ').append('<span class="caret"></span>')
        level = level.toLowerCase()
      }

      $('.result-card-table').show();

      $('.action-area').show();
      $('.saq').show()
      $('.plyo').show()
      $('.submenu-power').hide()
      $('.submenu-normal').show()
      $('.submenu-endurance').hide()
      $('.dd-core').show()
      $('.endurance').hide()
      $('.arms').show()
      $('.beginner').hide()
      $('.not-beginner').show()
      $('.cardio').show()
      $('.legs-f').hide()
      $('.legs-plain').show()
      $('.totalbody-dropdown').hide()
      $('.totalbody-plain').hide()
      $('.legs-p').hide()

      //what options to show in dropdowns
      if (level == "beginner") {
        $('.saq').hide()
        $('.plyo').hide()
        $('.beginner').show()
        $('.not-beginner').hide()
      } else {
        $('.legs-plain').hide()
        $('.legs-dropdown').show()
      }


      if (((type == 'strength' || type == 'power') && level == 'advanced') || (type == 'power' && level == 'intermediate')) {
        $('#plyo-dropdown-content').show()
        $('#plyo-content').hide()
      } else {
        $('#plyo-dropdown-content').hide()
        $('#plyo-content').show()
      }

      // type only switches
      if (type == 'power') {
        $('.submenu-power').show()
        $('.submenu-normal').hide()
        $('.arms').hide()
      } else if (type == 'endurance') {
        $('.submenu-endurance').show()
        $('.endurance').show()
        $('.back-plain').hide()
        $('.back-dropdown').show()
        $('.legs-f').show()
      } else if (type == 'fatloss') {
        $('.arms').hide()
        $('.legs-plain').show()
        $('.legs-dropdown').hide()
      } else if (type == 'hypertrophy') {
        $('.cardio').hide()
      } else if (type == 'strength') {
        $('.cardio').hide()
      }

      if ((type != 'fatloss' && level == 'novice') || level == 'intermediate' || level == 'advanced') {
        $('#saqBtn-content').hide()
        $('#saqBtn-dropdown-content').show()
        $('#saqBtn-dropdown-content').removeClass('hidden')
      } else {
        $('#saqBtn-dropdown-content').hide()
        $('#saqBtn-content').show()
        $('#saqBtn-dropdown-content').addClass('hidden')
      }


      if (type == 'hypertrophy' || type == 'strength' || type == 'power') {
        $('#mobility').show()
      } else {
        $('#mobility').hide()
      }

      if (level == 'advanced' || ((type == 'power' || type == 'strength') && level == 'intermediate')) {
        $('.hybrid').show()
      } else {
        $('.hybrid').hide()
      }

      if (type == 'endurance' || (type == 'hypertrophy' && level != 'novice') || (type == 'strength' && level == 'advanced')) {
        $('.compound').show()
      } else {
        $('.compound').hide()
      }

      //totalbody section
      if ((type == 'power' || type == 'strength') && (level == 'intermediate' || level == 'advanced')) {
        $('.totalbody-dropdown').show()
        $('.totalbody-plain').hide()
      } else if (level == 'intermediate' || level == 'advanced' || (level == 'novice' && type == 'strength')) {
        $('.totalbody-dropdown').hide()
        $('.totalbody-plain').show()
      }

      if ((level == 'advanced' && (type != 'fatloss' && type != 'strength' && type != 'hypertrophy')) || ((level == 'intermediate' || level == 'novice') && type == 'endurance') || (type == 'power' && level != 'novice')) {
        $('.chest-dropdown').show()
        $('.chest-plain').hide()
      } else {
        $('.chest-plain').show()
        $('.chest-dropdown').hide()
      }

      if (type == 'power' && (level == 'intermediate' || level == 'advanced')) {
        $('.legs-p').show()
        $('.chest-f').hide()
        $('#shoulders').hide()
        $('#totalbody').hide()
        if (level == 'intermediate') {
          $('#hopsBoundsDropdown').hide()
        } else {
          $('#hopsBoundsDropdown').show()
          $('.cardio').show()
        }
      } else {
        $('#shoulders').show()
        $('#totalbody').show()
      }

      if (expSelected) {
        $('.expbased').remove()
      }
      expSelected = true;

      getWuCd("warmup");
      getWuCd("cooldown");
    })

    function getWuCd(section) {
      $("#" + section).empty();
      $("#" + section).append('<tr class="blank"></tr>')
      getWo("warmup", function (woArray) {
        woArray = JSON.parse(woArray)
        $.each(woArray, function (i, exer) {
          addTr(exer, section, "expbased")
        })
      }, 0);
    }
    // reset warmup / cooldown
    $('.reset-warmup').on("click", function (e) {
      getWuCd("warmup");
    })
    $('.reset-cooldown').on("click", function (e) {
      getWuCd("cooldown");
    })

    //click - refresh btn for dropdowns or non-dropdown rows
    $('.refresh').on("click", function (e) {
      refresh(this.id.slice(0, -2))
    })
    //click - add button for dropdowns or non-dropdown rows
    $('.add').on("click", function (e) {
      var tempFocus = this.id.slice(0, -2)
      var newWorkout
      var workoutTable = "workout-table-"
      workoutTable += tempFocus

      if ((tempFocus == 'resistance' && resEdit) ||
        (tempFocus == 'plyo' && plyoEdit)) {
        newWorkout = $('#' + tempFocus + 'Menu').text()
      } else if ((tempFocus == 'saqBtn' && saqEdit) ||
        (tempFocus == 'coreBtn' && coreEdit)) {
        newWorkout = $('#' + tempFocus.slice(0, -3) + 'Menu').text()
      } else {
        newWorkout = $('#' + tempFocus + '-content').text()
      }
      addTr(newWorkout, workoutTable, "")
      refresh(tempFocus)
    })
    //click - add break
    $('.add-break').on("click", function (e) {
      var section = this.id.slice(0, -6)
      var workoutTable = "workout-table-" + section
      $('#' + workoutTable + ' tr:last').after('<tr style="height:6px;" class="white "><td></td></tr>')

    })

    //click - core dropdown 
    $('.coreDropdown').on("click", function (e) {
      coreEdit = true;
      var tagname;
      coreVal = $(this).val()
      if ($(this).parent().parent().parent().children()[0].text == undefined) {
        tagname = $(this).text()
      } else {
        tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
      }
      updateResOption(coreVal, '#coreMenu')
      $('#core-selected').text(tagname)
    })

    //click - saq dropdown
    $('.saqDropdown').on("click", function (e) {
      saqEdit = true;
      var tagname;
      saqVal = $(this).val()
      if ($(this).parent().parent().parent().children()[0].text == undefined) {
        tagname = $(this).text()
      } else {
        tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
      }
      updateResOption(saqVal, '#saqMenu')
      $('#saq-selected').text(tagname)
    })

    //click - plyo dropdown 
    $('.plyoDropdown').on("click", function (e) {
      plyoEdit = true;
      var tagname;
      plyoVal = $(this).val()
      if ($(this).parent().parent().parent().children()[0].text == undefined) {
        tagname = $(this).text()
      } else {
        tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
      }
      updateResOption(plyoVal, '#plyoMenu')
      $('#plyo-selected').text(tagname)
    })
    //click -resistance dropdown
    $('.resSelection').on("click", function (e) {
      var tagname;
      resVal = $(this).val()
      if ($(this).parent().parent().parent().children()[0].text == undefined) {
        tagname = $(this).text()
      } else {
        tagname = $(this).parent().parent().parent().children()[0].text + ' - ' + $(this).text()
      }
      updateResOption(resVal, '#resistanceMenu')
      $('#resistance-selected').text(tagname)
      resEdit = true;
    })


    /** MODALS */
    $('.add-custom').on('click', function (event) {
      var section = $(this).attr('id').slice(0, -7)
      $('.add-workout-modal-save').attr("id", section + '-save')
      setTimeout(function () {
        $('#save-modal-input').focus()
      }, 500);
      $('#save-modal-input').val('')

    })
    $('.add-workout-modal-close').on('click', function () {
      $('#save-modal-input').val('')
    })

    $('.add-workout-modal-save').on('click', function (e) {
      var section = this.id.slice(0, -5)
      var workoutName = $('#save-modal-input').val()
      var workoutTable = "workout-table-" + section
      addTr(workoutName, workoutTable, "")
    })
    $('#save-workout-modal').on('hidden.bs.modal', function (e) {
      $(this)
        .find("input,textarea,select")
        .val('')
        .end()
        .end();
    })
    $('.workout-modal-save').on('click', function () {
      var warmupArr, cooldownArr, coreArr, balanceArr, plyoArr, saqArr, resistanceArr, note;
      var sectionList = []
      var level, type, focus;
      var json = {
        client: $('#client-name').val(),
        warmup: getTableContents('warmup'),
        cooldown: getTableContents('cooldown'),
        core: getTableContents('workout-table-coreBtn'),
        balance: getTableContents('workout-table-balance'),
        plyo: getTableContents('workout-table-plyo'),
        saq: getTableContents('workout-table-saqBtn'),
        resistance: getTableContents('workout-table-resistance'),
        note: mobile ? $('#mobile-note').val() : $('#desktop-note').val()
      }
      console.log(getTableContents('workout-table-coreBtn'))

      var data = {
        'saveData': json,
      };
      console.log(data)

      // var request = jQuery.ajax({
      //   url: "http://fitt-ed.com/wp-json/api/v1/save_workout",
      //   data: data,
      //   type: "POST",
      //   success: function (res) {
      //     // if ((res == null || res == '') && count < 5) {
      //     //   count++
      //     //   getWo(focusExer, callback, count)
      //     // } else {
      //     //   callback(res)
      //     // }
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.log(jqXHR, textStatus, errorThrown);
      //   }
      // })
    })



    $(document).keypress(function (e) {
      if ($("#add-workout-modal").hasClass('in') && (e.keycode == 13 || e.which == 13)) {
        $('.add-workout-modal-save').click();
      }
    });

    /** mobile click events */
    $('.drawer-tab').on('click', function () {
      $('.input-card').slideToggle();

    })


  });
})(jQuery);