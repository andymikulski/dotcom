<?php

// sets data-edit attributes to random ID's

$FILES_TO_PREP = array('index');

for($i = 0; $i < count($FILES_TO_PREP); $i++){
	$name = $FILES_TO_PREP[$i];

	echo "Processing " . $name . ".php...<br /><br /><br />";

	$dom = new DOMDocument;
	$dom->loadHTMLFile($name . '.php');

	//backup
	$dom->saveHTMLFile('bak/_' . $name . '-' . time() . '.php.bak');

	// Add data-edits to
	$xpath = new DOMXPath( $dom );
	$pDivs = $xpath->query("//*[@data-edit]");
	foreach ( $pDivs as $div ) {
		// add
		var_dump($div);
		echo('<br /><br />');
		$div->setAttribute( 'data-edit', 'edit-'.$name.'-'.rand(1000,9999).'-'.time() );
		// remove
		// $div->parentNode->removeAttribute('data-edit');
	}
	$dom->saveHTMLFile($name . '.php');

	echo "<br /><br />" . $name . ".php &#x2714;<br />";

}

?>