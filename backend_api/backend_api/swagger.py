from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


version = '1.0.0'
api_info = openapi.Info(
    title="TasteMaker API",
    default_version=version,
    description="",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.AllowAny,),
)
