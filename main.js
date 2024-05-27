function obtenerInformacion() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            var ip = data.ip;
            var ciudad = data.city;
            var region = data.region;
            var pais = data.country;
            var isp = data.org;

            // Mostrar la IP en grande en el centro
            document.getElementById('ipAddress').innerHTML = 'Mi IP pública es: <br>' + ip;

            // Crear la tabla con los datos de la conexión
            var infoTable = document.getElementById('infoTable');
            var tableContent = '<tr><td>Ciudad</td><td>' + ciudad + '</td></tr>';
            tableContent += '<tr><td>Región</td><td>' + region + '</td></tr>';
            tableContent += '<tr><td>País</td><td><img width="20px" src="https://flagcdn.com/w40/' + pais.toLowerCase() + '.png" alt="' + pais + '"> ' + pais + '</td></tr>';
            tableContent += '<tr><td>Proveedor de Internet</td><td>' + isp + '</td></tr>';
            infoTable.innerHTML += tableContent;

            // Cambiar el favicon según el país
            var favicon = document.createElement('link');
            favicon.rel = 'icon';
            favicon.href = 'https://flagcdn.com/w40/' + pais.toLowerCase() + '.png';
            document.head.appendChild(favicon);

            // Agregar evento de clic para copiar la IP al portapapeles
            document.getElementById('ipAddress').addEventListener('click', function() {
                var tempInput = document.createElement('input');
                tempInput.value = ip;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('IP copiada al portapapeles: ' + ip);
            });
        })
        .catch(error => {
            console.error('Error al obtener información de la conexión:', error);
            document.getElementById('ipAddress').innerText = 'Error al obtener información de la conexión.';
        });
}

obtenerInformacion();