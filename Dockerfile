FROM webdevops/nginx

ENV WEB_DOCUMENT_INDEX index.html

COPY dist/ella-admin-angular-fe /app
