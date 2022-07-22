from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
import razorpay
from .models import Donate
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request,'home.html')



def pay(request):
    if request.method=="POST":
        name=request.POST.get("name")
        amount=int(request.POST.get("amount")) *100
        client= razorpay.Client(auth =("YOUR API KEY1" , "YOUR API KEY2"))
        payment= client.order.create({'amount':amount, 'currency':'INR' , 'payment_capture' : '0'})
        donate=Donate(name=name, amount=amount, razorpay_id=payment['id'])
        donate.save()
        return render(request, 'payment.html', {'payment': payment})
    return render(request,'payment.html')

@csrf_exempt
def success(request):
    if request.method=="POST":
        a = request.POST
        order_id=""
        data={}
        for key, val in a.items():
            if key=="razorpay_order_id":
                data['razorpay_order_id'] = val
                order_id=val
            elif key=="razorpay_payment_id":
                data['razorpay_payment_id'] = val
            elif key=="razorpay_signature":
                data['razorpay_signature'] = val
        client= razorpay.Client(auth =("YOUR API KEY1" , "YPUR API KEY2"))
        check=client.utility.verify_payment_signature(data)
        print(check)
        if check:
            try:
                price=Donate.objects.get(razorpay_id=order_id).amount
                client.payment.capture(data['razorpay_payment_id'], price)
                Donate.objects.filter(razorpay_id=order_id).update(paid=True)
                return render(request,'success.html')
            except:
                Donate.objects.filter(razorpay_id=order_id).update(razorpay_id=str(0))
                return render(request, 'error.html')
        else:
            Donate.objects.filter(razorpay_id=order_id).update(razorpay_id=str(0))
            return render(request, 'error.html')
    else:
        return HttpResponse('Error 505 not found')

def about(request):
    return render(request,'about.html')

def error(request):
    return render(request,'error.html')