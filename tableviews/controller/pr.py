from django.http import HttpResponse
from django.template import loader
from tableviews.models import user
import logging
# Create your views here.
def index(request):
    try:
        index = loader.get_template("index.html")
        # 'count':user.objects.all()
        context = {
            'users' : user.objects.all(),
        }
        logging.info(context)
        return HttpResponse(index.render(context))
    except:
        logging.warning('Not Found Datas.')
        return HttpResponse(index.render())

def RequestUsers(request):
    try:
        RequestUsers = loader.get_template("Request_user.html")
        return HttpResponse(RequestUsers.render())
    except:
        logging.error("Cannot Open")
# def about(request):
#     about = loader.get_template("about.html")
#     return HttpResponse(about.render())
