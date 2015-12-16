<?php

// Connects the back end to the front end
// In this case, handles flat file stuff in the database

error_reporting(0);

$dbDir = realpath( dirname( __FILE__ ) ) . "/db/";
$archiveDir = $dbDir . "archive/";
// chmod($dbDir,0755);
// chmod($archiveDir,0755);

switch($_REQUEST['a']){
	case 'save':
		$id = $_REQUEST['id'];
		$data = $_REQUEST['data'];
		$savedInfo = array("id" => $id,
				"data" => $_REQUEST['data']);
		file_put_contents($dbDir.$id,serialize($savedInfo));
		break;

	case 'load':
		$id = $_REQUEST['id'];

		// $info = array();
		$stuff = unserialize(file_get_contents($dbDir.$id));		
		if($stuff !== ''){
			echo json_encode($stuff);
		}else{
			echo false;
		}
		break;

	case 'reset':
		$id = $_REQUEST['id'];

		if (copy($dbDir . $id, $archiveDir . $id . "_" . time())) {
			unlink($dbDir . $id);
		}		
		break;

	default:
		echo "what is this - " . $_REQUEST['a'];
		break;
}


?>