$(document).ready(function() {
    $('#visitantes-table').DataTable({
        ajax: {
            url: 'http://localhost:3000/api/visitantes',
            dataSrc: ''
        },
        columns: [
            { data: 'nombre' },
            { data: 'numvivienda' },
            { data: 'tel' },
            { data: 'visitante' },
            { data: 'matricula' }
        ],
        responsive: true,
        buttons: ['copy', 'excel', 'pdf', 'print']
    });

    function loadNotifications() {
        $.ajax({
            url: 'http://localhost:3000/api/notifications',
            method: 'GET',
            success: function(notifications) {
                const notificationList = $('#notification-list');
                notificationList.empty(); // Clear existing notifications

                notifications.forEach(function(notification) {
                    let icon = '';
                    let bgClass = '';

                    switch(notification.type) {
                        case 'comment':
                            icon = 'mdi mdi-comment-account-outline';
                            bgClass = 'bg-warning';
                            break;
                        case 'request':
                            icon = 'mdi mdi-comment-account-outline';
                            bgClass = 'bg-danger';
                            break;
                        case 'like':
                            icon = 'mdi mdi-heart';
                            bgClass = 'bg-primary';
                            break;
                        default:
                            icon = 'mdi mdi-bell';
                            bgClass = 'bg-info';
                    }

                    const notificationItem = `
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <div class="notify-icon ${bgClass}"><i class="${icon}"></i></div>
                            <p class="notify-details">${notification.message}</p>
                            <p class="text-muted font-13 mb-0 user-msg">${notification.details}</p>
                        </a>
                    `;

                    notificationList.append(notificationItem);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error loading notifications:', error);
            }
        });
    }

    // Load notifications when the page loads
    loadNotifications();

    // Optionally, you can refresh notifications periodically
    setInterval(loadNotifications, 60000); // Refresh every minute
});