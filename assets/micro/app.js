$(document).ready(function() {
    // Inicializar la tabla de vehículos
    var table = $('#vehiculos-table').DataTable({
        ajax: {
            url: 'http://localhost:3000/api/parking/getVehicles',
            dataSrc: ''
        },
        columns: [
            { data: 'matricula' },
            { data: 'modelo' },
            { data: 'nombre' },
            { data: 'apellido' },
            { data: 'numvivienda' },
            { data: 'telefono' },
            { data: 'visitante', 
              render: function(data) {
                  return data ? 'Sí' : 'No';
              }
            }
        ],
        responsive: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'excel', 'pdf', 'print']
    });

    // Manejar el envío del formulario
    $('#vehiculo-form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        
        $.ajax({
            url: 'http://localhost:3000/api/parking/addVehicle',
            method: 'POST',
            data: formData,
            success: function(response) {
                alert(response.message);
                $('#vehiculo-form')[0].reset();
                table.ajax.reload();
            },
            error: function(xhr, status, error) {
                alert('Error al agregar vehículo: ' + xhr.responseJSON.message);
            }
        });
    });
});