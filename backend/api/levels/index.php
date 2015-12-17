<?php
require_once '../../db.php';

header('Content-Type: application/json');

$query = 'select * from levels';
$result = $mysqli->query($query) or http_response_code(400) and die();

$arr = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $arr[] = $row;	
  }
}

echo json_encode($arr);
?>
