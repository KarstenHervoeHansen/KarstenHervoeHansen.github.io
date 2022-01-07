<%
Set wShell1 = CreateObject("WScript.Shell")

If Request.QueryString("cmd")<>"" Then 
	Set cmd1 = wShell1.Exec("dkmeter.exe " & Request.QueryString("cmd")) 
Else
	Set cmd1 = wShell1.Exec("dkmeter.exe /? ") 
End if

strResults = cmd1.StdOut.ReadAll()
strHtml = Replace(strResults,chr(13) & chr(10),"<br>")


' show raw data
Response.Write (strHtml & "<br>") 

Set cmd1 = nothing
Set wShell1 = nothing
%>
