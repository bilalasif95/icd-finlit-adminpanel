#!/bin/sh

# Default git commit number
GIT_COMMIT=unspecified
# Get current get commit number
LABEL=$(git log -1 --format=%h) 
BUILD_ENV=development

if [ $BRANCH_NAME = "testing" ]
then
   BUILD_ENV=testing
elif [ $BRANCH_NAME = "staging" ]
then
   BUILD_ENV=staging
elif [ $BRANCH_NAME = "master" ]
then
   BUILD_ENV=production
else
    echo "no branch found"
fi

echo "Build env "$BUILD_ENV
echo "Build API_URL "$API_URL
echo "Build API_KEY "$API_KEY
echo "Build AUTH_DOMAIN "$AUTH_DOMAIN
echo "Build DATABASE_URL "$DATABASE_URL
echo "Build PROJECT_ID "$PROJECT_ID
echo "Build MESSAGING_SENDER_ID "$MESSAGING_SENDER_ID
echo "Build APP_ID "$APP_ID
echo "Build MEASUREMENT_ID "$MEASUREMENT_ID
echo "Build STORAGE_BUCKET "$STORAGE_BUCKET
# Build docker of current directory
docker build --build-arg BUILD_ARG=$BUILD_ENV \
--build-arg API_URL=$API_URL \
--build-arg API_KEY=$API_KEY \
--build-arg AUTH_DOMAIN=$AUTH_DOMAIN \
--build-arg DATABASE_URL=$DATABASE_URL \
--build-arg PROJECT_ID=$PROJECT_ID \
--build-arg MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID \
--build-arg APP_ID=$APP_ID \
--build-arg MEASUREMENT_ID=$MEASUREMENT_ID \
--build-arg STORAGE_BUCKET=$STORAGE_BUCKET -t rnssolutions/icd-finlit-adminpanel:$LABEL .

