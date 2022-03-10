<?php
//Includer Database Config
include("rmconfig.php");


    WriteLog('Hotel registeruser','start');
	    
	function WriteLog($logtext, $logdata)
	{
	    $con   = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
		$query = "INSERT INTO logfile (text, data) VALUES ('%s', '%s')";
		$query = sprintf($query, $logtext, $logdata);
		mysqli_query($con,$query);		
		mysqli_close($con);		
	}


	//echo $_SERVER['HTTP_USER_AGENT'];

	if ((substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterUpdate ') || (substr($_SERVER['HTTP_USER_AGENT'], 0, 39) == 'Mozilla/3.0 (compatible; DKMeterOnline '))
	{
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
		$company				= getValue('company', 'NACK');
		$name						= getValue('name', 'NACK');
		$address1				= getValue('address1', 'NACK');
		$address2				= getValue('address2', 'NACK');
		$zip						= getValue('zip', 'NACK');
		$city						= getValue('city', 'NACK');
		$country				= getValue('country', 'NACK');
		$phone					= getValue('phone', 'NACK');
		$email					= getValue('email', 'NACK');
		$allowcontact		= getValue('allowcontact', 'NACK');
		$allowpromotion	= getValue('allowpromotion', 'NACK');
        

		/*
		echo $serial.' - ';
		echo $deviceid.' - ';	
		echo $company.' - ';
		echo $name.' - ';
		echo $address1.' - ';
		echo $address2.' - ';
		echo $zip.' - ';
		echo $city.' - ';
		echo $country.' - ';
		echo $phone.' - ';
		echo $email.' - ';
		echo $allowcontact.' - ';
		echo $allowpromotion.' - ';
		*/
	
		if ( 
			 (is_numeric($deviceid)==true) && ($deviceid >= 208) && ($deviceid <= 223) &&
			 (is_numeric($serial)==true) && ($serial >= 10000) &&
			 (is_numeric($allowcontact)==true) && ($allowcontact >= 0) && ($allowcontact <= 1) &&
			 (is_numeric($allowpromotion)==true) && ($allowpromotion >= 0) && ($allowpromotion <= 1) &&
			 /*($company != 'NACK') &&
			 ($name != 'NACK') &&
			 ($address1 != 'NACK') &&
			 ($address2 != 'NACK') &&
			 ($zip != 'NACK') &&
			 ($city != 'NACK') &&
			 ($phone != 'NACK') &&*/
			 ($email != 'NACK')	 
			 )
		{
			$con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE);
			
			$query = "INSERT INTO userinfo (Serial, DeviceID, Company, Name, Address1, Address2, ZIP, City, Country, Phone, EMail, AllowContact, AllowPromotion, IP, Timestamp) VALUES (%u, %u, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', %u, %u, '%s', now())";
			$query = utf8_decode(sprintf($query, $serial, $deviceid, mysqli_real_escape_string($con,$company),	mysqli_real_escape_string($con,$name), mysqli_real_escape_string($con,$address1),	mysqli_real_escape_string($con,$address2), mysqli_real_escape_string($con,$zip), mysqli_real_escape_string($con,$city), mysqli_real_escape_string($con,$country),mysqli_real_escape_string($con,$phone), mysqli_real_escape_string($con,$email), mysqli_real_escape_string($con,$allowcontact), mysqli_real_escape_string($con,$allowpromotion), $_SERVER['REMOTE_ADDR']));
			
			$result = mysqli_query($con,$query);
			
			mysqli_close($con);
			
			if (!$result) echo '0';
			else echo '1';
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
	
     WriteLog('Hotel registeruser','slut');
?>