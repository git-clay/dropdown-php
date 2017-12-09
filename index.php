<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
  </head>
  <body>
    <style>
      .dropdown-submenu {
      position: relative;
      }
      .dropdown-submenu>.dropdown-menu {
      top: 0;
      left: 100%;
      margin-top: -6px;
      margin-left: -1px;
      -webkit-border-radius: 0 6px 6px 6px;
      -moz-border-radius: 0 6px 6px;
      border-radius: 0 6px 6px 6px;
      }
      .dropdown-submenu:hover>.dropdown-menu {
      display: block;
      }
      .dropdown-submenu>a:after {
      display: block;
      content: " ";
      float: right;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 5px 0 5px 5px;
      border-left-color: #ccc;
      margin-top: 5px;
      margin-right: -10px;
      }
      .dropdown-submenu:hover>a:after {
      border-left-color: #fff;
      }
      .dropdown-submenu.pull-left {
      float: none;
      }
      .dropdown-submenu.pull-left>.dropdown-menu {
      left: -100%;
      margin-left: 10px;
      -webkit-border-radius: 6px 0 6px 6px;
      -moz-border-radius: 6px 0 6px 6px;
      border-radius: 6px 0 6px 6px;
      }
      .label{
        margin: 0px 4px;
      }
      .display-row{
        margin:5px 0px;
      }
      .display-box{
        height: 42px;
        padding: 2px 4px;
      }
      .display-content{
        color: #333;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        height: 36px;
        margin: 0px 6px;
      }
      .resistance-drop{
        height: 36px;
        margin: 0px 6px;
        padding: 0px;
      }
      .display-content p {
        text-align: center;
      }
    </style>
    </head>
    <body>

      <div class="container">
        <div class="row">
          <div class="col-sm-5"
        <!--Dropdown-->
        <div class="row display-row">
          <div class="dropdown" style="display: inline-block;">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Create Workout<span class="caret"></span></button>
            <ul class="dropdown-menu">
              <li class="dropdown-submenu">
                <a class="dropdown-toggle" data-toggle="dropdown">Beginner</a>
                <ul class="dropdown-menu">
                  <li><a class="wo" >Level 1</a></li>
                  <li><a class="wo" >Level 2</a></li>
                  <li><a class="wo" >Cardio</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-toggle" data-toggle="dropdown">Novice</a>
                <ul class="dropdown-menu">
                  <li><a class="wo" >Functional/Fat-Loss</a></li>
                  <li><a class="wo" >Endurance/Fat-Loss</a></li>
                  <li><a class="wo" >Hypertrophy</a></li>
                  <li><a class="wo" >Strength</a></li>
                  <li><a class="wo" >Cardio</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-toggle" data-toggle="dropdown">Intermediate</a>
                <ul class="dropdown-menu">
                  <li><a class="wo" >Functional/Fat-Loss</a></li>
                  <li><a class="wo" >Endurance/Fat-Loss</a></li>
                  <li><a class="wo" >Hypertrophy</a></li>
                  <li><a class="wo" >Strength</a></li>
                  <li><a class="wo" >Power</a></li>
                  <li><a class="wo" >Cardio</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-toggle" data-toggle="dropdown">Advanced</a>
                <ul class="dropdown-menu">
                  <li><a class="wo" >Endurance/Fat-Loss</a></li>
                  <li><a class="wo" >Hypertrophy</a></li>
                  <li><a class="wo" >Strength</a></li>
                  <li><a class="wo" >Power</a></li>
                  <li><a class="wo" >Cardio</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!--End dropdown-->

        <!--Start Core-->
        <div class="row display-row">
          <span class="label label-default">Core</span><br>
          <div class="col-sm-8 display-box">
            <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="core-r"></button>
            <div class="col-sm-8 clearfix display-content" id="core-content"></div>
            <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="core-a"></button>
          </div> 
        </div>
        <!--End Core-->

        <!--Start Balance-->
        <div class="row display-row">
          <span class="label label-default">Balance</span><br>
          <div class="col-sm-8 display-box">
            <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="balance-r"></button>
            <div class="col-sm-8 clearfix display-content" id="balance-content"></div>
            <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="balance-a"></button>
          </div>
        </div>

        <!--End Balance-->

        <!--Start SAQ-->
        <div class="row display-row">
          <span class="label label-default">SAQ</span><br>
          <div class="col-sm-8 display-box">
            <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="saq-r"></button>
            <div class="col-sm-8 clearfix display-content" id="saq-content"></div>
            <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="saq-a"></button>
          </div>
        </div>

        <!--End SAQ-->

        <!--Start Resistance-->
        <div class="row display-row">
          <span class="label label-default">Resistance</span><br>
          <div class="col-sm-8 display-box">
            <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="resistance-r"></button>
            <div class="col-sm-8 clearfix resistance-drop dropdown">
                <button class="btn btn-default dropdown-toggle col-sm-12" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Resistance Options
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><a class="resistance-wo">Arms</a></li>
                  <li><a class="resistance-wo">Back</a></li>
                  <li><a class="resistance-wo">Cardio</a></li>
                  <li><a class="resistance-wo">Chest</a></li>
                  <li><a class="resistance-wo">Core</a></li>
                  <li><a class="resistance-wo">Functional</a></li>
                  <li><a class="resistance-wo">Legs</a></li>
                  <li><a class="resistance-wo">Olympic</a></li>
                  <li><a class="resistance-wo">Strength</a></li>
                  <li><a class="resistance-wo">Total Body</a></li>
                  <!--<li role="separator" class="divider"></li>
                  <li><a href="#">+ and refresh btns</a></li>-->
                </ul>
              </div>
            <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="resistance-a"></button>
          </div>
        </div>

        <!--End Resistance-->
        </div>
      <div class="col-sm-5">
        <div class="row warm-up table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Warm Up</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="workouts table-responsive">
          <table class="table table-striped">
            <tbody id="workout-table">
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div class="row cool-down table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Cool Down</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </div>
<?php
global $wpdb;
?>
      <script>
        $(document).ready(function(){
          $('.wo').on("click", function(e){
            <?php
              $results = $wpdb->get_results( 'SELECT * FROM wp_options WHERE option_id = 1', OBJECT );
            ?>
          })

          $('.refresh').on("click", function(e){
            var n = this.id
            n = n.slice(0,-2)
            var content = '#' + n + '-content'
            $(content).text("refresh "+n)
          })
          $('.add').on("click", function(e){
            var n = this.id
            n = n.slice(0,-2)
            $('#workout-table tr:last').after('<tr><td>'+n+'</td></tr>')
          })

        });
      </script>
  </body>
