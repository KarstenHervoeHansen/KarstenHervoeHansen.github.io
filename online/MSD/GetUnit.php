<?php
    $servername = "127.0.0.1";
    $username = "n115288_MSDUser";
    $password = "^%Fr2{#iVXA.";
    $dbname = "n115288_MSD";
    
    $conn2 = mysqli_connect($servername,$username,$password,$dbname);   
  
	if (!$conn2) {
          echo "Failed".'  ';
          die("Connection failed: " . mysqli_connect_error());
    } 

    $query = "SELECT * FROM Units WHERE SerialNo LIKE \"".$_REQUEST['SerialNo']."\"  AND MSDType LIKE \"".$_REQUEST['MSDType']."\"LIMIT 1";
    //echo $_REQUEST['Addr'];
	$result =  mysqli_query($conn2,$query);

    if (mysqli_num_rows($result) > 0) {
       while($row = mysqli_fetch_assoc($result)) {
       echo $row["MSDType"].';';
       echo $row["SerialNo"].';';
       echo $row["SoftwareVersion"].';';
       echo $row["FirmwareVersion"].';';
       echo $row["ESPSerialNo"].';';
       }
     } else {
	     echo "99;1";
     }

  mysqli_close($conn2);
?>