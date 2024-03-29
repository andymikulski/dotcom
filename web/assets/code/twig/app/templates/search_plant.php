<?php

// Sidebar search page
error_reporting(E_ALL);
 ini_set("display_errors", 1);

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/PlantLego.php");

?>



<div id="search">
	<div class="searchButton"></div>
	<div class="searchForm">
		<form id="searchDatabase">
			<input type="input" id="plantName" name="plantName" placeholder="Search"></input>
		</form>
	</div>
	<div class="advancedButton"></div>
</div>
<div id="results">
	<div id="advancedOptions">
		<ul>
			<li>
				<div class="option type" data-search="type">
					<div class="left">
						<h2>Plant Type</h2>
						<h3>none</h3>
						<select id="plantType" name="plantType" form="searchDatabase">
							<?php getFamilyTypes() ?>
						</select>
					</div>
					<div class="right typeImage"></div>
				</div>
			</li>
			<li>
				<div class="option size" data-search="size">
					<div class="left">
						<h2>Plant Size</h2>
						<h3>none</h3>
						<select id="plantSize" name="plantSize" form="searchDatabase">
							<option value="-"></option>
							<option name="small" value="Small">Small</option>
							<option name="medium" value="Medium">Medium</option>
							<option name="large" value="Large">Large</option>
						</select>
					</div>
					<div class="right sizeImage"></div>
				</div>
			</li>
			<li>
				<div class="option maintenance" data-search="maintenance">
					<div class="left">
						<h2>Maintenance</h2>
						<h3>none</h3>
						<select id="plantMaintenance" name="plantMaintenance" form="searchDatabase">
							<option value="-"></option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
					</div>
					<div class="right maintenanceImage"></div>
				</div>
			</li>
		</ul>
	</div>
	<div id="plantResults">
		<div id="searchDefault">
			<div class='image'></div>
			<h2>Browse our Library</h2>
			<p>Start searching by typing a plant name<br/>Tap the arrow to search by filters</p>
		</div>
		<ul class="returnList"></ul>
	</div>
</div>