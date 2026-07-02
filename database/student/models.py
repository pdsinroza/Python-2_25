from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class StudentData1(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,
                             related_name='student_profile',null=True,blank=True)
    name = models.CharField(max_length=50)
    roll = models.IntegerField()
    enroll = models.BigIntegerField()
    image = models.ImageField(upload_to='student/image',blank=True)
    desc = models.TextField()
    email = models.EmailField(null=True)
    url = models.URLField(blank=True)
    python = models.DecimalField(decimal_places=2,max_digits=10,default=0)
    fsd = models.DecimalField(decimal_places=2,max_digits=10)
    coa = models.DecimalField(decimal_places=2,max_digits=10)

    def __str__(self):
        return self.name