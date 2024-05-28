# your_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from _club.views import ClubViewSet
from _member.views import StudentViewSet
from _faculty.views import FacultyViewSet
from _event.views import EventViewSet, ParticipantViewSet

router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
router.register(r'students', StudentViewSet)
router.register(r'faculties', FacultyViewSet)
router.register(r'events', EventViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
