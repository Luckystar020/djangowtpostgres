from django.http import HttpResponse
from django.template import loader
from tableviews.models import user

# Create your views here.
# def index(request):
#     index = loader.get_template("index.html")
#     # 'count':user.objects.all()
#     context = {
#         'users' : user.objects.all(),
#     }
#     return HttpResponse(index.render(context))

def about(request):
    about = loader.get_template("about.html")
    return HttpResponse(about.render())
