<?php

// step 1
// adds data-edit attributes to text nodes

$FILES_TO_PREP = array('index');


for($i = 0; $i < count($FILES_TO_PREP); $i++){
	$name = $FILES_TO_PREP[$i];

	$dom = new DOMDocument;
	$dom->loadHTMLFile($name . '.php');

	//backup
	$dom->saveHTMLFile('_' . $name . '.php.bak');

	// Add data-edits to
	$xpath = new DOMXPath( $dom );
	$pDivs = $xpath->query(".//text()");
	foreach ( $pDivs as $div ) {
		// add
	  $div->parentNode->setAttribute( 'data-edit', 'edit-'.$name.'-'.rand(1000,9999).rand(1000,9999).rand(1000,9999) );
	  // remove
		// $div->parentNode->removeAttribute('data-edit');
	}
	$dom->saveHTMLFile($name . '.php');

	echo $name . '<br />';

}

?>