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

    $query = "SELECT * FROM Window WHERE Label LIKE \"".$_REQUEST['Label']."\" LIMIT 1";
    //echo $_REQUEST['Addr'];
	$result =  mysqli_query($conn2,$query);

    if (mysqli_num_rows($result) > 0) {
       while($row = mysqli_fetch_assoc($result)) {
       echo $row["Name"].';'.$row["Boxed"].";";
       echo $row["Xlo"].";".$row["Ylo"].";".$row["Xsize"].";".$row["Ysize"].";";
       echo $row["FrameText"].";".$row["FrameBack"].";";
       echo $row["WindowText"].";".$row["WindowBack"].";";
       echo $row["HeaderText"].";".$row["HeaderBack"].";";
       echo $row["BackInterval"].";";
       echo $row["SelectText"].";".$row["SelectBack"].";";
       echo $row["FirstChoice"].";".$row["Choice"].";";

       }
     } else {
	     echo "NOTDEFINED;1;1;1;80;3;37;34;37;34;37;30;1000;30;32;1;1";
     }

  mysqli_close($conn2);
?>