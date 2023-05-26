from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.core.files import File
import os
import urllib.request
import requests


# Create your models here.

class Project(models.Model):
    
    # Fields:
    on_homepage = models.PositiveSmallIntegerField(choices=[
        ('0', 'Yes'), 
        ('1', 'No / Not Yet')
        ], null=False, default=None)
    category_type = models.PositiveSmallIntegerField(choices=[
        ('3', 'Music'), 
        ('4', 'Commercial')
        ], null=False, default=None)
    client_name = models.CharField(max_length=100)
    project_title = models.CharField(max_length=100)
    project_order = models.PositiveSmallIntegerField(null=True, blank=True, unique=True)
    project_type = models.CharField(max_length=100)
    description = models.CharField(max_length=300)

    # Methods:
    # String Method for how the Project Object will read on DB:
    def __str__(self):
        return f"{self.client_name} - {self.project_title}"
    


class Project_Asset(models.Model):
    
    # Fields:
    project = models.ForeignKey(
        Project, related_name='assets', on_delete=models.CASCADE)
    content_url = models.URLField(validators=[URLValidator()])
    content_url_number = models.PositiveSmallIntegerField(null=False, blank=False) 
    content_description = models.CharField(max_length=300)
    content_orientation = models.PositiveSmallIntegerField(choices=[
        ('6', 'Portrait'), 
        ('7', 'Landscape')
        ], null=False, default=False)
    # asset_order = models.PositiveSmallIntegerField(null=True, blank=True, unique=True)


    # Methods: 
    # String Method for how the Project Object will look on DB:
    def __str__(self):
        return f"{self.project} - Asset {self.content_url_number}"
    
    # Method for checking if the content_url file extension is an image file (e.g.jpg, jpeg, png, gif) or a Vimeo URL. 
    # If it's an image file, it downloads and saves the image file using Django's 'File' class. It's saved locally to the 'MEDIA_ROOT' directory
    # If it's a Vimeo URL, the Vimeo API requires an access token and is then downloaded and saved to the 'content_url'. 
    # def save(self, *args, **kwargs):
    #     # Get the file extension from the URL
    #     file_extension = os.path.splitext(self.content_url)[1]

    #     # Download the image or video file from the URL and save it to the content_url field
    #     if file_extension in ['.jpg', '.jpeg', '.png', '.gif']:
    #         img_name = self.content_url.split("/")[-1]
    #         img_temp = urllib.request.urlopen(self.content_url)
    #         self.content_url.save(img_name, File(img_temp), save=False)
    #     elif 'vimeo.com' in self.content_url:
    #         # For Vimeo URLs, extract the Vimeo video ID from the URL
    #         vimeo_id = self.content_url.split('/')[-1]
    #         # Fetch the Vimeo video info using Vimeo API with an access token
    #         access_token = 'YOUR_VIMEO_ACCESS_TOKEN' # Replace with your Vimeo access token
    #         headers = {'Authorization': 'Bearer ' + access_token}
    #         response = requests.get('https://api.vimeo.com/videos/' + vimeo_id, headers=headers)
    #         video_info = response.json()
    #         video_url = video_info['files'][0]['link']
    #         video_name = video_url.split("/")[-1]
    #         video_temp = urllib.request.urlopen(video_url)
    #         self.content_url.save(video_name, File(video_temp), save=False)

    #     super().save(*args, **kwargs)


    # Method for checking if certain field values comply with field requirements, otherwise call a ValidationError
    def clean(self):
        if not 1 <= self.content_url_number <= 10:
            raise ValidationError('Content URL number must be between 1 and 10.')
        
