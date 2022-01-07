var ajaxRequest = null;
if (window.XMLHttpRequest) {
     ajaxRequest =new XMLHttpRequest();
} else {
     ajaxRequest =new ActiveXObject("Microsoft.XMLHTTP");
}



function ajaxLoad(ajaxURL, ResponseWindow) {
   if (!ajaxRequest) {
	   alert("AJAX is not supported.");
	   return;
   }

   ajaxRequest.open("GET",ajaxURL,true);
       ajaxRequest.onreadystatechange = function() {
           if(ajaxRequest.readyState == 4 && ajaxRequest.status==200) {
              var ajaxResult = ajaxRequest.responseText;
              document.getElementById(ResponseWindow).value = ajaxRequest.responseText;
           }

   }
    ajaxRequest.send();
} //ajaxLoad
