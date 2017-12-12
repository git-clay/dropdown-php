https://git-clay.github.io/dropdown-php/index.html


[wce_code id=2]
[wce_code id=1] css
[wce_code id=3] js footer
[wce_code id=4] php

<?php
    $hostelName =mysql_escape_string($_GET['name']);

    $sql = "SELECT * FROM core_power ORDER BY rand() LIMIT 1";

    $query = mysql_query($sql);

while($row = mysql_fetch_array($query)){
    echo json_encode($row[0]);
}
?>

<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'test' : echo "asdfasdfasdf";break;
        case 'blah' : blah();break;
        // ...etc...
    }
}
?>
P0werCl3an23

[wce_code id=1] css
[wce_code id=2] js
[wce_code id=3] php