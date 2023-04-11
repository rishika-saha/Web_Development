from django.shortcuts import render
from .models import Resume
import requests
import json

def home(request):
    return render(request,'home.html')

def cam(request):
    name=request.POST['name']
    email=request.POST['email']
    phone=request.POST['number']
    github=request.POST['link']
    country=request.POST['country']
    state=request.POST['state']
    about=request.POST['about']
    role=request.POST['role']

    degree=request.POST['degree']
    college=request.POST['collegename']
    pcollege=request.POST['collegepercentage']

    school_12=request.POST['class12name']
    p_12=request.POST['class12percentage']

    school_10=request.POST['class10name']
    p_10=request.POST['class10percentage']

    proj1=request.POST['proj1name']
    exp1=request.POST['proj1']
    proj2=request.POST['proj2name']
    exp2=request.POST['proj2']
    proj3=request.POST['proj3name']
    exp3=request.POST['proj3']

    skill1=request.POST['skill1']
    skill2=request.POST['skill2']
    skill3=request.POST['skill3']
    skill4=request.POST['skill4']
    skill5=request.POST['skill5']
    skill6=request.POST['skill6']
    try:
        res= Resume.objects.create(phone=phone, name=name, email=email, github=github, country=country, state=state, about=about, specialization=role, degree=degree, college=college, pcollege=pcollege, school_12=school_12, p_12=p_12, school_10=school_10, p_10=p_10, proj1=proj1, exp1=exp1, proj2=proj2, exp2=exp2, proj3=proj3, exp3=exp3, skill1=skill1, skill2=skill2, skill3=skill3, skill4=skill4, skill5=skill5, skill6=skill6)
    except:
        person=Resume.objects.get(phone=phone)
        person.delete()
        res= Resume.objects.create(phone=phone, name=name, email=email, github=github, country=country, state=state, about=about, specialization=role, degree=degree, college=college, pcollege=pcollege, school_12=school_12, p_12=p_12, school_10=school_10, p_10=p_10, proj1=proj1, exp1=exp1, proj2=proj2, exp2=exp2, proj3=proj3, exp3=exp3, skill1=skill1, skill2=skill2, skill3=skill3, skill4=skill4, skill5=skill5, skill6=skill6)
    finally:
        return render(request,'cam.html',{'phone':phone})
    
def demo(request):
    return render(request,'demo.html')

def resume(request):
    phone=request.GET['phone']
    resume=Resume.objects.get(phone=phone)
    Skills=[]
    Exp=[]
    Skills.append(resume.skill1)
    Skills.append(resume.skill2)
    Skills.append(resume.skill3)
    Skills.append(resume.skill4)
    Skills.append(resume.skill5)
    Skills.append(resume.skill6)

    Exp.append((resume.proj1,resume.exp1))
    Exp.append((resume.proj2,resume.exp2))
    Exp.append((resume.proj3,resume.exp3))

    response = requests.get(f'https://resume-builder-75beb-default-rtdb.firebaseio.com/{phone}.json')
    Dict = json.loads(response.text)
    #print(Dict)
    img = Dict[list(Dict.keys())[len(list(Dict.keys()))-1]]['uri']    
    #print(img)

    return render(request,'downloadResume.html',{'resume':resume, 'Skills':Skills, 'Exp':Exp, 'img':img})