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

    $query = "SELECT Name FROM Labels WHERE Address LIKE \"".$_REQUEST['Addr']."%\" LIMIT 1";
   // echo $_REQUEST['Addr'];
   //echo $query;
	$result =  mysqli_query($conn2,$query);
    
    //echo mysqli_fetch_assoc($result);
    
    if (mysqli_num_rows($result) > 0) {
       while($row = mysqli_fetch_assoc($result)) {
       echo $row["Name"];
       }
     }

  mysqli_close($conn2);
?>