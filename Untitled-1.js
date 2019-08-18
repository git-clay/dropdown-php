(function ($) {
  var mobile = window.matchMedia('screen and (max-width: 768px)').matches;
  var userId = $('#user_id').val();
  var resEdit = false,
    coreEdit = false,
    saqEdit = false,
    plyoEdit = false;
  var resVal, coreVal, saqVal, plyoVal;
  var expSelected = false;
  var type, level;
  var workoutId;

  $(document).ready(function () {
    if (jQuery.ui && !mobile) {
      $('tbody.displayText').sortable();
    }
    getAllClients();
    document.getElementById('workout-date-input').valueAsDate = new Date();


    //mobile dropdown functions
    if (mobile) {
      $('#resistance-drop').addClass('dropup')
      //how to handle mobile click events
      $('.m-exp').on("click", function (e) {
        e.stopPropagation();
        $('#m-list').hide()
        level = $(this).attr("value")
        $('#1').parent().hide()
        $('#2').parent().hide()
        $('#fatloss').show()
        $('#endurance').show()
        $('#strength').show()
        $('#power').show()
        $('#hypertrophy').show()

        if (level == "beginner") {
          $('#1').parent().show()
          $('#2').parent().show()
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
        $(this).parent().parent().next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
        $('#wo-list').hide()
      })
      $('.dropdown-submenu a').on("click", function (e) {
        $(this).next('ul').toggle();
        if ($(this).hasClass('right-resistance')) {
          $(this).next('ul').css('left', ' -110%');
          $(this).next('ul').css('height', '15vh');
        }
        e.stopPropagation();
        e.preventDefault();
      });
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
      var addThis = '';
      var isObj = typeof (newWorkout) == 'object';
      var name = newWorkout;
      if (toRefresh != 'warmup' && toRefresh != 'cooldown') {
        if (isObj) {
          inputWeight = `<input type="text" placeholder="weight" class="weight col-input" value="${newWorkout.weight}">`
          inputReps = `<input type="text" placeholder="reps" class="reps col-input" value="${newWorkout.reps}">`
          name = newWorkout.name;
        } else {
          inputWeight = `<input type="text" placeholder="weight" class="weight col-input">`
          inputReps = `<input type="text" placeholder="reps" class="reps col-input">`
        }
        delBtn = "<a class='btn btn-danger delete glyphicon glyphicon-remove' href='#' onclick='rowDelete(this); return false;'></a>"
        inputTd = '<span class="input-td-display">' + inputReps + inputWeight + delBtn + '</span>';
        addThis = '<tr class="' + optionalCls + '"><td style="vertical-align:middle">' +
          '<span class="workout-td-display">' + name + '</span>' +
          inputTd +
          "</td></tr>"
      } else {
        addThis = '<tr class="' + optionalCls + '"><td style="vertical-align:middle">' +
          '<span class="workout-td-display">' + name + '</span>' +
          "</td></tr>"
      }
      if (name == "Loading...") {
        return false
      }
      if (name == '') {
        addThis = '<tr style="height:6px;" class="white "><td></td></tr>'
      }
      $('#' + toRefresh + ' tr:last').after(addThis)
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
        $('.drawer-tab').fadeIn()
        $('.result-card-table').show();
        $('#wo-save').show();
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
      var levelUpper = level.substr(0, 1).toUpperCase() + level.substr(1).toLowerCase();
      var typeUpper = type.substr(0, 1).toUpperCase() + type.substr(1).toLowerCase();
      $('#workout-name-input').val(`${levelUpper} -- ${typeUpper}`);


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
        newWorkout = $('#' + tempFocus + 'Menu').text()
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
      $('.core-tag').hide()
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
      $('.saq-tag').hide()
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
      $('.plyo-tag').hide()
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
      $('.resistance-tag').hide()
      resEdit = true;
    })

    //click - toggle active class on client-name-toggle
    $('.client-name-toggle').on('click', function () {
      var clicked = $(this).text().toLowerCase();
      $(".client-name-toggle").removeClass("active");
      $(this).addClass("active");

      $('.client-name-container').hide();
      $(`#${clicked}-client-container`).show();
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
        .end();
    })
    $('.workout-modal-save').on('click', function () {
      saveWorkout({
        client: $('#client-name-input').val().toLowerCase(),
        workout: $('#workout-name-input').val().toLowerCase(),
        date: $('#workout-date-input').val(),
        warmup: getTableContents('warmup'),
        cooldown: getTableContents('cooldown'),
        workoutMain: {
          core: getTableContents('workout-table-core'),
          balance: getTableContents('workout-table-balance'),
          plyo: getTableContents('workout-table-plyo'),
          saq: getTableContents('workout-table-saq'),
          resistance: getTableContents('workout-table-resistance')
        },
        note: mobile ? $('#mobile-note').val() : $('#desktop-note').val(),
        selection: {
          level: level,
          type: type
        }
      })
    })
    $('.delete-workout-modal-confirm').on('click', function () {
      deleteWorkoutAjax();
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
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/save_workout",
        data: {
          saveData: saveData,
          user_id: userId
        },
        type: "POST",
        success: function (res) {
          $('#success-alert').show()
          setTimeout(function () {
            $('#success-alert').show()
          }, 3000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })
    }

    /**
     * @result shows and updates #load-workout dropdown
     */
    function getAllClients() {
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/get_all_clients",
        type: "GET",
        data: {
          user_id: userId
        },
        success: function (clientList) {
          if (clientList.length < 1) {
            $('#load-client').hide();
            return;
          }
          $.each(clientList, function (i, clientName) {
            $("#load-client-container ul").append(
              $('<li>').attr('class', 'dropdown-submenu').append(
                $('<a>')
                .attr('class', `dropdown-toggle client-select`)
                .attr('data-toggle', "dropdown")
                .text(clientName)
              )
            )
            $("#current-client-container ul").append(
              $('<li>').attr('class', 'dropdown-submenu').append(
                $('<a>')
                .attr('class', `dropdown-toggle client-select-save`)
                .attr('data-toggle', "dropdown")
                .text(clientName)
              )
            )
          })
          //click - load client
          $('.client-select').on('click', function (e) {
            $('#load-client').text(e.target.text);
            getAllClientWorkouts(e.target.text);
          })
          $('.client-select-save').on('click', function (e) {
            $('#load-client-save').text(e.target.text);
            $('#client-name-input').val(e.target.text)
          })
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })
    }

    /**
     * @param {string} clientName client selected by user
     * @result show and populate #load-workout - add click handler too
     */
    function getAllClientWorkouts(clientName) {
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/get_all_client_workouts",
        type: "GET",
        data: {
          user_id: userId,
          client_name: clientName
        },
        success: function (res) {
          var workouts = JSON.parse(res);
          $.each(workouts, function (i, workoutInfo) {
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
            $('.save-client-list')
          })
          $('.workout-load-select').on('click', function (e) {
            getWorkout($(this).data());
          })
          $('#load-workout').show();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })

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
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/get_workout",
        type: "GET",
        data: {
          user_id: userId,
          workout_id: elementData.workoutId
        },
        success: function (res) {
          var workout = JSON.parse(res);
          $.each(workout.warmup, function (i, exer) {
            addTr(exer, 'warmup')
          })
          $.each(workout.cooldown, function (i, exer) {
            addTr(exer, 'cooldown')
          })
          $.each(workout.workoutMain, function (key, section) {
            $.each(section, function (i, exer) {
              addTr(exer, `workout-table-${key}`)
            })
          })
          level = workout.selection.level;
          type = workout.selection.type;
          mobile ? $('#mobile-note').val(workout.note) : $('#desktop-note').val(workout.note)
          $('#client-name').text(workout.client);
          $('#client-name-input').val(workout.client);
          $('#load-client-save').text(workout.client);
          $('#workout-name').text(`${elementData.workoutName} -- ${elementData.workoutDate}`);
          var levelUpper = level.substr(0, 1).toUpperCase() + level.substr(1).toLowerCase();
          var typeUpper = type.substr(0, 1).toUpperCase() + type.substr(1).toLowerCase();
          $('#workout-name-input').val(`${levelUpper} -- ${typeUpper}`);
          workoutId = elementData.workoutId;
          $('.wo-save').show()

          previousWorkout = true;


          showInputCardAnimation();
          whatToShow();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      });

    }

    function deleteWorkoutAjax() {
      jQuery.ajax({
        url: "http://fitt-ed.com/wp-json/api/v1/delete_workout",
        type: "DELETE",
        data: {
          user_id: userId,
          workout_id: workoutId
        },
        success: function (res) {
          $('#success-alert').show()
          setTimeout(function () {
            location.reload()
          }, 3000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      })
    }
    //#endregion
  });
})(jQuery);