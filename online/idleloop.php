<?php
//Includer Database Config

include("rmconfig.php");

	WriteLog('idleloop','start');
		
	function WriteLog($logtext, $logdata)
	{
	    $con   = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
		$query = "INSERT INTO logfile (text, data) VALUES ('%s', '%s')";
		$query = sprintf($query, $logtext, $logdata);
		mysqli_query($con,$query);		
		mysqli_close($con);		
	}

	
	function mysqli_result($res,$row=0,$col=0)
	{ 
    	$numrows = mysqli_num_rows($res); 
    	
    	if ($numrows && $row <= ($numrows-1) && $row >=0)
    	{
          mysqli_data_seek($res,$row);
          $resrow = (is_numeric($col)) ? mysqli_fetch_row($res) : mysqli_fetch_assoc($res);
          if (isset($resrow[$col]))
          {
            return $resrow[$col];
          }
         }
    return false;
    }

	function getValue($key, $notSetValue = false)
	{
	    if (isset($_GET[$key]))
	    {
        	return $_GET[$key];
    	}
    	return $notSetValue;
	}



	function ValidateEndTime($serialno)
	{
      $value = false;
	  // connect to the MySql server
	  $con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 

     
      $result = mysqli_query($con,"SELECT EndDate FROM validation WHERE Serial=$serialno ");
     
      if (mysqli_num_rows($result) == 1)
      {
        if (mysqli_result($result,0)>=date("Y-m-d")) {$value = true; }
      }
     
      mysqli_close($con);	
      
   	  return $value;
    }
	

	
	$deviceid=getValue('deviceid', 'NAK');
	$serial=getValue('serial', 'NAK');

	WriteLog('idleloop deviceid',$deviceid);
	WriteLog('idleloop serial',$serial);
	

	if ((is_numeric($deviceid)==true) && ($deviceid >= 208) && ($deviceid <= 223) && (is_numeric($serial)==true) && ($serial >= 10000))
	{
		WriteLog('idleloop Response', 'ACK');
		echo 'ACK';
	}
	else
	{
		WriteLog('idleloop Response','NAK');
		echo 'NAK';
	}	
	
	 WriteLog('idleloop','slut')	
?>