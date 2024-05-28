from django.urls import path, include
from .views import ClubViewSet, club_list
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'clubs', ClubViewSet)


urlpatterns = router.urls
