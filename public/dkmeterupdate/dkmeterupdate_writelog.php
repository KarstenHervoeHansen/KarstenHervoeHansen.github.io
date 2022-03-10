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
   

	if ((substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterUpdate ') || (substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterOnline ') || (substr($_SERVER['HTTP_USER_AGENT'], 0, 33) == 'Mozilla/3.0 (compatible; PAM PiCo'))
	{
		function getValue($key, $notSetValue = false)
		{
	    if (isset($_GET[$key]))
	    {
        	return $_GET[$key];
    	}
    	return $notSetValue;
		}

		$param1				= getValue('parameter1', 'NACK');
		$param2				= getValue('parameter2', 'NACK');

        WriteLog($param1,$param2);
        
        echo '1';
	}
	else
	{
	  echo -1;
	}	

    
?>