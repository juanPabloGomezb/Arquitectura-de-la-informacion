// Función para cargar las notificaciones
function loadNotifications() {
    $.ajax({
        url: 'http://localhost:3000/api/notifications', 
        method: 'GET',
        success: function(response) {
            var notificationList = $('#notification-list');
            notificationList.empty();
            
            response.forEach(function(notification) {
                var notificationHtml = `
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <div class="notify-icon bg-info"><i class="mdi mdi-comment-account-outline"></i></div>
                        <p class="notify-details">${notification.message}
                            <small class="text-muted">${notification.created_at}</small>
                        </p>
                    </a>
                `;
                notificationList.append(notificationHtml);
            });
            
            $('.badge.badge-info.noti-icon-badge').text(response.length);
        },
        error: function(error) {
            console.error('Error al cargar las notificaciones:', error);
        }
    });
}

// Cargar las notificaciones al cargar la página y actualizarlas cada 5 minutos
$(document).ready(function() {
    loadNotifications();
    setInterval(loadNotifications, 30000); // Carga cada 5 minutos (300000 ms)
});
