document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vehiculo-form");
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Captura de datos del formulario
        const formData = new FormData(form);
        const data = {
            matricula: formData.get("matricula"),
            modelo: formData.get("modelo"),
            visitante: formData.get("visitante") ? 1 : 0, // Convertir a 1 o 0
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            numvivienda: formData.get("numvivienda"),
            telefono: formData.get("telefono"),
        };

        try {
            // Envío de datos al servidor
            const response = await fetch("http://localhost:3000/api/parking/addVehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Manejo de la respuesta
            if (response.ok) {
                const jsonResponse = await response.json();
                alert(jsonResponse.message); // Muestra un mensaje de éxito
                push()
                form.reset(); // Reinicia el formulario
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al enviar el formulario");
        }
    });
});
function push() {
    console.log("Solicitud de permiso para notificaciones");
    Push.Permission.request();

    console.log("Creando notificación");
    Push.create('Registro Exitoso', {
        body: 'Consulta tu nformacion',
        icon: 'img/logo.png',
        timeout: 1500000,
        vibrate: [100, 100, 100],
        onClick: function() {
            window.location = "tables-parqueadero.html";
            console.log("Notificación clickeada");
        }
    });
}