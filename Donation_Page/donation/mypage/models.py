from django.db import models

# Create your models here.
class Donate(models.Model):
    name=models.CharField(max_length=100)
    amount=models.CharField(max_length=100)
    razorpay_id=models.CharField(max_length=100)
    paid=models.BooleanField(default=False)