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
    
    $query = "TRUNCATE TABLE Labels";
    //echo $query;
    $result =  mysqli_query($conn2,$query);
    
    $open = fopen('m60150.sym','r');
  
    while (!feof($open)) 
    {
       $getTextLine = fgets($open);
       
       $explodeLine = explode(" ",$getTextLine);
       
       list($Name,$Address) = $explodeLine;
       $query = "INSERT INTO Labels (`Name`,`Address`) values('".$Name."','".$Address."')";
       
       $result =  mysqli_query($conn2,$query);
    }
  
    fclose($open);
  
    mysqli_close($conn2);
    echo "SetLabels end";
?>