from rest_framework import serializers
from dmsmodule.folder.models.models import FolderModel

class CreateFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderModel
        fields = ['folder_name', 'parent_folder', 'created_by']
        extra_kwargs = {
            'folder_identifier': {'read_only': True},
        }    
    
    def create(self, validated_data):
        request = self.context.get('request') 
        folder = FolderModel.objects.create(
            parent_folder = validated_data.get('parent_folder'),
            folder_name=validated_data.get('folder_name'),
            created_by=request.user  # Assign the logged-in user
        )
        return folder
    





    # def to_internal_value(self, data):
    #     """
    #     This function allows the serializer to convert the folder identifier into a folder instance.
    #     """
    #     if isinstance(data, str):
    #         try:
    #             folder = FolderModel.objects.get(folder_identifier=data)
    #             return folder
    #         except FolderModel.DoesNotExist:
    #             raise serializers.ValidationError('Folder does not exist.')
    #     return super().to_internal_value(data)

    # def create(self, validated_data):
    #     folder_name = validated_data.get('folder_name')
    #     parent_folder = validated_data.get('parent_folder')

    #     folder = FolderModel.objects.create(
    #         folder_name=folder_name,
    #         parent_folder=parent_folder
    #     )
    #     return folder