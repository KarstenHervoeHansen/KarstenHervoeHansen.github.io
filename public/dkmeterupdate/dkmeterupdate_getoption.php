<?php
//Includer Database Config

include("rmconfig.php");

    
	function WriteLog($logtext, $logdata)
	{
	    $con   = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
		$query = "INSERT INTO logfile (text, data) VALUES ('%s', '%s')";
		$query = sprintf($query, $logtext, $logdata);
		mysqli_query($con,$query);		
		mysqli_close($con);		
	}
	
    WriteLog('getoption','start');
    
        
	//echo $_SERVER['HTTP_USER_AGENT'];

	if ((substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterUpdate ') || (substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterOnline ') || (substr($_SERVER['HTTP_USER_AGENT'], 0, 33) == 'Mozilla/3.0 (compatible; PAM PiCo'))
	{
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

		$serial					= getValue('serial', 'NACK');
		$deviceid				= getValue('deviceid', 'NACK');

		
		//echo $serial.' - ';
		//echo $deviceid.' - ';	
		
		if ( 
			 (is_numeric($deviceid)==true) && ($deviceid >= 208) && ($deviceid <= 223) &&
			 (is_numeric($serial)==true) && ($serial >= 10000)
			)
		{
    		$con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD,"n115288_swagen2"); 
    		
			$result = mysqli_query($con,"SELECT * FROM dkmeteroptions WHERE serial=".$serial." and hwid=".$deviceid." ORDER BY idx DESC");
			$count  = mysqli_num_rows($result);
			mysqli_close($con);

			if ($count>=1)
			{
				$value = mysqli_result($result,0,"sdi_in")."|".mysqli_result($result,0,"sdi_out")."|".mysqli_result($result,0,"aes_in")."|".mysqli_result($result,0,"aes_out")."|".mysqli_result($result,0,"SWA")."|".mysqli_result($result,0,"hwid_new");
				$value = $value."|".MD5("Team-MSD".$value);
			}
			else
			{
				$value = 0;
			} 		
			echo $value;
			WriteLog('getoption',$value);
		}
		else
		{
			echo -1;
		}	
	}
	else
	{
		header("HTTP/1.1 404 Not Found");
		echo "<html><head><title>404 Not Found.</title></head><body><p><H1>404 Not Found.</H1></p></body></html> ";
	}
	
    WriteLog('getoption','slut');
?>