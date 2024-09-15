# To-Do Web App

## Overview
A serverless web application built with React, Vite, and Tailwind CSS, utilizing Firebase for authentication and Firestore for event management. Deployed using AWS S3 and CloudFront.

## Features
- User authentication with Firebase
- Event management NoSQL DB with Firestore
- Responsive design with Tailwind CSS
- Fast and secure content delivery with AWS CloudFront

## Architechture 

+--------------------+       +------------------+       +---------------------+
|                    |       |                  |       |                     |
|  User's Browser    | <---> |   CloudFront     | <---> |       S3 Bucket     |
|                    |       |                  |       |   (Static Files)    |
+--------------------+       +------------------+       +---------------------+
                                  |
                                  v
                            +--------------------+
                            |                    |
                            |    Firebase        |
                            | (Auth & Firestore) |
                            |                    |
                            +--------------------+
