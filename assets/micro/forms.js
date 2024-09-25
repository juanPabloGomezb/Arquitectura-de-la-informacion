document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('vehiculo-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const data = {
            matricula: document.getElementById('matricula').value,
            modelo: document.getElementById('modelo').value,
            visitante: document.getElementById('visitante').checked,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            numvivienda: document.getElementById('numvivienda').value,
            telefono: document.getElementById('telefono').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/parqueadero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                // Si todo sale bien, redirigir a otra página o mostrar un mensaje
                window.location.href = '#';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar el vehiculo. Inténtalo de nuevo.');
        }
    });
});
