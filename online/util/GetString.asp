<%
Set wShell1 = CreateObject("WScript.Shell")

If Request.QueryString("GetString")<>"" Then 
	Set cmd1 = wShell1.Exec("dkmeter.exe " & Request.QueryString("GetString")) 
Else
	Set cmd1 = wShell1.Exec("dkmeter.exe /R c:\inetpub\wwwroot\READCMD.BAT $163e80 1 ") 
End if

strResults = cmd1.StdOut.ReadAll()
strHtml = Replace(strResults,chr(13) & chr(10),"<br>")


' show raw data
Response.Write ("test" & strHtml & "<br>") 

Set cmd1 = nothing
Set wShell1 = nothing
%>
