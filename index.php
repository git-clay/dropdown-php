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
      #create-wo{
        position: relative;
        background:#007bff;
        width:190px;
        text-align:center;
        padding: 5px 15px;
      }
      #create-wo:hover{
        background:#02abff;
      }
.wrapper{
padding:0;
width:100%;
height: 600px;

}
a{
  text-decoration: none !important;

}
.dropdown-submenu {
position: relative;
}
li.dropdown-submenu{
list-style-type:none !important;
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
.wo>a:after {
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
text-align: center;
}
.small-dropdowns{
height: 36px;
margin: 0px 6px;
padding: 0px;
}
.blank{
display: none;
}
.hidden-box{
display: none;
padding: 5px;
width:50%;
}
table{
font-size:1.2rem;
}
tbody{
text-align: center;
}
.add{
    right:16px;
}
.addRes{
      right:16px;
}
.delete{
      height:15px;
      width:6px;
      font-size: .6em;
      text-align: center;
      color: white !important;
}
.displayText{
      font-size: .8em;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
      padding:4px;
}
@media (max-width: 412px) {
  .display-box {
    height: 95%;
  }
  #resistance-dropdown{
      height: 80%;
  }
  .display-row{
        height:70%;
  }
  .btn-warning .btn-success {
        height:85%;
        width:auto;
  }
  th{
        font-size: .8em;
  }
}
.resSelection{
      background:none!important;
      color:inherit;
      border:none; 
      padding:3px 20px;
      font: inherit;
 }
.plyoDropdown{
      background:none!important;
      color:inherit;
      border:none; 
      padding:3px 20px;
      font: inherit;
 }
