<?php
	if(!defined('APP_RAN')){
		echo file_get_contents('../min/main.flipt.txt', true);
	}else{
		echo file_get_contents('../min/main.js', true);
	}