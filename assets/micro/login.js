document.addEventListener('DOMContentLoaded', () => {
    // Manejar el submit para el login
    document.getElementById('submit-login-btn').addEventListener('click', async function (event) {
        event.preventDefault();
        
        const email = document.getElementById('logemail').value;
        const password = document.getElementById('logpass-login').value;

        const data = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                window.location.href = 'lobby.html'; // Cambia a la URL deseada
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error. Inténtalo de nuevo.');
        }
    });

    // Manejar el submit para el signup
    document.getElementById('submit-signup-btn').addEventListener('click', async function (event) {
        event.preventDefault();

        const name = document.getElementById('logname').value;
        const email = document.getElementById('logemail-signup').value;
        const password = document.getElementById('logpass-signup').value;

        const data = {
            name,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            alert(result.message);
            
            if (response.ok) {
                // Opcional: Redireccionar después del registro exitoso
                window.location.href = 'ingreso.html'; // Cambia a la URL deseada
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error. Inténtalo de nuevo.');
        }
    });
});
