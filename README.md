# To-Do Web App LINK: https://d39mrcaum0z3hl.cloudfront.net/

## Overview
A serverless web application built with React, Vite, and Tailwind CSS, utilizing Firebase for authentication and Firestore for event management. Deployed using AWS S3 and CloudFront.

## Features
- User authentication with Firebase
- Event management NoSQL DB with Firestore
- Responsive design with Tailwind CSS
- Fast and secure content delivery with AWS CloudFront as CDN

## Architechture 
```

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


```
