document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vehiculo-form");
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío automático del formulario

        const data = {
            matricula: document.getElementById("matricula").value,
            modelo: document.getElementById("modelo").value,
            visitante: document.getElementById("visitante").checked ? 1 : 0,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            numvivienda: document.getElementById("numvivienda").value,
            telefono: document.getElementById("telefono").value
        };

        try {
            // Envía los datos al servidor para agregar el vehículo
            const response = await fetch("http://localhost:3000/api/parking/addVehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Manejo de la respuesta para el primer envío
            if (response.ok) {
                const jsonResponse = await response.json();
                alert(jsonResponse.message);
                push(); // Llama a la función de notificación
                form.reset(); // Reinicia el formulario
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message);
            }

            // Envía los datos al servidor para las notificaciones
            const notifyResponse = await fetch("http://localhost:3000/api/notifications/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (notifyResponse.ok) {
                const notifyResult = await notifyResponse.json();
                console.log(notifyResult.message);
                loadNotifications(); // Actualiza la lista de notificaciones
            } else {
                console.error("Error al crear la notificación");
            }

        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    });
});

function push() {
    console.log("Solicitud de permiso para notificaciones");
    Push.Permission.request();

    console.log("Creando notificación");
    Push.create('Registro Exitoso', {
        body: 'Consulta tu información',
        icon: 'img/logo.png',
        timeout: 5000,
        vibrate: [100, 100, 100],
        onClick: function() {
            window.location = "tables-parqueadero.html";
            console.log("Notificación clickeada");
        }
    });
}