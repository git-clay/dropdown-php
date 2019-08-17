(function ($) {
  var mobile = window.matchMedia('screen and (max-width: 768px)').matches;

  var resEdit = false,
    coreEdit = false,
    saqEdit = false,
    plyoEdit = false;
  var resVal, coreVal, saqVal, plyoVal;
  var expSelected = false;
  var type, level;

  $(document).ready(function () {
    if (jQuery.ui && !mobile) {
      $('tbody.displayText').sortable();
    }
    getAllClients();

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

    function getWo(focusExer, callback) {
      var workoutObj = {
        level: level.toLowerCase(),
        type: type.toLowerCase(),
        focus: focusExer.toLowerCase()
      }
      getWorkoutPost(workoutObj, callback)
    }

    function refresh(tempFocus) {
      if (tempFocus == 'resistance' && resEdit) {
        updateResOption(resVal, '#resistanceMenu')
      } else if (tempFocus == 'plyo' && plyoEdit) {
        updateResOption(plyoVal, '#plyoMenu')
      } else if (tempFocus == 'saq' && saqEdit) {
        updateResOption(saqVal, '#saqMenu')
      } else if (tempFocus == 'core' && coreEdit) {
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
    /**
     * @param {string} newWorkout add this to row
     * @param {string} toRefresh tbody id to row at end
     * @param {string} optionalCls add class to new tr
     */
    function addTr(newWorkout, toRefresh, optionalCls) {
      var inputTd = '';
      if (toRefresh != 'warmup' && toRefresh != 'cooldown') {

        inputWeight = '<input type="text" placeholder="weight" class="weight col-input">'
        inputReps = '<input type="text" placeholder="reps" class="reps col-input"></input>'
        delBtn = "<a class='btn btn-danger delete glyphicon glyphicon-remove' href='#' onclick='rowDelete(this); return false;'></a>"
        inputTd = '<span class="input-td-display">' + inputReps + inputWeight + delBtn + '</span>'
      }
      if (newWorkout == '' || newWorkout == "Loading...") {
        return false
      }
      $('#' + toRefresh + ' tr:last').after('<tr class="' + optionalCls + '"><td style="vertical-align:middle">' +
        '<span class="workout-td-display">' + newWorkout + '</span>' +
        inputTd +
        "</td></tr>")
    }

    function getTableContents(tableId) {
      var res = [];
      $('#' + tableId + ' > tr >td').each(function (i, el) {
        if ($(el).children().length > 1) {
          var obj = {
            name: $(el).children('span.workout-td-display').text(),
            weight: $(el).find('.weight')[0].value,
            reps: $(el).find('.reps')[0].value
          }
          res.push(obj)
        } else {
          res.push($(el).children('span.workout-td-display').text())
        }
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
      $('.initial-actions').fadeOut('fast', function () {
        if (!mobile) {
          $('.result-card').animate({
            left: '250px',
          }, '3500', function () {
            $('.result-card').removeClass('col-md-offset-4');
            $('.result-card').addClass('animated');
            $('.input-card').fadeIn();
          })
        }
        $('.result-card-table').show();
      });

    }

    //#region click handlers
    //click - main dropdown select for experience and type and level
    $('.wo').on("click", function (e) {
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
      whatToShow();

      getWuCd("warmup");
      getWuCd("cooldown");
    })

    function whatToShow() {
      resEdit = false;
      coreEdit = false;
      saqEdit = false;
      plyoEdit = false;
      resVal = '', coreVal = '', saqVal = '', plyoVal = '';
      showInputCardAnimation();
      //set global vars



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
        $('#saq-content').hide()
        $('#saq-dropdown-content').show()
        $('#saq-dropdown-content').removeClass('hidden')
      } else {
        $('#saq-dropdown-content').hide()
        $('#saq-content').show()
        $('#saq-dropdown-content').addClass('hidden')
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
    }

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
      } else if ((tempFocus == 'saq' && saqEdit) ||
        (tempFocus == 'core' && coreEdit)) {
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

    //click - load client
    $('.client-select').on('click', function (e) {
      console.log($(this), e.target)
      $('#load-client').text(e.target.text);
      getAllClientWorkouts(e.target.text);
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
      saveWorkout({
        client: $('#client-name-input').val(),
        workout: $('#workout-name-input').val(),
        date: $('#workout-date-input').val(),
        warmup: getTableContents('warmup'),
        cooldown: getTableContents('cooldown'),
        core: getTableContents('workout-table-core'),
        balance: getTableContents('workout-table-balance'),
        plyo: getTableContents('workout-table-plyo'),
        saq: getTableContents('workout-table-saq'),
        resistance: getTableContents('workout-table-resistance'),
        note: mobile ? $('#mobile-note').val() : $('#desktop-note').val(),
        selection: {
          level: level,
          type: type
        }
      })
    })
    //#endregion

    $(document).keypress(function (e) {
      if ($("#add-workout-modal").hasClass('in') && (e.keycode == 13 || e.which == 13)) {
        $('.add-workout-modal-save').click();
      }
    });

    /** mobile click events */
    $('.drawer-tab').on('click', function () {
      $('.input-card').slideToggle();

    })


    //#region ajax
    /**
     * post to /dropdown.
     * @param { {level:string, type:string, focus:string} } workoutObj
     * @param { function } callback runs on success
     * @result calls getWo() on 200
     */
    function getWorkoutPost(workoutObj, callback, count = 0) {
      var data = {
        name: workoutObj
      };
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/dropdown",
        data: data,
        type: "POST",
        success: function (res) {
          if ((res == null || res == '') && count < 5) {
            count++
            getWorkoutPost(workoutObj.focus, callback, count)
          } else {
            callback(res)
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })
    }

    /**
     * saves workout
     * @param { 
     * {
        client: string,
        workout: string,
        date: string,
        warmup: string[],
        cooldown: string[],
        workoutMain:{
        core: string[],
        balance: string[],
        plyo: string[],
        saq: string[],
        resistance: string[]
        },
        note: string,
        selection: {
          level: string,
          type: string
        } 
      }
    } saveData data json to post to endpoint
    * @result success message => refresh method
     */
    function saveWorkout(saveData) {
      console.log(saveData)
      // jQuery.ajax({
      //   url: "http://fitt-ed.com/wp-json/api/v1/save_workout",
      //   data: {
      //     saveData: saveData
      //   },
      //   type: "POST",
      //   success: function (res) {
      //     // success message => refresh method
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.log(jqXHR, textStatus, errorThrown);
      //   }
      // })
    }

    /**
     * @result shows and updates #load-workout dropdown
     */
    function getAllClients() {
      var res = ['client 1', 'client 2', 'monkey', 'Taco']
      // todo 
      // jQuery.ajax({
      //   url: "http://fitt-ed.com/wp-json/api/v1/get_all_clients",
      //   type: "GET",
      //   success: function (res) {
      //     return res;
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.log(jqXHR, textStatus, errorThrown);
      //   }
      // })

      $.each(res, function (i, clientName) {
        $("#load-client-container ul").append(
          $('<li>').attr('class', 'dropdown-submenu').append(
            $('<a>')
            .attr('class', 'dropdown-toggle client-select')
            .attr('data-toggle', "dropdown")
            .text(clientName)
          )
        )
      })
    }

    /**
     * @param {string} clientName client selected by user
     * @result show and populate #load-workout - add click handler too
     */
    function getAllClientWorkouts(clientName) {
      var res = [{
        workout_id: 1,
        workout_date: '09/07/2019',
        workout_name: 'super cool chest workout'
      }, {
        workout_id: 2,
        workout_date: '09/09/2019',
        workout_name: 'super cool leg workout'
      }];
      // jQuery.ajax({
      //   url: "http://fitt-ed.com/wp-json/api/v1/get_all_client_workouts/" + clientName,
      //   type: "GET",
      //   success: function (res) {
      //     return res;
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.log(jqXHR, textStatus, errorThrown);
      //   }
      // })
      $.each(res, function (i, workoutInfo) {
        console.log(workoutInfo)
        $("#load-workout-container ul").append(
          $('<li>').attr('class', 'dropdown-submenu').append(
            $('<a>')
            .attr('class', 'dropdown-toggle workout-load-select')
            .attr('data-toggle', "dropdown")
            .data({
              workoutId: workoutInfo.workout_id,
              workoutName: workoutInfo.workout_name,
              workoutDate: workoutInfo.workout_date
            })
            .text(`${workoutInfo.workout_name} - ${workoutInfo.workout_date}`)
          )
        )
      })
      $('.workout-load-select').on('click', function (e) {
        getWorkout($(this).data());
      })
      $('#load-workout').show();
    }

    /**
     * @param {{workoutId:number,workoutName:string,workoutDate:string}} elementData selected workout info
     * @returns {{
        client: string,
        workout: string,
        date:string,
        warmup: string[],
        cooldown: string[],
        workoutMain:{
          core: string[],
          balance: string[],
          plyo: string[],
          saq: string[],
          resistance: string[]
        },
        note: string,
        selection: {
          level: string,
          type: string
        } 
      }}
     */
    function getWorkout(elementData) {
      var res = {
        client: 'client whatever',
        warmup: ['asdf', 'asdf2'],
        cooldown: ['fdas', 'fdasdd2'],
        workoutMain: {
          core: ['crunches'],
          balance: ['backflips', 'balance duh'],
          plyo: ['hoppies', 'pyro'],
          saq: ['asdfsasaq'],
          resistance: ['macho macho', 'sqaats']
        },
        note: 'imma note',
        selection: {
          level: 'intermediate',
          type: 'endurance'
        }
      }
      // jQuery.ajax({
      //   url: "http://fitt-ed.com/wp-json/api/v1/get_workout/" + workoutId,
      //   type: "GET",
      //   success: function (res) {
      //     return res;
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.log(jqXHR, textStatus, errorThrown);
      //   }
      // });

      $.each(res.warmup, function (i, exer) {
        addTr(exer, 'warmup')
      })
      $.each(res.cooldown, function (i, exer) {
        addTr(exer, 'cooldown')
      })
      $.each(res.workoutMain, function (key, section) {
        console.log(key)
        $.each(section, function (i, exer) {
          addTr(exer, `workout-table-${key}`)
        })
      })
      level = res.selection.level;
      type = res.selection.type;
      mobile ? $('#mobile-note').val(res.note) : $('#desktop-note').val(res.note)
      $('#client-name').text(res.client);
      $('#workout-name').text(`${elementData.workoutName} -- ${elementData.workoutDate}`);
      showInputCardAnimation();
      whatToShow();
    }
    //#endregion
  });
})(jQuery);