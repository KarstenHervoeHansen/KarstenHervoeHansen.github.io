<?php
//Includer Database Config

include("rmconfig.php");

		
	function WriteLog($logtext, $logdata)
	{
	    $con   = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
		mysqli_query($con,"INSERT INTO logfile (text, data) VALUES ('".$logtext."','".$logdata."')");		
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

	function GetUpdateInfo($deviceid, $packageid)
	{
			$con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
			
			$result = mysqli_query($con,"SELECT * FROM updates WHERE deviceid=".$deviceid);
			$count  = mysqli_num_rows($result);
			
			mysqli_close($con);
				
			if ($count>=1)
			{
				$factorypath = mysqli_result($result,0,"FactoryPath");
				$updatepath  = mysqli_result($result,0,"UpdatePath");
				$updateminid = mysqli_result($result,0,"UpdateMinID");
				
				if ($factorypath == ""){$factorypath = "0";}
				
				if ($updatepath == "") {$updatepath = "0";}
				
				if ($packageid < $updateminid){ $updatepath = "0";}			
				
				$value = $deviceid."|".mysqli_result($result,0,"PackageID")."|".mysqli_result($result,0,"ReleaseDate")."|".mysqli_result($result,0,"ReleaseInfo")."|".$factorypath."|".$updatepath;
  		}
  		else
  		{
	  		//$value = '-1';
				$value="-1|-1|-1|-1|-1|-1";
  		} 		
  		return $value;
	}

	function GetSWA($serial, $deviceid)
	{
			// Loading SWA licenses from the old database.
			if ($deviceid == 208) $sDevType = "(MSDType='DK1' or MSDType='DK2')";
			else if ($deviceid == 209) $sDevType = "(MSDType='DK3' or MSDType='DK4')";
			else return 0;
			
			$con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD,"n115288_msd_sa"); 
			    		

			$result = mysqli_query($con,"SELECT * FROM userinfo WHERE SerialNo=".$serial." and ".$sDevType);
			$count  = mysqli_num_rows($result);
			
            mysqli_close($con);
				
			if ($count>=1)
			{
				$value=mysqli_result($result,0,"MSDType")."|".mysqli_result($result,0,"SA");
  		}
  		else
  		{
	  		$value = 0;
  		} 		
  		return $value;
	}

	function GetSWAEx($serial, $deviceid)
	{
			// Loading SWA licenses from the new database.
			if ($deviceid == 208) $sDevType = "dkMeter DK1 / DK2";
			else if ($deviceid == 209) $sDevType = "dkMeter DK3 / DK4";
			else if ($deviceid == 210) $sDevType = "dkMeter DK T7";
			else if ($deviceid == 211) $sDevType = "dkMeter DK T7 WFM";
			else if ($deviceid == 220) $sDevType = "PAM PiCo 1 / 2";
			else if ($deviceid == 221) $sDevType = "PAM PiCo 3 / 4";
			else if ($deviceid == 222) $sDevType = "PAM PiCo T7";
			else if ($deviceid == 223) $sDevType = "PAM PiCo Touch Media";
			else return 0;
			
    		$con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD,"n115288_swagen2"); 
 		

			$result = mysqli_query($con,"SELECT * FROM licensekeys WHERE serial_no=".$serial." and instrument_type='".$sDevType."' ORDER BY license_type DESC");
			$count  = mysqli_num_rows($result);
            mysqli_close($con);

			if ($count>=1)
			{
				$value = mysqli_result($result,0,"instrument_type")."|".mysqli_result($result,0,"SWA");
  		}
  		else
  		{
	  		$value = $sDevType."|0";//0;
  		} 		
  		return $value; //dkMeter DK T7|0
	}
	


	function ValidateEndTime($serialno)
	{
      $value = false;
	  // connect to the MySql server
	  $con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
      $query = "SELECT EndDate FROM validation WHERE Serial=".$serialno." ORDER BY Serial ASC";
          
      $result = mysqli_query($con,$query);

      if (mysqli_num_rows($result)>0){
           while($row = mysqli_fetch_assoc($result)) {
           $enddate =  $row['EndDate'];
           WriteLog("Validate EndDate",$enddate);
           if ($enddate >= date("Y-m-d")) { $value = true; }
		   }
     }
     
     mysqli_close($con);	
      
   	  return $value;
    }
	
	function GetHasRegistered($serial, $deviceid)
	{ 
		$count = 0;
		if (ValidateEndTime($serial) == true) {
			 $count = 1; ;
		     WriteLog('dkmeterupdate ValidateEndTime','true');
		}
		return $count;
	}
	
	WriteLog('dkmeterupdate getinfo','*********** start **************************');

	$deviceid=getValue('deviceid', 'NACK');
	$packageid=getValue('packageid', 'NACK');
	$serial=getValue('serial', 'NACK');
	

	if ( /*($id==MD5("dkMeterUpdate")) && */
			 (is_numeric($deviceid)==true) && ($deviceid >= 208) && ($deviceid <= 223) &&
			 (is_numeric($packageid)==true) && ($packageid >= 0) && ($packageid <= 65535) &&	
			 (is_numeric($serial)==true) && ($serial >= 10000)
		 )
	{
		$SWAResult=GetSWAEx($serial, $deviceid);

		WriteLog('dkmeterupdate GetUpdateInfo',GetUpdateInfo($deviceid, $packageid));	
		WriteLog('dkmeterupdate SWAResult',$SWAResult);
		
		if ($SWAResult=="0") $SWAResult=GetSWA($serial, $deviceid);

		echo GetUpdateInfo($deviceid, $packageid).'|';
		echo $SWAResult.'|';
		echo GetHasRegistered($serial, $deviceid);
	}
	else
	{
		WriteLog('Hotel getinfo','fejl');
			
		echo 0;
		//header("HTTP/1.1 404 Not Found");
		//echo "<html><head><title>404 Not Found.</title></head><body><p><H1>404 Not Found.</H1></p></body></html> ";
	}	
	
	 WriteLog('dkmeterupdate getinfo','slut')	
?>