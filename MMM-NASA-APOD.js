//Main code file //
Module.register('MMM-NASA-APOD', {
  defaults: {
    apiKey: 'DEMO_KEY', // Default API key
  },

  start: function () {
    this.apiKey = this.config.apiKey || this.defaults.apiKey;
    this.sendSocketNotification('CONFIG', this.apiKey);
  },

  notificationReceived: function (notification, payload) {
    if (notification === 'DOM_OBJECTS_CREATED') {
      this.sendSocketNotification('FETCH_APOD');
    }
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'APOD_RESULT') {
      this.apodData = payload;
      this.updateDom(); // Trigger UI update
    }
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    wrapper.className = 'nasa-apod';

    if (this.apodData) {
      const title = document.createElement('div');
      title.className = 'apod-title';
      title.innerHTML = this.apodData.title;

      const image = document.createElement('img');
      image.className = 'apod-image';
      image.src = this.apodData.url;
      image.alt = this.apodData.title;

      wrapper.appendChild(title);
      wrapper.appendChild(image);
    } else {
      wrapper.innerHTML = 'Loading APOD...';
    }

    return wrapper;
  },
});
