<?php
require_once '../../db.php';

header('Content-Type: application/json');

$fields = array('name', 'birthday', 'email', 'level');
$types = array('string', 'date', 'string', 'string');
$data = null;

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $data = post_data('learners', $fields, $types);
    break;
  case 'PUT':
    if (isset($_REQUEST['id'])) {
      $data = put_relations_data($_REQUEST['id'], 'relations', 'learner_id', 'teacher_id');
    }
    break;
  case 'DELETE':
    $data = delete_data('learners');
    break;
  default:
    if (isset($_REQUEST['teacher_id'])) {
      $data = get_data_by_relate_id('teachers', 'learners', 'teacher_id', 'learner_id', $_REQUEST['teacher_id']);
      break;
    }
    $data = get_data('learners', array('id', 'name', 'birthday', 'email', 'level'), 'learner_id', 'teacher_id');
    break;
}

if (is_null($data)) {
  http_response_code(400);
  die();
}

echo json_encode($data);
?>
