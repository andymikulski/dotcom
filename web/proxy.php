<?php
	echo file_get_contents( preg_replace('#^https?://#', '', $_REQUEST['location']) );
?>