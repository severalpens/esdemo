import shutil
import os

source_dir = '../scb-smart-search/pre_project_spikes'
destination_dir = './pre_project_spikes'

# Remove the existing destination directory if it exists
if os.path.exists(destination_dir):
    shutil.rmtree(destination_dir)

# Create the destination directory
os.makedirs(destination_dir)

# Copy files and folders from source to destination
for item in os.listdir(source_dir):
    source_item = os.path.join(source_dir, item)
    destination_item = os.path.join(destination_dir, item)
    if os.path.isdir(source_item):
        shutil.copytree(source_item, destination_item)
    else:
        shutil.copy2(source_item, destination_item)