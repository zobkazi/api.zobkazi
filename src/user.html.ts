import userData from "./userData";

const userHtmlData = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
        .profile-img {
            width: 100px;
            border-radius: 50%;
            display: block;
            margin: 0 auto 20px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }
        .btn-custom {
            width: 45%;
            padding: 10px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container text-center">
        <img src="${userData.avatar_url}" alt="Avatar" class="profile-img">
        <h1 class="title">${userData.name}</h1>
        <p><strong>Username:</strong> ${userData.login}</p>
        <p><strong>Company:</strong> ${userData.company || "N/A"}</p>
        <p><strong>Location:</strong> ${userData.location}</p>
        <p><strong>Bio:</strong> ${userData.bio}</p>
        <p><strong>Followers:</strong> ${userData.followers}</p>
        <p><strong>Following:</strong> ${userData.following}</p>
        <p><strong>Public Repos:</strong> ${userData.public_repos}</p>
        
        <!-- Two Colorful Buttons -->
        <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-success btn-custom">
            <a target="_blank" class="btn" href="/api/user/zobkazi">API</a>
            </button>
            <button class="btn btn-info btn-custom">
             <a target="_blank" class="btn" href=${userData.html_url}>Follow</a>
            </button>
            
        </div>
    </div>
</body>
</html>
`;

export default userHtmlData;
