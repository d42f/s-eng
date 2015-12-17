<?php
require_once '../../db.php';

header('Content-Type: application/json');

$fields = array('name', 'sex', 'phone');
$types = array('string', 'number', 'string');
$data = null;

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $data = post_data('teachers', $fields, $types);
    break;
  case 'PUT':
    if (isset($_REQUEST['id'])) {
      $data = put_relations_data($_REQUEST['id'], 'relations', 'teacher_id', 'learner_id');
    }
    break;
  case 'DELETE':
    $data = delete_data('teachers');
    break;
  default:
    if (isset($_REQUEST['learner_id'])) {
      $data = get_data_by_relate_id('learners', 'teachers', 'learner_id', 'teacher_id', $_REQUEST['learner_id']);
      break;
    }
    if (isset($_REQUEST['learner_birthdate_from']) && isset($_REQUEST['learner_birthdate_to'])) {
      $data = get_teachers_by_birthdate($_REQUEST['learner_birthdate_from'], $_REQUEST['learner_birthdate_to']);
      break;
    }
    $data = get_data('teachers', array('id', 'name', 'sex', 'phone'), 'teacher_id', 'learner_id');
    break;
}

if (is_null($data)) {
  http_response_code(400);
  die();
}

echo json_encode($data);
?>
