from django.urls import include, path
from rest_framework import routers
from futuboard import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('boards/', views.get_all_boards, name='get_all_boards'),
    path('boards/<uuid:board_id>/', views.get_board_by_id, name='get_board_by_id'),
]