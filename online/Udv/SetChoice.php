<?php
    //phpinfo();
    $servername = "127.0.0.1";
    $username = "n115288_MSDUser";
    $password = "^%Fr2{#iVXA.";
    $dbname = "n115288_MSD";
    
    $conn2 = mysqli_connect($servername,$username,$password,$dbname);   
  
	if (!$conn2) {
          echo "Failed".'  ';
          die("Connection failed: " . mysqli_connect_error());
    } 

    $FirstChoiceIn = $_REQUEST['FirstChoice'];
    $ChoiceIn = $_REQUEST['Choice'];

    $query = "UPDATE Window SET Choice=$ChoiceIn, FirstChoice=$FirstChoiceIn WHERE Label LIKE \"".$_REQUEST['Label']."\"";
    //echo $query;
	$result =  mysqli_query($conn2,$query);

     echo $result;

  mysqli_close($conn2);
?>