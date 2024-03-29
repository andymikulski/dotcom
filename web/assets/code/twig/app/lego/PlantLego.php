<?php
// Plant lego


require_once(realpath( dirname( __FILE__ ) ) . "/DatabaseLego.php");


function getScientificName($pid){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$deepQuery = mysql_query("SELECT * FROM `plants` WHERE `pid` = '" . $pid . "' AND `key` LIKE 'latin_name' LIMIT 0, 5 ") or die('error getting scientific name: ' . mysql_error());
	while ($result = mysql_fetch_array($deepQuery)){
		echo $result["value"];
	}
}

function getCommonName($pid){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$deepQuery = mysql_query("SELECT * FROM `plants` WHERE `pid` = '" . $pid . "' AND `key` LIKE 'common_name' LIMIT 0, 5 ") or die('error getting common name: ' . mysql_error());
	while ($result = mysql_fetch_array($deepQuery)){
		return $result["value"];
	}
}

function getAllPlants($page){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
		$query = mysql_query("SELECT `key` FROM `plants` WHERE `key` = 'common_name' GROUP BY pid");
		$num_rows = mysql_num_rows($query);

		$count = 15;
		$offset = ($page - 1)*$count;
		$totalPages = ceil($num_rows/$count);

		$query = mysql_query("SELECT `key`,`pid`, `value` FROM `plants` WHERE `key` = 'common_name' GROUP BY pid LIMIT $offset ,$count");/*Limit for right now*/
		$plants = array();

		while($result = mysql_fetch_assoc($query)){
			//echo mysql_num_rows($query);
			$plant = array();
			$plant['pid'] = $result['pid'];
			$plant['common_name'] = $result['value'];
			$plantQuery = mysql_query('SELECT `value` FROM plants WHERE `key` = "latin_name" AND pid='.$result['pid']);
			while($plantResults = mysql_fetch_assoc($plantQuery)){
				$plant['latin_name'] = $plantResults['value'];
			}
			array_push($plants,$plant);
		}

		//print_r($plants);

		$html = "";
		$img = "<img src='http://placekitten.com/150/150' />";
		foreach($plants as $plant){
			$name = $plant['common_name'];
			$type = $plant['latin_name'];
			$id = $plant['pid'];

			$html .= "<li data-page='$page' data-plant-id='$id' data-total='$totalPages'>
						$img
						<h2>$name</h2>
						<h3>$type</h3>
					 </li>";
		}

		echo $html;
	}

	function searchDatabase($page){
		$count = 15;
		// $page = $_REQUEST['page'];
		$offset = ($page - 1)*$count;

		$plantName = strtolower(mysql_real_escape_string($_REQUEST['plantName']));

		$query = mysql_query("SELECT `key` FROM  `plants` WHERE  `key` =  'common_name' AND  `value` LIKE  '%$plantName%'");
		$num_rows = mysql_num_rows($query);

		$totalPages = ceil($num_rows/$count);

		$query = mysql_query("SELECT `key`,`pid`,`value` FROM  `plants` WHERE  `key` =  'common_name' AND  `value` LIKE  '%$plantName%' LIMIT $offset,$count");

		$num_rows = mysql_num_rows($query);
		$plants = array('page'=>$page, 'total_pages'=>$totalPages, 'num_rows'=>$num_rows, 'plants'=>array());

		if($num_rows != 0){

			while($result = mysql_fetch_assoc($query)){
				$plant = array();
				$plantQuery = mysql_query('SELECT * FROM plants WHERE pid='.$result['pid']);
				while($plantResults = mysql_fetch_assoc($plantQuery)){
					$plant[$plantResults['key']] = $plantResults['value'];
				}
				array_push($plants['plants'],$plant);
			}

			if(array_key_exists('plantSize', $_REQUEST)){
				$index = -1;
				foreach($plants['plants'] as $plant){
					$index++;
					//echo $index;
					$size = strtolower($_REQUEST['plantSize']);
					if(array_key_exists('height', $plant)){
						if($index < 0) $index = 0;
						$plantSize = $plant['height'];
						switch($size){
							case 'small': if($plantSize > 1){
								array_splice($plants['plants'], $index,1);
								$plants['num_rows'] = $plants['num_rows'] - 1;
								$index--;
							}
								break;
							case 'medium': if($plantSize < 1 || $plantSize > 2){
								array_splice($plants['plants'], $index,1);
								$plants['num_rows'] = $plants['num_rows'] - 1;
								$index--;
							}
								break;

							case 'large': if($plantSize < 2){
								array_splice($plants['plants'], $index,1);
								$plants['num_rows'] = $plants['num_rows'] - 1;
								$index--;
							}
								break;

							default:    array_splice($plants['plants'], $index,1);
										break;
						}
					}
				}
			}

			if(array_key_exists('plantType', $_REQUEST)){
				$index = -1;
				foreach($plants['plants'] as $plant){
					$index++;
					//echo $index;
					$type = $_REQUEST['plantType'];
					if(array_key_exists('family', $plant)){
						if($index < 0) $index = 0;
						$plantType = $plant['family'];
						if($plantType != $type){
							array_splice($plants['plants'], $index,1);
							$plants['num_rows'] = $plants['num_rows'] - 1;
							$index--;
						}
					}else{
						array_splice($plants['plants'], $index,1);
						$plants['num_rows'] = $plants['num_rows'] - 1;
						$index--;
					}
				}
			}

			if(array_key_exists('plantMaintenance', $_REQUEST)){
				$index = -1;
				foreach($plants['plants'] as $plant){
					$index++;
					//echo $index;
					$level = strtolower($_REQUEST['plantMaintenance']);
					if(array_key_exists('soil', $plant)){
						if($index < 0) $index = 0;
						$soilLevel = $plant['soil'];
						switch($level){
							case 'low': //echo $soilLevel;
										if(strlen($soilLevel) != 1){
											array_splice($plants['plants'], $index,1);
											$plants['num_rows'] = $plants['num_rows'] - 1;
											$index--;
										}
										break;

							case 'medium':
										if(strlen($soilLevel) != 2){
											array_splice($plants['plants'], $index,1);
											$plants['num_rows'] = $plants['num_rows'] - 1;
											$index--;
										}
										break;

							case 'high':
										if(strlen($soilLevel) != 3){
											array_splice($plants['plants'], $index,1);
											$plants['num_rows'] = $plants['num_rows'] - 1;
											$index--;
										}
										break;
						}
					}else{
						array_splice($plants['plants'], $index,1);
						$plants['num_rows'] = $plants['num_rows'] - 1;
						$index--;
					}
				}
			}

			echo json_encode($plants);

		}else{
			echo json_encode($plants);
		}
	}

	function getFamilyTypes(){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$query = mysql_query('SELECT `key`,`value` FROM plants WHERE `key` = "family" GROUP BY pid');/*Limit for right now*/
		$types = array();

		while($result = mysql_fetch_assoc($query)){
			$type = $result['value'];
			array_push($types, $type);
		}

		$types = array_unique($types);
		//print_r($types);

		$html = "<option value='-'></option>";

		foreach($types as $type){
			$html .= "<option value='".$type."'>$type</option>";
		}

		echo $html;

	}


	function getFunFacts($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$funSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE (`key` = 'uses_notes' OR `key` = 'synonyms' OR `key` = 'edible_uses') AND `pid` = '" . $pid . "'";
		$info = array();
		$funQuery = mysql_query($funSQL) or die('Error getting fun: ' . mysql_error());
		while($funResults = mysql_fetch_assoc($funQuery)){
			$key = $funResults["key"];
			$value = $funResults["value"];
			$info[$key] = $value;
		}

		return $info;
	}

	function printFunFacts($pid){
		$info = getFunFacts($pid);

		foreach($info as $key => $value){
			$key = str_replace("_", " ", $key);
			if($value != "None known")
			{
				$value = stripBrackets($value);
				echo "<li><span>$key</span> - $value</li>";
			}
		}
	}

	function deletePlant($uid, $pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$deleteSQL = "DELETE FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `user_plants`.`uid` = '" . $uid . "' AND `user_plants`.`id` = '" . $pid . "'";
		$deleteQuery = mysql_query($deleteSQL) or die('Error deleting: ' . mysql_error());

		echo "success";
	}

	function getDetails($pid, $type){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$details = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'cultivation_details'");
		while($results = mysql_fetch_assoc($query)){
			$details = $results["value"];
		}

		$details = preg_split("/[\.]+[.\s]+/", $details);
		$string = array();

		foreach($details as $haystack){
			switch($type){
				case 'light': $searchWords = array('sunny','sun','light', 'well lit');
							  foreach($searchWords as $needle){
							  	//echo $haystack;
							  	if(strpos($haystack,$needle) !== false){
							  		$haystack = stripBrackets($haystack);
							  		array_push($string, $haystack);
							  	}
							  }

							  break;

				case 'moisture': $searchWords = array('moist','moisture','soil','pH');
							  foreach($searchWords as $needle){
							  	if(strpos($haystack,$needle) !== false){
							  		$haystack = stripBrackets($haystack);
							  		array_push($string, $haystack);
							  	}
							  }

							  break;

				case 'temp': $searchWords = array('temperature','temperatures','climate','climates','hardy','hardiness','hardyness');
							  foreach($searchWords as $needle){
							  	if(strpos($haystack,$needle) !== false){
									$haystack = stripBrackets($haystack);
							  		array_push($string, $haystack);
							  	}
							  }

							  break;
			}
		}

		$string = array_unique($string);
		$string = implode(". ",$string);

		if($string == '')$string = "No information";

		//echo $plant;
		return $string;
	}

	function getHeightInfo($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$height = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'height'");
		while($results = mysql_fetch_assoc($query)){
			$height = $results["value"];
		}

		return "<h2><strong>$height</strong> m</h2>";
	}

	function getGrowthRate($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$rate = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'flowering_time'");
		while($results = mysql_fetch_assoc($query)){
			$rate = $results["value"];
		}

		if(!$results = mysql_fetch_assoc($query)){
			$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'in_leaf'");
			while($results = mysql_fetch_assoc($query)){
				$rate = $results["value"];
			}
			$rate = explode("/", $rate);
			if(count($rate) > 1){
				$rate =  $rate[count($rate) - 1] . " - " . $rate[1];
			}
		}else{
			$rate = explode("/", $rate);
			if(count($rate) > 1){
				$rate = $rate[0] . " - " . $rate[count($rate) - 1];
			}
		}

		return "<h2><strong>$rate</strong> wks</h2>";
	}

	function getTempValue($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$range = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'hardyness'");
		while($results = mysql_fetch_assoc($query)){
			$range = $results["value"];
		}

		switch($range){
			case '1':
			case '2':
			case '3': $range = 'Low';
					  break;
			case '4':
			case '5':
			case '6':
			case '7': $range = 'Med';
					  break;
			case '8':
			case '9':
			case '10': $range = 'High';
					    break;
		}

		return $range;

	}

	function getLightValue($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$range = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'shade'");
		while($results = mysql_fetch_assoc($query)){
			$range = $results["value"];
		}

		switch($range){
			case 'N': $range = 'High';
					  break;
			case 'SN':
			case 'S': $range = 'Med';
					   break;
			case 'FS':
			case 'FSN': $range = 'Low';
						break;
		}

		return $range;
	}

	function getSeedPropagation($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$value = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'propagation_1'");
		while($results = mysql_fetch_assoc($query)){
			$value = $results["value"];
		}

		$value = stripBrackets($value);
		$value = preg_replace("/Seed - /","",$value);
		$value = ucfirst($value);

		return $value;
	}

	function getNaturalRegion($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$value = "";

		$query = mysql_query("SELECT `key`,`value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'range'");
		while($results = mysql_fetch_assoc($query)){
			$value = $results['value'];
		}

		$replacements = array('Northeast','Northwest','Southeast','Southwest','North','South','East','West');
		$patterns = array('/N\.E\./','/N\.W\./','/S\.E\./','/S\.W\./','/N\./','/S\./','/E\./','/W\./');

		$value = preg_replace($patterns, $replacements, $value);
		$value = stripBrackets($value);

		return "<p>$value</p>";
	}

	function getUses($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$value = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'uses_notes'");
		while($results = mysql_fetch_assoc($query)){
			$value = $results["value"];
		}

		$value = stripBrackets($value);

		return "<p>$value</p>";
	}

	function getMedicinalUses($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$value = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'medicinal'");
		while($results = mysql_fetch_assoc($query)){
			$value = $results["value"];
		}

		$value = stripBrackets($value);

		return "<p>$value</p>";
	}

	function getKnownHazards($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$value = "";

		$query = mysql_query("SELECT `value` FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = $pid AND `key` = 'known_hazards'");
		while($results = mysql_fetch_assoc($query)){
			$value = $results["value"];
		}

		$value = stripBrackets($value);
		return "<p>$value</p>";
	}

	function stripBrackets($string){

		$pattern = "/\[(\d+)\]|\[(\d+)+[,\s(\d+)]+\]|\[[A-Z]\]|\[(\d+)+[,\s[A-z]+]+\]/i";
		$replacement = '';

		$string = preg_replace($pattern,$replacement,$string,-1);

		return $string;
	}

	function createParagraphs($string){
	}


?>