.saqDropdown{
      background:none!important;
      color:inherit;
      border:none; 
      padding:3px 20px;
      font: inherit;
 }
 .coreDropdown{
      background:none!important;
      color:inherit;
      border:none; 
      padding:3px 20px;
      font: inherit;
 }
    </style>
    </head>
    <body>
    <div class="container wrapper">
  <script>

    function rowDelete(link) {
      var row = link.parentNode.parentNode;
      var table = row.parentNode;
      table.removeChild(row);
    }
  </script>
  <!--Dropdown-->

  <div class="row display-row hidden-xs">
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="create-wo">Create Workout
      </button>
      <ul class="dropdown-menu list-unstyled" id="expDropdown">
        <li class="dropdown-submenu">
          <a class="dropdown-toggle" data-toggle="dropdown">Beginner</a>
          <ul class="dropdown-menu list-unstyled">
            <li class="dropdown-submenu">
              <a class="wo" value="1">Level 1</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="2">Level 2</a>
            </li>
          </ul>
        </li>
        <li class="dropdown-submenu">
          <a class="dropdown-toggle" data-toggle="dropdown">Novice</a>
          <ul class="dropdown-menu list-unstyled">
            <li class="dropdown-submenu">
              <a class="wo" value="fatloss">Functional/Fat-Loss</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="endurance">Functional/Endurance</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="hypertrophy">Hypertrophy</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="strength">Strength</a>
            </li>
          </ul>
        </li>
        <li class="dropdown-submenu">
          <a class="dropdown-toggle" data-toggle="dropdown">Intermediate</a>
          <ul class="dropdown-menu list-unstyled">
            <li class="dropdown-submenu">
              <a class="wo" value="fatloss">Functional/Fat-Loss</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="endurance">Functional/Endurance</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="hypertrophy">Hypertrophy</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="strength">Strength</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="power">Power</a>
            </li>
          </ul>
        </li>
        <li class="dropdown-submenu">
          <a class="dropdown-toggle" data-toggle="dropdown">Advanced</a>
          <ul class="dropdown-menu list-unstyled">
            <li class="dropdown-submenu">
              <a class="wo" value="fatloss">Functional/Fat-Loss</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="endurance">Functional/Endurance</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="hypertrophy">Hypertrophy</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="strength">Strength</a>
            </li>
            <li class="dropdown-submenu">
              <a class="wo" value="power">Power</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!--Mobile dropdown-->
  <div class="row display-row hidden-sm hidden-md hidden-lg">
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="exp-m">Experience level
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu list-unstyled" id='m-list'>
        <li>
          <a href='#' class="dropdown-toggle m-exp" value="beginner">Beginner</a>
        </li>
        <li>
          <a href='#' class="dropdown-toggle m-exp" value="novice">Novice</a>
        </li>
        <li>
          <a href='#' class="dropdown-toggle m-exp" value="intermediate">Intermediate</a>
        </li>
        <li>
          <a href='#' class="dropdown-toggle m-exp" value="advanced">Advanced</a>
        </li>
      </ul>
    </div>
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="create-wo-m">Type of training
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu list-unstyled" id='wo-list'>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='1' value="1">Level 1</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='2' value="2">Level 2</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='fatloss' value="fatloss">Functional/Fat-Loss</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='endurance' value="endurance">Functional/Endurance</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id="hypertrophy" value="hypertrophy">Hypertrophy</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='strength' value="strength">Strength</a>
        </li>
        <li class="dropdown-submenu">
          <a href="#" class="wo" id='power' value="power">Power</a>
        </li>
      </ul>
    </div>
    <button class="glyphicon glyphicon-refresh btn btn-warning" onclick='location.reload()'></button>
  </div>
  <!--End dropdown-->

  <div class="col-xs-12 col-sm-3 hidden-box" id="actionBox">
    <!--Start Core-->
    <div class="row display-row">
      <span class="label label-default">Core</span>
      <span id="core-selected" class="label label-default"></span>
      <br>
      <div class="col-xs-12 display-box">
        <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="coreBtn-r"></button>
        <div class="col-xs-8 col-sm-7 clearfix dropdown small-dropdowns" id="coreBtn-dropdown-content">
          <button class="btn btn-default dropdown-toggle col-xs-12 displayText" type="button" id="coreMenu" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true">
            Core Options
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu list-unstyled" aria-labelledby="coreMenu">
            <li class="dropdown-submenu" id="">
              <button class="coreDropdown" value="core">Core</button>
            </li>
            <li class="dropdown-submenu" id="lowBackDropdown">
              <button class="coreDropdown" value="low_back">Low Back</button>
            </li>
            <li class="dropdown-submenu" id="medballDropdown">
              <button class="coreDropdown not-beginner" value="med_ball">Med Ball</button>
            </li>
            <li class="dropdown-submenu submenu-power" id="corePowerDropdown">
              <button class="coreDropdown not-beginner" value="core-p">Power</button>
            </li>
          </ul>
        </div>
        <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="coreBtn-a"></button>
      </div>
    </div>
    <!--End Core-->
    <!--Start Balance-->
    <div class="row display-row">
      <span class="label label-default">Balance</span>
      <br>
      <div class="col-xs-12 display-box">
        <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="balance-r"></button>
        <div class="col-xs-8 col-sm-7 clearfix display-content displayText" id="balance-content"></div>
        <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="balance-a"></button>
      </div>
    </div>
    <!--End Balance-->

    <!--Start plyo-->
    <div class="row display-row plyo">
      <span class="label label-default">Plyometric</span>
      <span id="plyo-selected" class="label label-default"></span>
      <br>
      <div class="col-xs-12 display-box">
        <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="plyo-r"></button>
        <div class="col-xs-8 col-sm-7 clearfix display-content displayText" id="plyo-content"></div>
        <div class="col-xs-8 col-sm-7 clearfix dropdown small-dropdowns submenu-power" id="plyo-dropdown-content">
          <button class="btn btn-default dropdown-toggle col-xs-12 displayText" type="button" id="plyoMenu" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true">
            Plyo Options
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu list-unstyled" aria-labelledby="plyoMenu">
            <li class="dropdown-submenu">
              <button class="plyoDropdown" value="hops_bounds">Hops/Bounds</button>
            </li>
            <li class="dropdown-submenu">
              <button class="plyoDropdown" value="plyo">Power</button>
            </li>
          </ul>
        </div>
        <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="plyo-a"></button>
      </div>
    </div>
    <!--End plyo-->

    <!--Start SAQ-->
    <div class="row display-row saq">
        <span class="label label-default">SAQ</span>
        <span id="saq-selected" class="label label-default"></span>
        <br>
        <div class="col-xs-12 display-box">
          <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="saqBtn-r"></button>
          <div class="col-xs-8 col-sm-7 clearfix display-content displayText submenu-normal" id="saqBtn-content"></div>
          <div class="col-xs-8 col-sm-7 clearfix dropdown small-dropdowns" id="saqBtn-dropdown-content">
            <button class="btn btn-default dropdown-toggle col-xs-12 displayText" type="button" id="saqMenu" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="true">
              SAQ Options
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu list-unstyled" aria-labelledby="saqMenu">
              <li class="dropdown-submenu">
                <button class="saqDropdown" value="agility_ladder">Agility Ladder</button>
              </li>
              <li class="dropdown-submenu">
                <button class="saqDropdown" value="cone_drills">Cone Drills</button>
              </li>
              <li class="dropdown-submenu hybrid">
                <button class="saqDropdown" value="hybrid">Hybrid</button>
              </li>
            </ul>
          </div>
          <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="saqBtn-a"></button>
        </div>
      </div>
      <!--End SAQ-->
    
    <!--Start Resistance-->
    <div class="row display-row">
      <span class="label label-default">Resistance</span>
      <span id="resistance-selected" class="label label-default"></span>
      <br>
      <div class="col-xs-12  display-box">
        <button class="glyphicon glyphicon-refresh btn btn-warning pull-left refresh" id="resistance-r"></button>
        <div class="col-xs-8 col-sm-7 clearfix dropdown small-dropdowns" id="resistance-drop">
          <button class="btn btn-default dropdown-toggle col-xs-12 displayText" type="button" id="resistanceMenu" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="true">
            Resistance Options
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu list-unstyled" aria-labelledby="resistanceMenu">
            <!-- Arms dropdown -->
            <li class="dropdown-submenu not-beginner arms">
              <a class="dropdown-toggle" data-toggle="dropdown">Arms
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu">
                  <button class="resSelection" value="biceps">Biceps</button>
                </li>
                <li class="dropdown-submenu compound">
                  <button class="resSelection" value="compound">Compound</button>
                </li>
                <li class="dropdown-submenu">
                  <button class="resSelection" value="triceps">Triceps</button>
                </li>
              </ul>
            </li>
            <!-- Back -->
            <li class="dropdown-submenu submenu-normal back-plain">
              <button class="resSelection" value="back">Back</button>
            </li>
            <li class="dropdown-submenu submenu-power back-dropdown" id='backSubMenu'>
              <a class="dropdown-toggle" data-toggle="dropdown">Back
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu">
                    <button class="resSelection endurance" value="back-f">Functional</button>
                </li>
                <li class="dropdown-submenu submenu-power">
                  <button class="resSelection" value="back-p">Power</button>
                </li>
                <li class="dropdown-submenu">
                  <button class="resSelection" value="back-s">Strength</button>
                </li>

              </ul>
            </li>
            <!-- Cardio -->
            <li class="dropdown-submenu submenu-normal cardio">
              <button class="resSelection" value="cardio">Cardio</button>
            </li>
            <!-- Chest -->
            <li class="dropdown-submenu submenu-normal chest-plain">
              <button class="resSelection" value="chest">Chest</button>
            </li>
            <li class="dropdown-submenu submenu-power chest-dropdown" id='chestSubMenu'>
              <a class="dropdown-toggle" data-toggle="dropdown">Chest
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu chest-f">
                  <button class="resSelection" value="chest">Functional</button>
                </li>
                <li class="dropdown-submenu submenu-power">
                  <button class="resSelection" value="chest-p">Power</button>
                </li>
                <li class="dropdown-submenu">
                  <button class="resSelection" value="chest-s">Strength</button>
                </li>
              </ul>
            </li>
            <!-- Core dropdown -->
            <li class="dropdown-submenu">
              <a class="dropdown-toggle" data-toggle="dropdown">Core
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu dd-core" id="">
                  <button class="resSelection" value="core">Core</button>
                </li>
                <li class="dropdown-submenu" id="">
                  <button class="resSelection" value="low_back">Low Back</button>
                </li>
                <li class="dropdown-submenu" id="">
                  <button class="resSelection not-beginner" value="med_ball">Med Ball</button>
                </li>
                <li class="dropdown-submenu submenu-power" id="">
                  <button class="resSelection not-beginner" value="core">Strength</button>
                </li>
              </ul>
            </li>
            <!-- Legs dropdown -->
            <li class="dropdown-submenu submenu-normal legs-plain">
              <button class="resSelection" value="legs">Legs</button>
            </li>
            <li class="dropdown-submenu legs-dropdown not-beginner">
              <a class="dropdown-toggle" data-toggle="dropdown">Legs
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu legs-f">
                  <button class="resSelection" value="legs">Functional</button>
                </li>
                <li class="dropdown-submenu " id="hamstringsDropdown">
                  <button class="resSelection" value="hamstrings">Hamstrings</button>
                </li>
                <li class="dropdown-submenu submenu-power " id="hopsBoundsDropdown">
                  <button class="resSelection" value="hops_bounds">Hops/Bounds</button>
                </li>
                <li class="dropdown-submenu submenu-power " id="legs-p">
                  <button class="resSelection" value="legs-p">Power</button>
                </li>
                <li class="dropdown-submenu " id="quadsDropdown">
                  <button class="resSelection" value="quads">Quads</button>
                </li>
              </ul>
            </li>
            <!-- Mobility -->
            <li class="dropdown-submenu" id="mobility">
              <button class="resSelection" value="mobility">Mobility</button>
            </li>
            <!-- Shoulders dropdown -->
            <li class="dropdown-submenu">
              <a class="dropdown-toggle" data-toggle="dropdown">Shoulders
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu submenu-endurance" id="">
                  <button class="resSelection" value="shoulders">Functional</button>
                </li>
                <li class="dropdown-submenu submenu-power" id="">
                  <button class="resSelection" value="shoulders-p">Power</button>
                </li>
                <li class="dropdown-submenu" id="">
                  <button class="resSelection" value="rear_delts">Rear Delts</button>
                </li>
                <li class="dropdown-submenu" id="shoulders">
                  <button class="resSelection" value="shoulders">Shoulders</button>
                </li>
                <li class="dropdown-submenu submenu-power" id="">
                  <button class="resSelection" value="shoulders-s">Strength</button>
                </li>
              </ul>
            </li>
            <!-- Total Body dropdown -->
            <li class="dropdown-submenu totalbody-plain">
                <button class="resSelection" value="total_body">Total Body</button>
              </li>
            <li class="dropdown-submenu totalbody-dropdown" id='totalBodySubMenu'>
              <a class="dropdown-toggle" data-toggle="dropdown">Total Body
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu list-unstyled">
                <li class="dropdown-submenu submenu-power">
                  <button class="resSelection" value="hops_bounds">Power</button>
                </li>
                <li class="dropdown-submenu">
                  <button class="resSelection" value="olympic">Olympic</button>
                </li>
                <li class="dropdown-submenu" id="totalbody">
                  <button class="resSelection" value="total_body">Total Body</button>
                </li>
              </ul>
            </li>
            <!-- end list -->
          </ul>
        </div>
        <button class="glyphicon glyphicon-plus btn btn-success pull-right add" id="resistance-a"></button>
      </div>
    </div>
    <!--End Resistance-->
  </div>
  <div class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-2 hidden-box" id="resultBox">
    <div class="">
      <div class="row table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Warm Up</th>
            </tr>
          </thead>
          <tbody id="warmup" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>
      <div class="row table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Core</th>
            </tr>
          </thead>
          <tbody id="workout-table-coreBtn" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>
      <div class="row table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody id="workout-table-balance" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>

      <div class="row table-responsive plyo">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Plyometric</th>
            </tr>
          </thead>
          <tbody id="workout-table-plyo" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>

      <div class="row table-responsive saq">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>SAQ</th>
            </tr>
          </thead>
          <tbody id="workout-table-saqBtn" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>

      <div class="row table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Resistance</th>
            </tr>
          </thead>
          <tbody id="workout-table-resistance" class="displayText">
            <tr class="blank"></tr>
          </tbody>
        </table>
      </div>


      <div class="row table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cool Down</th>
            </tr>
          </thead>
          <tbody id="cooldown" class="displayText">
            <tr class="blank"></tr>
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