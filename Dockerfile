# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the frontend files into the Nginx default HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow traffic to the container
EXPOSE 80

