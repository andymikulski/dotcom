<?php

// step 2
// removes data-edit attributes and sets text values to be the new edits

$FILES_TO_PREP = array('index');
$dbDir = 'db/';
$archiveDir = 'db/archive/';


for($i = 0; $i < count($FILES_TO_PREP); $i++){
	$name = $FILES_TO_PREP[$i];


	echo $name;



	$dom = new DOMDocument;
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput       = true;

	$dom->loadHTMLFile($name . '.php');

	$dom->saveHTMLFile('bak/' . $name . '.bak.php');

	//backup
	// $dom->saveHTMLFile('_' . $name . '.php.bak');

	// Add data-edits to
	$xpath = new DOMXPath( $dom );
	$pDivs = $xpath->query("//*[@data-edit]");
	foreach ( $pDivs as $div ) {

		// loading
		$id = $div->getAttribute('data-edit');

		$stuff = unserialize(file_get_contents($dbDir.$id));
		if($stuff !== ''){
			$div->nodeValue = urldecode($stuff['data']);

			// $div->nodeValue = urldecode($stuff['data']);
			// if (copy($dbDir . $id, $archiveDir . $id . "_" . time())) {
				// unlink($dbDir . $id);
			// }
			$div->removeAttribute('data-edit');

			echo ('.');


		}

		// $div->setAttribute( 'data-edit', 'edit-'.$name.'-'.rand(1000,9999).'-'.time() );
		// remove
		// $div->parentNode->removeAttribute('data-edit');
	}
	$dom->saveHTMLFile($name . '.php');

	echo '&#x2713; <br /><br />';

}

?>