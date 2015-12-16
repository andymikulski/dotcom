<?php
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../users/models/config.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/UserCakeLego.php");
// Dashboard page
?>

<ul class="dashboard">
	<?php
		getPlants($loggedInUser->user_id);
	?>
</ul>