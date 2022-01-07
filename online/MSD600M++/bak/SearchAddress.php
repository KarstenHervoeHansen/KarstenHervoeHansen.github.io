<?php
    //phpinfo();
    $servername = "192.168.1.10";
    $username = "pi";
    $password = "Voochakish";
    $dbname = "MSD";
    
    $conn2 = mysqli_connect($servername,$username,$password,$dbname);   
  
	if (!$conn2) {
          echo "Failed".'  ';
          die("Connection failed: " . mysqli_connect_error());
    } 

    $query = "SELECT Address FROM Labels WHERE Address LIKE \"".$_REQUEST['Addr']."\" AND Name LIKE \"".$_REQUEST['Name']."%\" LIMIT 1";
    //echo $query;
	$result =  mysqli_query($conn2,$query);

    if (mysqli_num_rows($result) > 0) {
       while($row = mysqli_fetch_assoc($result)) {
       echo $row["Address"];
       }
     }

  mysqli_close($conn2);
?>