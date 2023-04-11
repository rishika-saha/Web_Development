from django.db import models

# Create your models here.
class Resume(models.Model):
    phone=models.BigIntegerField(primary_key=True)
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    github=models.CharField(max_length=500)
    country=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    about=models.TextField()
    specialization=models.CharField(max_length=200)

    degree=models.CharField(max_length=200)
    college=models.CharField(max_length=200)
    pcollege=models.IntegerField()

    school_12=models.CharField(max_length=200)
    p_12=models.IntegerField()

    school_10=models.CharField(max_length=200)
    p_10=models.IntegerField()

    proj1=models.TextField()
    exp1=models.TextField()
    proj2=models.TextField()
    exp2=models.TextField()
    proj3=models.TextField()
    exp3=models.TextField()

    skill1=models.CharField(max_length=100)
    skill2=models.CharField(max_length=100)
    skill3=models.CharField(max_length=100)
    skill4=models.CharField(max_length=100)
    skill5=models.CharField(max_length=100)
    skill6=models.CharField(max_length=100)
