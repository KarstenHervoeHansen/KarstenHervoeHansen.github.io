<?php
  date_default_timezone_set('Europe/Copenhagen');
  echo date('O').' ';
  echo time().' ';
  echo date_sunrise(time(), SUNFUNCS_RET_TIMESTAMP,56.0, 12.0, 93.0, 1).' ';
  echo date_sunset(time(), SUNFUNCS_RET_TIMESTAMP, 56.0, 12.0, 93.0, 1).' ';
?>