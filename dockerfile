FROM ubuntu

# Meteor version to build for; see ../build.sh
ARG METEOR_VERSION
EXPOSE 3000

WORKDIR /opt/src
ENV APP_SOURCE_FOLDER /opt/src
ENV APP_BUNDLE_FOLDER /opt/bundle
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir -p ${APP_SOURCE_FOLDER}  && chmod 777 .
RUN mkdir -p ${APP_BUNDLE_FOLDER}  && chmod 777 . 
COPY ./src . 
COPY entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/entrypoint.sh
RUN ls && apt-get update && \
	apt-get install --assume-yes apt-transport-https ca-certificates && \
	apt-get install --assume-yes --no-install-recommends build-essential bzip2 curl git libarchive-tools python
# Install Meteor
RUN curl https://install.meteor.com/?release=$METEOR_VERSION --output /tmp/install-meteor.sh && \
	# Replace tar with bsdtar in the install script; https://github.com/jshimko/meteor-launchpad/issues/39 and https://github.com/intel/lkp-tests/pull/51
	sed --in-place "s/tar -xzf.*/bsdtar -xf \"\$TARBALL_FILE\" -C \"\$INSTALL_TMPDIR\"/g" /tmp/install-meteor.sh && \
	# Install Meteor
	printf "\n[-] Installing Meteor $METEOR_VERSION...\n\n" && \
	sh /tmp/install-meteor.sh
# RUN  meteor npm install --save @babel/runtime
# Fix permissions warning; https://github.com/meteor/meteor/issues/7959
ENV METEOR_ALLOW_SUPERUSER true
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]

# RUN cd pru
# RUN meteor