</html>





<?php
$fromPost = var_dump($_POST['workout']);
$fromPost[0] = 'novice';
$fromPost[1] = 'functional';
// $fromPost[2] ='core';
$fromPost[2] ='coreBtn';
​
//$post = file_get_contents('php://input'); //if JSON
​
$exp =  $fromPost[0];    //'novice'
$type = $fromPost[1];    //'functional'
$focus = $fromPost[2];   //'core'
​
​
​
$json = '{   
    "beginner":{
        "1":{
            "back":"back_beginner_i",
            "balance":"balanceplyometric_beginner_stabilization_i",
            "chest":"chest_beginner_i",
            "core":"core_beginner_i",
            "legs":"legs_i"
        },
        "2":{
            "back":"back_beginner_ii",
            "balance":"balanceplyometric_beginner_stabilization_ii",
            "chest":"chest_beginner_ii",
            "core":"core_beginner_ii",
            "legs":"legs_ii"
        },
        "cardio":"cardio_cardio"
    },
    "novice":{
        "cardio":"cardio_cardio",
        "functional":{
            "balance":"back_functional_endurance_i",
            "back":"back_functional_endurance_i",
            "chest":"chest_functional_endurance_i",
            "core":"core_functional_endurance_i",
            "legs":"legs_functional_endurance_i",
            "olympic":"olympic_lifts",
            "total body":"fullbody"
        },
        "strength":{
            "balance":"balanceplyometric_beginner_strength",
            "back":"back_strength",
            "chest":"chest_strength",
            "core":"core_strength",
            "legs":[
                "legs_strength_hams",
                "legs_strength_quads"
                ]
        }
    },
    "intermediate":{
        "cardio":"cardio_cardio",
        "functional":{
            "balance":"back_functional_endurance_ii",
            "back":"back_functional_endurance_ii",
            "chest":"chest_functional_endurance_ii",
            "core":"core_functional_endurance_ii",
            "legs":"legs_functional_endurance_ii"
        },
        "power":{
            "balance":"balanceplyometric_power",
            "back":"back_power",
            "chest":"chest_power",
            "core":"core_power",
            "legs":"legs_power"         
        },
        "strength":{
            "balance":"balanceplyometric_strength",
            "back":"back_strength",
            "chest":"chest_strength",
            "core":"core_strength",
            "legs":[
                "legs_strength_hams",
                "legs_strength_quads"
                ]
        }
    },
    "advanced":{
        "cardio":"cardio_cardio",
        "functional":{
            "balance":"back_functional_endurance_iii",
            "back":"back_functional_endurance_iii",
            "chest":"chest_functional_endurance_iii",
            "core":"core_functional_endurance_iii",
            "legs":"legs_functional_endurance_iii"
        },
        "power":{
            "balance":"balanceplyometric_power",
            "back":"back_power",
            "chest":"chest_power",
            "core":"core_power",
            "legs":"legs_power"         
        },
        "strength":{
            "balance":"balanceplyometric_strength",
            "back":"back_strength",
            "chest":"chest_strength",
            "core":"core_strength",
            "legs":[
                "legs_strength_hams",
                "legs_strength_quads"
                ]
        }
    },
    "coreBtn":  [
                "low_back",
                "med_ball_core",
                "med_ball_power"
                ],
    "saqBtn":{

    },
    "arms":[
            "biceps"
            ,"compound"
            ,"rear_delts"
            ,"rear_shoulders"
            ,"shoulders"
            ,"shoulders_strength"
            ,"triceps"
            ],
    
    "warmup":
        ["dyn_warmup_active_wrist"
        ,"dyn_warmup_agility_ladder"
        ,"dyn_warmup_cone_drill"
        ,"dyn_warmup_hip_legs"
        ,"dyn_warmup_spinal"
        ,"dyn_warmup_general_mobility"
        ,"dyn_warmup_general_strength"
        ,"dyn_warmup_hops_and_bounds"
        ,"dyn_warmup_hybrid"
        ,"dyn_warmup_lower_leg"
        ,"dyn_warmup_scapular_closed_chain"
        ,"dyn_warmup_scapular_open_chain"
        ,"dyn_warmup_scapulo_thoracic"
        ,"dyn_warmup_scapulo_thoracic_hip"
        ,"dyn_warmup_shoulder_scapula"
        ,"dyn_warmup_thoracic_spine"
        ,"dyn_warmup_thoracic_spine_mobility_smr"]

    }
';
​
$obj = json_decode($json,true);
if($focus == 'coreBtn'){
    echo $obj[$focus];
    return true;
}else{
echo $obj[$exp][$type][$focus];
}
?>