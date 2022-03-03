<html>
<title>Documentation</title>

<?php include '../../includes/pageinit.php'; ?>  
 
<style>
html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif;}
</style>

<?php

// define variables and set to empty values
$nameErr = $emailErr = "";
$name = $email = $comment = $company = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $nameErr = "Only letters and white space allowed"; 
    }
  }
  
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format"; 
    }
  }

  if (empty($_POST["comment"])) {
    $comment = "";
  } else {
    $comment = test_input($_POST["comment"]);
  }


}

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}

	function ValidateUser()	{
      $IpAddress 	= $_SERVER["REMOTE_ADDR"];
      $value 		= "";
      
	  // connect to the MySql server
	  $link = mysql_connect($DBHOST,"root","cd:splhcb!");
      if (!$link) { die('Could not connect: ' . mysql_error()); }
      
      // make DB_DATABASE the current database
      $db_selected = mysql_select_db("DKTwebdata", $link);
      if (!$db_selected) { die ('Can\'t use DB_DATABASE : ' . mysql_error()); }

      $result = mysql_query("SELECT Name FROM users WHERE IP='$IpAddress' ");
     
      if (mysql_numrows($result) == 1) {
         $value=mysql_result($result,0);
      }
     
      mysql_close($link);	
      
   	  return $value;
    }
    
      function WriteUser($name,$email,$company,$comment)	{
      /*
      echo $name;
      echo "<br>";
      echo $email;
      echo "<br>";
      echo $company;
      echo "<br>";
      echo $comment;
      */
      
      $IpAddress 	= $_SERVER["REMOTE_ADDR"];
      $value 		= "";
      
	  // connect to the MySql server
	  $link = mysql_connect($DBHOST,"root","cd:splhcb!");
      if (!$link) { die('Could not connect: ' . mysql_error()); }
      
      // make DB_DATABASE the current database
      $db_selected = mysql_select_db("DKTwebdata", $link);
      if (!$db_selected) { die ('Can\'t use DB_DATABASE : ' . mysql_error()); }
      
      $query = "INSERT INTO users (Name,Email,Company,Comments,IP) VALUES ('%s', '%s', '%s', '%s', '%s')";
      $query = utf8_decode(sprintf($query, mysql_real_escape_string($name), mysql_real_escape_string($email), mysql_real_escape_string($company), mysql_real_escape_string($comment), mysql_real_escape_string($IpAddress)));
 	  $result = mysql_query($query);
      
      mysql_close($link);	
      
   	  return $value;
    }
    
?>



<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-red w3-card">
    <a class="w3-bar-item w3-button w3-padding-large  w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="ToggleSideMenu()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="/" class="w3-bar-item w3-button w3-large">Home</i></a>
    
    <?php include '../horizontal/dkmeter.php'; ?>
    <?php include '../horizontal/dkt7.php'; ?>  
<!--    <?php include '../horizontal/pt0760.php'; ?>   -->
    <?php include '../horizontal/msd.php'; ?>
    <?php include '../horizontal/spg.php'; ?> 
<!--    <?php include '../horizontal/colour.php'; ?>   -->
    <?php include '../horizontal/ntp.php'; ?> 

  </div>
</div>

<!-- Navbar on small screens -->
<div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">

  <?php include '../vertical/dkmeter.php'; ?>
  <?php include '../vertical/dkt7.php'; ?> 
<!--  <?php include '../vertical/pt0760.php'; ?>    -->
<!--  <?php include '../vertical/msd.php'; ?>  -->
<!--  <?php include '../vertical/spg.php'; ?>  -->
<!--  <?php include '../vertical/colour.php'; ?>    -->
<!--  <?php include '../vertical/ntp.php'; ?>       -->

</div>

<!-- Page content -->
<div class="w3-content" style="max-width:2000px;margin-top:46px">

  <div class="w3-row w3-padding-64">
    <div class="w3-twothird w3-container">
      <h1 class="w3-text-teal">Documentation Download</h1>
      <p>Important notice. Registered non-commercial users are free to download from the dropdown list. Use the below email address to become a registered user. The documentation provided is copyright protected by the company www.hansens.dk of Denmark. Please note: The manufacture any of the listed products are subject to a royalty fee payable to www.hansens.dk upon a written accept from the company.</p>
    </div>
  </div>
  
  <?php if (ValidateUser()=="") : ?>  
    <div class="w3-row">
    <div class="w3-twothird w3-container">
      <h1 class="w3-text-teal">Become a Registered User</h1>
    </div>
  </div>

  
  <!-- Contact Section -->
  <div class="w3-container w3-padding-large w3-grey">
    <h4 id="contact"><b>User Information</b></h4>

    <hr class="w3-opacity">
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
      <div class="w3-section">
        <label>Name</label>
        <input class="w3-input w3-border" type="text" name="name" value="<?php echo $name;?>" required>
        <span class="error"> <?php echo $nameErr;?></span>        
      </div>
      <div class="w3-section">
        <label>Email</label>
        <input class="w3-input w3-border" type="text" name="email" value="<?php echo $email;?>" required>
        <span class="error"> <?php echo $emailErr;?></span>
      </div>
      <div class="w3-section">
        <label>Company</label>
        <input class="w3-input w3-border" type="text" name="company" value="<?php echo $company;?>">
      </div>
    
      <div class="w3-section">
        <label>Message to Karsten Hansen</label>
        <input class="w3-input w3-border" type="text" name="comment" value="<?php echo $comment;?>" >
      </div>

      <button type="submit" class="w3-button w3-black w3-margin-bottom"><i class="fa fa-paper-plane w3-margin-right"></i>Submit Registration</button>

    </form>
    <?php endif; ?>

<?php
  if (ValidateUser()=="") {if ($name!="") { if ($email!="") { WriteUser($name,$email,$company,$comment); }}}
?>

  <?php include '../../includes/footer.php'; ?>  
   
<!-- End Page Content -->
</div>


<?php include '../scripts/standard.php'; ?> 

</body>
</html>
