from ...helper.base_view_list_for_action import BaseViewList
from rest_framework.response import Response

class ViewListGet2(BaseViewList):
    def get(self, request, *args, **kwargs):
        app_policies_get, model_policies_get = self.get_policies('GET')
        app_policies_post, model_policies_post = self.get_policies('POST')
        # Add policies for PUT, DELETE, etc. as needed

        return Response({
            "app_level_policies": {
                "GET": app_policies_get,
                "POST": app_policies_post
            },
            "model_level_policies": {
                "GET": model_policies_get,
                "POST": model_policies_post
            }
        })
    

