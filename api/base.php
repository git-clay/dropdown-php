<?php

class ApiBaseController extends WP_REST_Controller
{
    //The namespace and version for the REST SERVER
    var $my_namespace = 'api/v';
    var $my_version = '1';
    public function register_routes()
    {
        $namespace = $this->my_namespace . $this->my_version;

        register_rest_route(
            $namespace,
            '/dropdown',
            array(
                array(
                    'methods'  => 'POST',
                    'callback' => array(new ApiDefaultController('dropdown'), 'init'),
                )
            )
        );
        register_rest_route(
            $namespace,
            '/save_workout',
            array(
                array(
                    'methods'  => 'POST',
                    'callback' => array(new ApiDefaultController('saveWorkout'), 'init'),
                )
            )
        );
        register_rest_route(
            $namespace,
            '/get_all_clients',
            array(
                array(
                    'methods'  => 'GET',
                    'callback' => array(new ApiDefaultController('getAllClients'), 'init'),
                )
            )
        );
        register_rest_route(
            $namespace,
            '/get_all_client_workouts',
            array(
                array(
                    'methods'  => 'GET',
                    'callback' => array(new ApiDefaultController('getAllClientWorkouts'), 'init'),
                )
            )
        );
        register_rest_route(
            $namespace,
            '/get_workout',
            array(
                array(
                    'methods'  => 'GET',
                    'callback' => array(new ApiDefaultController('getWorkout'), 'init'),
                )
            )
        );
        register_rest_route(
            $namespace,
            '/delete_workout',
            array(
                array(
                    'methods'  => 'DELETE',
                    'callback' => array(new ApiDefaultController('deleteWorkout'), 'init'),
                )
            )
        );
    }
    // Register our REST Server
    public function hook_rest_server()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
        //add_action('rest_api_init', 'my_customize_rest_cors', 15);
    }
    public function my_customize_rest_cors()
    {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        remove_filter('rest_post_dispatch', 'rest_send_allow_header');
    }
}

$ApiBaseController = new ApiBaseController();
$ApiBaseController->hook_rest_server();
