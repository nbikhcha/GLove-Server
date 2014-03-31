var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() { alert(xmlhttp.responseText); }
xmlhttp.open("GET" , "http://localhost:5000/time");
xmlhttp.send();