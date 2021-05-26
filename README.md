# synthstudio

## Firebase
If you'd like to try out this project, make sure you add you own
firebase config keys in the file `src/fb.js`. You'll also need to
configure the following two rule sets for firestore and storage.

### Firestore rules
Configure email and password authentication. For this project I added
two rules, one for read only if not authenticated and one for read/write 
if a specific user is logged in. Replace <your uid> with the
user uid you'd like to give access.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == '<your uid>';
      allow read: if request.auth == null;
    }
  }
}
```

### Storage rules
For storage I only added a rule that just one specific user can use
storage. This is for the upload image functionality. Replace <your uid> with the 
user uid you'd like to give access.
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null 
      	&& request.auth.uid == '<your uid>';
    }
  }
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
