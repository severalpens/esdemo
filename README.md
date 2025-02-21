# Client

# esdemo

## Docker Deployment

To build and run the Docker container for this Vite React.js application, follow these steps:

1. Build the Docker image:
    ```sh
    docker build -t esdemo .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 5000:5000 esdemo
    ```

3. Open your browser and navigate to `http://localhost:5000` to see the application.