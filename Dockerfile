FROM node:10.5

EXPOSE 8000
ENV YARN_VERSION 1.7.0

RUN mkdir app

WORKDIR app

COPY package.json .

RUN apt update && apt install curl && \
    curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" && \
    tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/  && \
    ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn && \
    ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg && \
    rm yarn-v$YARN_VERSION.tar.gz

COPY . .
