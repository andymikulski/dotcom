<?php

// removes data-edit id's (but preserves data-edit attr's)
$FILES_TO_PREP = array('index');


for($i = 0; $i < count($FILES_TO_PREP); $i++){
	$name = $FILES_TO_PREP[$i];

	echo $name;

	$dom = new DOMDocument;
	$dom->loadHTMLFile($name . '.php');

	//backup
	$dom->saveHTMLFile('_' . $name . '-' . time() . '.php.bak');

	// Add data-edits to
	$xpath = new DOMXPath( $dom );
	$pDivs = $xpath->query("//*[@data-edit]");
	foreach ( $pDivs as $div ) {
		// add
		$div->setAttribute( 'data-edit', NULL );
		// remove
		// $div->parentNode->removeAttribute('data-edit');
	}
	$dom->saveHTMLFile($name . '.php');

	echo " &#x2714;<br />";


}

?>