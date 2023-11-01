Module.register('MMM-NasaAPOD', {
  defaults: {
    apiKey: 'YOUR_API_KEY',
  },

  start: function () {
    this.sendSocketNotification('CONFIG', this.config);
    this.apodData = null; // Initialize APOD data
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
