# your_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from _club.views import ClubViewSet, clubs
from _member.views import StudentViewSet, members
from _faculty.views import FacultyViewSet, faculty
from _event.views import EventViewSet, ParticipantViewSet, event, participants


router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
router.register(r'students', StudentViewSet)
router.register(r'faculties', FacultyViewSet)
router.register(r'events', EventViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('club/', clubs, name='club'),
    path('student/', members, name='members'),
    path('faculty/', faculty, name='faculty'),
    path('event/', event, name='event'),
    path('participant/', participants, name='participant'),
]
