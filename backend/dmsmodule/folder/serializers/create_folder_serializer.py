from rest_framework import serializers
from dmsmodule.folder.models.models import FolderModel

class CreateFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderModel
        fields = ['folder_name', 'parent_folder']
        extra_kwargs = {
            'folder_identifier': {'read_only': True},
        } 

    # def validate(self, attrs):
    #     return super().validate(attrs)
        
    def create(self, validated_data):
        folder = FolderModel.objects.create(
            folder_name=validated_data.get('folder_name'),
            parent_folder = validated_data.get('parent_folder')
        )
        return folder