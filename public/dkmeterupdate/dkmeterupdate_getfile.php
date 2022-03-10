<?php
//Includer Database Config
include("rmconfig.php");

    WriteLog('Hotel getfile','start');
    
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

	function WriteRecord($deviceid, $serial, $oldpackageid, $newpackageid, $factory, $mcubl, $mcurun, $armid, $armrun, $sdiin, $sdiout, $aesin, $aesout, $swoption0, $swoption1, $swoption2, $swoption3)
	{
		
	    $con   = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
		$query = "INSERT INTO downloads (DeviceID, Serial, OldPackageID, NewPackageID, FACTORY, MCUBL, MCURUN, ARMRUN, ARMID, SDI_IN, SDI_OUT, AES_IN, AES_OUT, IP, SWOPTA, SWOPTB, SWOPTC, SWOPTD) VALUES (%u, %u, %u, %u, %u, '%s', '%s', '%s', '%s', %u, %u, %u, %u, '%s', %u, %u, %u, %u)";
		$query = sprintf($query, $deviceid, $serial, $oldpackageid, $newpackageid, $factory, $mcubl, $mcurun, $armrun, $armid, $sdiin, $sdiout, $aesin, $aesout, $_SERVER['REMOTE_ADDR'], $swoption0, $swoption1, $swoption2, $swoption3);

		$result = mysqli_query($con,$query);

		mysqli_close($con);
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
           if ($enddate >= date("Y-m-d")) { $value = true; }
		   }
     }
     
     mysqli_close($con);	
      
   	  return $value;
    }
    
    function ValidateFile($serialno,$deviceid)
	{
      $value = "";

	  $con = mysqli_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD, DB_DATABASE); 
     
      $result = mysqli_query($con,"SELECT FilePath FROM serialupdates WHERE NOT Done AND Serial=".$serialno." AND DeviceID=".$deviceid);
     
      if (mysqli_num_rows($result) == 1) {
        $value = mysqli_result($result,0);	     
 	    $result = mysqli_query($con,"UPDATE serialupdates SET Done = 1 WHERE Serial=".$serialno." AND DeviceID=".$deviceid);	     
      }
     
      mysqli_close($con);	
      
	  
   	  return $value;
    }


    
	$deviceid=getValue('deviceid', 'NACK');
	$serial=getValue('serial', 'NACK');
	$oldpackageid=getValue('oldpackageid', 'NACK');
	$newpackageid=getValue('newpackageid', 'NACK');
	$file=getValue('file', 'NACK');
	$factory=getValue('factory', 'NACK');
	$mcubl=getValue('mcubl', 'NACK');
	$mcurun=getValue('mcurun', 'NACK');
	$armid=getValue('armid', 'NACK');
	$armrun=getValue('armrun', 'NACK');
	$sdiin=getValue('sdiin', 'NACK');
	$sdiout=getValue('sdiout', 'NACK');
	$aesin=getValue('aesin', 'NACK');
	$aesout=getValue('aesout', 'NACK');
	$swoption0=getValue('swoption0', 'NACK');
	$swoption1=getValue('swoption1', 'NACK');
	$swoption2=getValue('swoption2', 'NACK');
	$swoption3=getValue('swoption3', 'NACK');

	if (is_numeric($factory)==false) {$factory = 0;}
	/*
	$mcubl = substr(preg_replace("/[^0-9,.]/", "", $mcubl), 0 ,4);
	$mcurun = substr(preg_replace("/[^0-9,.]/", "", $mcurun), 0 ,4);
	$armid = substr(preg_replace("/[^0-9,.]/", "", $armid), 0 ,4);
	$armrun = substr(preg_replace("/[^0-9,.]/", "", $armrun), 0 ,4);
	*/
	if (is_numeric($mcubl)==false) {$mcubl = '0000';}
	if (is_numeric($mcurun)==false) {$mcurun = '0000';}
	if (is_numeric($armid)==false) {$armid = '0000';}
	if (is_numeric($armrun)==false) {$armrun = '0000';}

		 
	if ( /*($id==MD5("dkMeterUpdate")) && */
			 (is_numeric($deviceid)==true) && ($deviceid >= 208) && ($deviceid <= 223) &&
			 (is_numeric($oldpackageid)==true) && ($oldpackageid >= 0) && ($oldpackageid <= 65535) &&	
			 (is_numeric($newpackageid)==true) && ($newpackageid >= 0) && ($newpackageid <= 65535) &&	
			 (is_numeric($serial)==true) && ($serial >= 10000)
		 )
	{
		
		if (ValidateEndTime($serial,$deviceid)==0) {
		  $file = '/home/n115288/download/software/upgrade/The free update has expired for this unit.CDP';
		  $newpackageid = 0;
	    }

	    
	   $newfile = ValidateFile($serial,$deviceid);
       WriteLog('Hotel new filename',$newfile); 
	   
	   if ($newfile!="") {
		 $file = $newfile;
		 $newpackageid = $oldpackageid;		  
        }
        
      // $file = '/home/n115288/download/software/upgrade/The free update has expired for this unit.CDP';
      WriteLog('Hotel filename',$file);     
  		        
	   WriteRecord($deviceid, $serial, $oldpackageid, $newpackageid, $factory, $mcubl, $mcurun, $armid, $armrun, $sdiin, $sdiout, $aesin, $aesout, $swoption0, $swoption1, $swoption2, $swoption3);
	
	   header('Content-Description: File Transfer');
	   header('Content-Type: application/pdf');
	   header('Content-Length: ' . filesize($file));
	   header('Content-Disposition: attachment; filename=' . basename($file));
	   readfile($file);	
		
	}
	else
	{
		//echo 0;
		//header("HTTP/1.1 404 Not Found");
		//echo "<html><head><title>404 Not Found.</title></head><body><p><H1>404 Not Found.</H1></p></body></html> ";
	}	
	
    WriteLog('Hotel getfile','slut');
	    
?>