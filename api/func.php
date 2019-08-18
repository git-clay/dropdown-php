<?php

class ApiDefaultController extends ApiBaseController
{
    public $method;
    public $response;


    public function __construct($method)
    {
        $this->method = $method;
        // $this->response = array(
        //     'Status' => false,
        //     'StatusCode' => 0,
        //     'StatusMessage' => 'Default'
        // );
    }

    private $status_codes = array(
        'success' => true,
        'failure' => 0,
        'missing_param' => 150,
    );

    public function init(WP_REST_Request $request)
    {
        try {
            if (!method_exists($this, $this->method)) {
                throw new Exception('No method exists', 500);
            }
            $data = $this->{$this->method}($request);
            $this->response['Status'] = $this->status_codes['success'];
            $this->response['StatusMessage'] = 'success';
            $this->response['Data'] = $data;
        } catch (Exception $e) {
            $this->response['Status'] = false;
            $this->response['StatusCode'] = $e->getCode();
            $this->response['StatusMessage'] = $e->getMessage();
        }

        return $this->response['Data'];
    }

    public function dropdown($request)
    {
        global $wpdb;

        $name = $_POST["name"];

        $exp =  $name["level"];    // ex 'novice'
        $type = $name["type"];    // 'ex functional'
        $focus = $name["focus"];   //  ex 'core'
        $json = '
        {   
            "beginner":{
                "1":{
                    "back":"back_beginner_i",
                    "balance":"balanceplyometric_functional_1_leg_stable",
                    "cardio":"cardio_cardio",
                    "chest":"chest_beginner_i",
                    "core":"core_beginner_i",
                    "low_back": "core_low_back",
                    "legs":"legs_i",
                    "shoulders":"arms_shoulders",
                    "rear_delts":"arms_rear_shoulders"
                },
                "2":{
                    "back":"back_beginner_ii",
                    "balance":"balanceplyometric_functional_1_leg_stable",
                    "cardio":"cardio_cardio",
                    "chest":"chest_beginner_ii",
                    "core":"core_beginner_ii",
                    "low_back": "core_low_back",
                    "legs":"legs_ii",
                    "shoulders":"arms_shoulders",
                    "rear_delts":"arms_rear_shoulders"
                }
            },
            "novice":{
                "fatloss":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "balance":"balanceplyometric_functional_1_leg_stable",
                    "back":"back_functional_endurance_i",
                    "cardio":"dyn_warmup_general_mobility",
                    "chest":"chest_functional_endurance_i",
                    "core":"core_functional_endurance_i",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "legs":"legs_functional_endurance_i",
                    "plyo":"balanceplyometric_beginner_stabilization_i",
                    "shoulders":"arms_shoulders",
                    "rear_delts":"arms_rear_shoulders"
                },
                "endurance":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "balance":"balanceplyometric_functional_1_leg_stable",
                    "back-f":"back_functional_endurance_i",
                    "back-s":"back_strength",
                    "cardio":"dyn_warmup_general_mobility",
                    "chest":"chest_functional_endurance_i",
                    "chest-s":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_functional_endurance_i",
                    "hamstrings":"legs_strength_hams",
                    "legs":"legs_functional_endurance_i",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "plyo":"balanceplyometric_plyo_stabilization_i",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_shoulders",
                    "shoulders":"arms_shoulders",
                    "shoulders-s":"arms_shoulders_strength",
                    "triceps":"arms_triceps"
                },
                "hypertrophy":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "back":"back_strength",
                    "balance":"balanceplyometric_strength_1_leg_stable",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "mobility":"dyn_warmup_general_mobility",
                    "plyo":"balanceplyometric_plyo_stabilization_i",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "triceps":"arms_triceps"
                },
                "strength":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "triceps":"arms_triceps",
                    "balance":"balanceplyometric_strength_1_leg_stable",
                    "back":"back_strength",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "mobility":"dyn_warmup_general_mobility",
                    "quads":"legs_strength_quads",
                    "plyo":"balanceplyometric_plyo_stabilization_i",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "total_body":"fullbody"
                }
            },
            "intermediate":{
                "fatloss":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "balance":"balanceplyometric_functional_1_leg_stable_and_2_leg_unstable",
                    "back":"back_functional_endurance_ii",
                    "cardio":"dyn_warmup_general_strength",
                    "chest":"chest_functional_endurance_ii",
                    "core":"core_functional_endurance_ii",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "legs":"legs_functional_endurance_ii",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "plyo":"balanceplyometric_beginner_stabilization_ii",
                    "rear_delts":"arms_rear_shoulders",
                    "shoulders":"arms_shoulders",
                    "total_body":"fullbody"
                },
                "endurance":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "balance":"balanceplyometric_functional_1_leg_stable_and_2_leg_unstable",
                    "back-f":"back_functional_endurance_ii",
                    "back-s":"back_strength",
                    "cardio":"dyn_warmup_general_strength",
                    "chest":"chest_functional_endurance_ii",
                    "chest-s":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_functional_endurance_ii",
                    "hamstrings":"legs_strength_hams",
                    "legs":"legs_functional_endurance_ii",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "plyo":"balanceplyometric_plyo_stabilization_ii",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_shoulders",
                    "shoulders":"arms_shoulders",
                    "shoulders-s":"arms_shoulders_strength",
                    "triceps":"arms_triceps",
                    "total_body":"fullbody"
                },
                "hypertrophy":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "back":"back_strength",
                    "balance":"balanceplyometric_strength_1_leg_stable_and_2_leg_unstable",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "mobility":"dyn_warmup_general_mobility",
                    "plyo":"balanceplyometric_plyo_strength",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "triceps":"arms_triceps",
                    "total_body":"fullbody"
                },
                "power":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "back-p":"back_power",
                    "back-s":"back_strength",
                    "balance":"balanceplyometric_power",
                    "chest-p":"chest_power",
                    "chest-s":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core-p":"core_power",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "hops_bounds":"dyn_warmup_hops_and_bounds",
                    "hybrid":"dyn_warmup_hybrid",
                    "legs-p":"legs_power",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_power",
                    "mobility":"dyn_warmup_general_mobility",
                    "olympic":"olympic_lifts",
                    "plyo":"balanceplyometric_plyo_power",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders-p":"arms_shoulders_power",
                    "shoulders-s":"arms_shoulders_strength",
                    "triceps":"arms_triceps"
                },
                "strength":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "balance":"balanceplyometric_strength_1_leg_stable_and_2_leg_unstable",
                    "back":"back_strength",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_strength",
                    "full_body":"fullbody",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "hamstrings":"legs_strength_hams",
                    "hybrid":"dyn_warmup_hybrid",
                    "quads":"legs_strength_quads",
                    "mobility":"dyn_warmup_general_mobility",
                    "olympic":"olympic_lifts",
                    "plyo":"balanceplyometric_plyo_strength",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "total_body":"fullbody",
                    "triceps":"arms_triceps"
                }
            },
            "advanced":{
                "fatloss":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "balance":"balanceplyometric_functional_2_leg_unstable_and_1_leg",
                    "back":"back_functional_endurance_iii",
                    "cardio":"dyn_warmup_general_strength",
                    "chest":"chest_functional_endurance_iii",
                    "core":"core_functional_endurance_iii",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "hybrid":"dyn_warmup_hybrid",
                    "legs":"legs_functional_endurance_iii",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "plyo":"balanceplyometric_plyo_stabilization_ii",
                    "rear_delts":"arms_rear_shoulders",
                    "shoulders":"arms_shoulders",
                    "total_body":"fullbody"
                },
                "endurance":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "balance":"balanceplyometric_functional_2_leg_unstable_and_1_leg",
                    "back-f":"back_functional_endurance_iii",
                    "back-s":"back_strength",
                    "cardio":"dyn_warmup_general_strength",
                    "chest":"chest_functional_endurance_iii",
                    "chest-s":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_functional_endurance_iii",
                    "hamstrings":"legs_strength_hams",
                    "hybrid":"dyn_warmup_hybrid",
                    "legs":"legs_functional_endurance_iii",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "plyo":"balanceplyometric_plyo_strength",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_shoulders",
                    "shoulders":"arms_shoulders",
                    "shoulders-s":"arms_shoulders_strength",
                    "triceps":"arms_triceps",
                    "total_body":"fullbody"
                },
                "hypertrophy":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "back":"back_strength",
                    "balance":"balanceplyometric_functional_2_leg_unstable_and_1_leg",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "hybrid":"dyn_warmup_hybrid",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "mobility":"dyn_warmup_general_mobility",
                    "plyo":"balanceplyometric_plyo_strength",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "triceps":"arms_triceps",
                    "total_body":"fullbody"
                },
                "power":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "back-p":"back_power",
                    "back-s":"back_strength",
                    "balance":"balanceplyometric_power",
                    "cardio":[
                        "dyn_warmup_general_strength",
                        "dyn_warmup_general_mobility"
                    ],
                    "chest-p":"chest_power",
                    "chest-s":"chest_strength",
                    "compound":"arms_compound",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "core-p":"core_power",
                    "core":"core_strength",
                    "hamstrings":"legs_strength_hams",
                    "hops_bounds":"dyn_warmup_hops_and_bounds",
                    "hybrid":"dyn_warmup_hybrid",
                    "legs-p":"legs_power",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_power",
                    "mobility":"dyn_warmup_general_mobility",
                    "olympic":"olympic_lifts",
                    "plyo":"balanceplyometric_plyo_power",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders-p":"arms_shoulders_power",
                    "shoulders-s":"arms_shoulders_strength",
                    "triceps":"arms_triceps"
                },
                "strength":{
                    "agility_ladder":"dyn_warmup_agility_ladder",
                    "biceps":"arms_biceps",
                    "balance":"balanceplyometric_functional_2_leg_unstable_and_1_leg",
                    "back":"back_strength",
                    "chest":"chest_strength",
                    "compound":"arms_compound",
                    "core":"core_strength",
                    "cone_drills":"dyn_warmup_cone_drill",
                    "full_body":"fullbody",
                    "hamstrings":"legs_strength_hams",
                    "hops_bounds":"dyn_warmup_hops_and_bounds",
                    "hybrid":"dyn_warmup_hybrid",
                    "low_back": "core_low_back",
                    "med_ball":"core_med_ball_core",
                    "mobility":"dyn_warmup_general_mobility",
                    "olympic":"olympic_lifts",
                    "plyo":"balanceplyometric_plyo_strength",
                    "quads":"legs_strength_quads",
                    "rear_delts":"arms_rear_delts",
                    "shoulders":"arms_shoulders_strength",
                    "total_body":"fullbody",
                    "triceps":"arms_triceps"
                }
            }
        }   
        ';
        $obj = json_decode($json, true);
        $data = array();
        if ($focus == "warmup") {
            if ($type == "strength" || $type == "power") {
                $tablenames = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT table_name FROM warmup WHERE is_strength_power = %d order by id",
                        1
                    )
                );
            } else {
                $tablenames = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT table_name FROM warmup WHERE is_strength_power = %d  order by id",
                        0
                    )
                );
            }
            foreach ($tablenames as $item) {
                $t = $item->{table_name};
                $r = $wpdb->get_results("SELECT Exercise FROM $t ORDER By RAND() LIMIT 1");
                $exercise = $r[0]->Exercise;
                if ($exercise != null) {
                    array_push($data, $exercise);
                }
            }
            return json_encode($data, true);
        } else {
            $table = $obj[$exp][$type][$focus];
            $data = $wpdb->get_results("SELECT Exercise FROM $table ORDER By RAND() LIMIT 1 ");
            return array_map(create_function('$o', 'return $o->Exercise;'), $data);
        }
    }
    public function saveWorkout()
    {
        global $wpdb;

        $user_id = $_POST["user_id"];

        $workout_json = $_POST["saveData"];

        $data = json_encode($workout_json, true);

        $workout_name = $workout_json["workout"];
        $client_name = $workout_json["client"];
        $workout_date = $workout_json["date"];

        $wpdb->insert('user_workout', array(
            'user_id' => $user_id,
            'workout_name' => $workout_name,
            'client_name' => $client_name,
            'workout_date' => $workout_date,
            'created_on' => current_time('mysql'),
            'workout_json' => json_encode($workout_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        ));
        return $client_name;
    }
    public function getAllClients()
    {
        global $wpdb;

        $user_id = $_GET["user_id"];

        $clientNames = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT client_name FROM user_workout WHERE user_id = %d group by client_name",
                $user_id
            )
        );

        return array_map(create_function('$o', 'return $o->client_name;'), $clientNames);
    }

    public function getAllClientWorkouts($request)
    {
        global $wpdb;

        $clientName = $_GET['client_name'];
        $user_id = $_GET["user_id"];

        $workouts = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT workout_id, workout_date, workout_name FROM user_workout WHERE user_id = %d and client_name = %s",
                $user_id,
                $clientName
            )
        );

        return json_encode($workouts, true);
    }

    public function getWorkout($request)
    {
        global $wpdb;

        $workout_id = $_GET['workout_id'];
        $workouts = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT workout_json FROM user_workout WHERE workout_id = %d ",
                $workout_id
            )
        );

        return array_map(create_function('$o', 'return $o->workout_json;'), $workouts);
    }
}
