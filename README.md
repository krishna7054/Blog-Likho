# Blog Likho

## Description
This project is a blogging platform that allows users to read and publish blog posts. It features an AI-powered summary generation for blog content using Gemini AI, enhancing user experience by providing quick insights into the articles.

## Tech Stack
- **Frontend**: 
  - React
  - TypeScript
  - DOMPurify (for sanitizing HTML content)
  - CKEditor for rich text editing
- **Backend**: 
  - Hono framework for building the server
  - PostgreSQL for the database
  - Zod for input validation
  - Wrangler for deployment and configuration
- **AI Integration**: 
  - Google Generative AI for generating summaries of blog posts.

## Features
- User authentication for signing up and signing in.
- Ability to create, read, update, and delete blog posts.
- AI-generated summaries for blog content.
- Rich text editing capabilities using CKEditor.
- Responsive design for a better user experience.

## Future Improvements
- Implement user roles and permissions for enhanced security.
- Add a comment section for each blog post.
- Integrate social media sharing options.
- Improve the UI/UX with additional styling and animations.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Gemini AI Integration](#gemini-ai-integration)
- [Backend Hono Worker](#backend-hono-worker)
- [Common Folder Module](#common-folder-module)
- [Zod for Validation](#zod-for-validation)
- [Database Setup](#database-setup)
- [Using Prisma and Accelerator](#using-prisma-and-accelerator)
- [CKEditor Integration](#ckeditor-integration)
- [Wrangler](#why-use-wrangler)

## Installation
To install the necessary dependencies, run:
```bash
npm install
```

## Usage
To run the development server, use:
```bash
npm run dev
```
To deploy the application, use:
```bash
npm run deploy
```

## Gemini AI Integration
The project utilizes the Google Generative AI library to generate summaries for blog posts. The `BlogCard` component fetches a summary by sending the blog content to the AI model, which returns a concise summary for display.

## Backend Hono Worker
The backend uses the Hono framework to create a lightweight web server. It sets up routes for user and blog functionalities and enables CORS for all routes.

## Common Folder Module
The `common` folder contains shared modules used across the project, including Zod schemas for validating user input during signup, signin, and post creation/updating.

## Zod for Validation
Zod is used for input validation in the project. It defines schemas for:
- **Signup Input**: Validates email, password, and name.
- **Signin Input**: Validates name, email, and password.
- **Create Post Input**: Validates title and content for new blog posts.
- **Update Post Input**: Validates optional title and content for updating existing posts.

## Database Setup
The project uses **PostgreSQL** as the database. The connection string is defined in the `.env` file, which Prisma uses to connect to the database. The connection string includes:
- **Username**: `neondb_owner`
- **Password**: `npg_8VEZM0THBelI`
- **Host**: `ep-wandering-grass-a4g8xzs6-pooler.us-east-1.aws.neon.tech`
- **Database Name**: `neondb`
- **SSL Mode**: `require` (indicating that SSL is required for the connection).

## Using Prisma and Accelerator
Prisma is used for database interactions, and the schema defines the structure of the database with models for users and posts. The project also utilizes **Prisma Accelerate** to speed up queries and scale easily with serverless or edge functions, optimizing performance for applications that require quick responses.

## CKEditor Integration
The project uses **CKEditor** for rich text editing capabilities, allowing users to create and format content for blog posts. The editor is configured with a toolbar that includes options for headings, font color, bold, italic, and lists. It also supports features like word count and mentions. Additionally, users can generate content suggestions using the Google Generative AI model by selecting text and clicking a button to enhance their input.


## Wrangler
**Wrangler** is a command-line tool that simplifies the deployment and management of serverless applications. It provides several benefits:
- **Easy Configuration**: Wrangler allows you to define your project settings, environment variables, and deployment configurations in a single file (`wrangler.toml`).
- **Streamlined Deployment**: It simplifies the process of deploying your application to serverless platforms, making it easier to manage updates and changes.
- **Integration with Cloudflare Workers**: If your project uses Cloudflare Workers, Wrangler provides seamless integration, allowing you to leverage the benefits of edge computing.

