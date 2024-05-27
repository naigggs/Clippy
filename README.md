# Clippy: AI-powered YouTube Summarization Tool
Clippy is your one-stop shop for getting the most out of YouTube videos!  Leveraging cutting-edge AI technology, Clippy summarizes videos and allows you to ask questions directly about their content.

# What's Inside?
This repository holds the codebase for Clippy, which is comprised of two main parts:

Backend: Built with the powerful Django framework, the backend ensures scalability, security, and efficient data processing for handling YouTube video analysis and user interactions.
Frontend: The user interface is built with Next.js, a popular framework known for its speed and responsiveness. This provides a smooth and enjoyable experience for navigating summaries and posing questions about videos.
Getting Started with Clippy

# Prerequisites:

- Python v3.x with essential libraries (Django, Next.js dependencies)
- Node v20.x.x
- A code editor or IDE of your choice

# Setting Up the Backend:
```
git clone https://github.com/naigggs/clippy-web.git
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
# Setting Up the Frontend:

```
git clone https://github.com/naigggs/clippy-web.git
cd frontend
npm i
npm run dev
```
Access Clippy in your web browser at http://localhost:3000/

Using Clippy
Once you've set up Clippy, you can start summarizing videos and asking questions!

Provide a YouTube video ID to Clippy.
Clippy will analyze the video and generate a concise summary capturing the key points.
Ask questions directly related to the video content. Clippy will intelligently retrieve the answer from the summarized information.
Contributing
We welcome contributions to Clippy!  If you'd like to get involved, please refer to the following resources:

Let's make Clippy the ultimate tool for conquering YouTube content!
