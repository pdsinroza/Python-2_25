from django.shortcuts import render
from .models import StudentData1

# Create your views here.
def home(request):
    searchEnroll = request.GET.get('searchEnroll')
    if searchEnroll:
        student = StudentData1.objects.filter(enroll__icontains = searchEnroll)
    else:
        student = StudentData1.objects.all()
    return render(request,'home.html',{'student':student})