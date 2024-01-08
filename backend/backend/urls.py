from django.urls import include, path
from rest_framework import routers
from quickstart import views as admin_views
from futuboard import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', admin_views.UserViewSet)
router.register(r'groups', admin_views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('boards/', views.get_all_boards, name='get_all_boards'),
    path('boards/<uuid:board_id>/', views.get_board_by_id, name='get_board_by_id'),
    path('boards/<uuid:board_id>/columns/', views.get_columns_from_board, name='get_columns_from_board'),
    path('boards/<uuid:board_id>/columns/<uuid:column_id>/', views.update_column, name='update_column'),
    path('boards/<uuid:board_id>/columns/<uuid:column_id>/tickets', views.get_tickets_from_column, name='get_tickets_from_column'),
    path('columns/<uuid:column_id>/tickets/<uuid:ticket_id>/', views.update_ticket, name='update_ticket'),

]