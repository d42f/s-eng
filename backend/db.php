<?php 
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '123123';
$DB_NAME = 'skyeng_test';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

function get_body ($keys) {
  $body = json_decode(file_get_contents('php://input'), true);
  $arr = array();
  foreach ($keys as $value) {
    if (isset($body[$value])) {
      $arr[] = $body[$value];
    }
  }
  return count($arr) == count($keys) ? $arr : null;
}

function get_values ($data, $types) {
  if (count($data) != count($types)) {
    return '';
  }
  $result = array();
  foreach ($types as $i => $value) {
    switch ($types[$i]) {
      case 'date':
        $result[] = "'$data[$i]'";
        break;
      case 'string':
        $result[] = "'$data[$i]'";
        break;
      default:
        $result[] = $data[$i];
        break;
    }
  }
  return join(', ', $result);
}

function get_data_by_id ($table, $id) {
  global $mysqli;

  $query = "SELECT * FROM $table WHERE id = $id";
  $result = $mysqli->query($query);
  return $result ? $result->fetch_assoc() : null;
}

function get_teachers_by_birthdate ($from, $to) {
  global $mysqli;

  $query = "SELECT teachers.id, teachers.name, teachers.sex, teachers.phone FROM teachers INNER JOIN learners ON learners.birthday BETWEEN '$from' AND '$to' INNER JOIN relations ON teachers.id = relations.teacher_id && learners.id = relations.learner_id ORDER BY teachers.id";

  $result = $mysqli->query($query);

  if (!$result) {
    return null;
  }

  $data = array();
  if ($result->num_rows > 0) {
    $arr = array();
    while ($row = $result->fetch_assoc()) {
      if (!array_key_exists($row['id'], $arr)) {
        $arr[$row['id']] = array();
        foreach ($row as $i => $value) {
          $arr[$row['id']][$i] = $value;
        }
      }
    }
    foreach ($arr as $i => $value) {
      $data[] = $value;
    }
  }
  return $data;
}

function get_data_by_relate_id ($lr, $rr, $lr_id, $rr_id, $id) {
  global $mysqli;

  $query = "SELECT $lr.id, $lr.name, GROUP_CONCAT($rr.id) as ids, GROUP_CONCAT($rr.name) as names FROM $lr INNER JOIN relations ON $lr.id = relations.$lr_id LEFT JOIN $rr ON relations.$rr_id = $rr.id WHERE $lr.id = $id";

  $result = $mysqli->query($query);
  $data = $result ? $result->fetch_assoc() : null;
  if ($data) {
    $ids = explode(',', $data['ids']);
    $names = explode(',', $data['names']);
    $data = array();
    if (count($ids) == count($names)) {
      foreach ($ids as $i => $value) {
        if (!$ids[$i] || !$names[$i]) {
          continue;
        }
        $data[] = array(
          'id' => $ids[$i],
          "name" => $names[$i]
        );
      }
    }
    
  }
  return $result ? $data : null;
}

function put_data_by_relate_id ($lr_id, $rr_id, $id, $ids) {
  global $mysqli;

  $query = "DELETE FROM relations WHERE $lr_id = $id";
  $result = $mysqli->query($query);
  if (!$result) {
    return null;
  }

  foreach ($ids as $i => $value) {
    $query = "INSERT INTO relations ($lr_id, $rr_id) VALUES ($id, $value)";
    $result = $mysqli->query($query);
    if (!$result) {
      return null;
    }
  }
  return $ids;
}

function get_data ($table, $fields, $lr_id, $relation_id) {
  global $mysqli;

  $query = "SELECT * FROM $table LEFT JOIN relations ON $table.id = relations.$lr_id ORDER BY $table.id";
  if (isset($_REQUEST['name'])) {
    $query = "SELECT * FROM $table WHERE name LIKE '%" . $_REQUEST['name'] . "%'";
  }
  $result = $mysqli->query($query);

  if (!$result) {
    return null;
  }

  $data = array();
  if ($result->num_rows > 0) {
    $arr = array();
    while ($row = $result->fetch_assoc()) {
      if (!array_key_exists($row['id'], $arr)) {
        $arr[$row['id']] = array();
        foreach ($row as $i => $value) {
          if (in_array($i, $fields)) {
            $arr[$row['id']][$i] = $value;
          }
        }
        $arr[$row['id']]['relations'] = array();
      }
      if (array_key_exists($relation_id, $row) && $row[$relation_id]) {
        $arr[$row['id']]["relations"][] = $row[$relation_id];
      }
    }
    foreach ($arr as $i => $value) {
      $data[] = $value;
    }
  }
  return $data;
}

function post_data ($table, $fields, $types) {
  global $mysqli;

  $data = get_body($fields);

  if (is_null($data)) {
    return null;
  }

  $query = "INSERT INTO $table (" . join(', ', $fields) . ") VALUES (" . get_values($data, $types) . ")";
  $result = $mysqli->query($query);

  return $result ? get_data_by_id($table, $mysqli->insert_id) : null;
}

function put_relations_data ($id, $field, $lr_id, $rr_id) {
  global $mysqli;

  $data = get_body(array($field));
  if (is_null($data) || count($data) == 0) {
    return null;
  }

  $data = $data[0];
  return put_data_by_relate_id($lr_id, $rr_id, $id, $data);
}

function delete_data ($table) {
  global $mysqli;

  if(!isset($_REQUEST['id']) || !is_numeric($_REQUEST['id'])){
    return null;
  }
  $id = $_REQUEST['id'];
  $data = get_data_by_id($table, $id);
  $query = "DELETE FROM $table WHERE id = $id";
  $result = $mysqli->query($query);
  return $result ? $data : null;
}
?>
